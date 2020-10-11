const stripe = require('stripe')('sk_test_6X3oNz5PXvrnqhE6mS0gQn3F00qlL8nr0X');
const { v4 } = require('uuid');
const db = require('../../models');
const { fetchCart } = require('./cart.service');

const createOrder = async ({ req }) => {
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

const createOrderPayment = () => 

module.exports = {
  createOrder,
};
