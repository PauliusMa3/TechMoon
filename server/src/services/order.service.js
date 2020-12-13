const stripe = require('stripe')('sk_test_6X3oNz5PXvrnqhE6mS0gQn3F00qlL8nr0X');
const { v4 } = require('uuid');
const db = require('../../models');
const { fetchCart } = require('./cart.service');

const createOrder = async ({ req }) => {
  const userId = req.user.id;
  try {
    const userCart = await fetchCart({ req });
    const totalPrice = userCart.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const orderAlreadyExists = await db.order.findOne({
      where: {
        user_id: userId,
      },
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice,
      currency: 'eur',
    });

    if (orderAlreadyExists) {
      await db.order.update({
        charge: paymentIntent.client_secret,
      }, {
        where: {
          user_id: userId,
        },
      });
      return { clientSecret: paymentIntent.client_secret };
    }

    const newOrderId = v4();
    await db.order.create({
      id: newOrderId,
      charge: paymentIntent.client_secret,
      user_id: userId,
      amount: totalPrice,
    });

    const orderItems = userCart.cartItems.map((cartItem) => ({
      id: v4(),
      quantity: cartItem.quantity,
      product_id: cartItem.productId,
      order_id: newOrderId,
    }));

    await db.orderItem.bulkCreate(orderItems);

    return { clientSecret: paymentIntent.client_secret };
  } catch (e) {
    console.log('Failed to create Stripe Payment: ', e.message);
  }
};

const getOrders = async ({
  userId = '6e7cc051-63a0-47b8-a50f-ba03bf9649e9',
  offset = 0,
  limit = 10,
}) => {
  try {
    const orderItems = await db.order.findAll({
      where: {
        user_id: userId,
      },
      include: {
        model: db.orderItem,
        as: 'orderItems',
        include: {
          model: db.product,
          attributes: ['id', 'name', 'price', 'image'],
        },
      },
      offset,
      limit,
    })

    return orderItems;
  } catch (e) {
    console.error('Failed to fetch user Orders');
  }
};

module.exports = {
  createOrder,
  getOrders
};
