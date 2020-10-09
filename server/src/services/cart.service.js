const db = require("../../models");
const { v4 } = require("uuid");
const { Op } = require("sequelize");
const { session } = require("passport");

const identifiedParam = ({ sessionId, userId }) => {
  if (userId && !sessionId) {
    return { column: "user_id", value: userId };
  }

  if (sessionId) {
    return { column: "session_id", value: sessionId };
  }

  return null;
};

const fetchCart = async ({ req }) => {
  console.log("fetchCart req.session: ", req.session);

  const userId = req.user ? req.user.id : null;
  console.log("userId: ", userId);

  const sessionId = req.session.cartSessionId
    ? req.session.cartSessionId
    : null;

  const requiredParam = identifiedParam({ sessionId, userId });

  if (!requiredParam) return;

  const { column, value } = requiredParam;

  const shoppingCart = await db.cart.findOne({
    where: {
      [`${column}`]: value,
    },
    attributes: ["id", ["user_id", "userId"], ["session_id", "sessionId"]],
    include: {
      model: db.cartItem,
      as: "cartItems",
      include: {
        model: db.product,
      },
    },
  });

  const { userId: dbUserId, sessionId: dbSessionId } = shoppingCart.dataValues;
  if (userId && dbSessionId) {
    console.log("will get rid of user Cart");
    await db.cart.destroy({
      where: {
        user_id: userId,
      },
    });
  }

  if (userId && !dbUserId) {
    await db.cart.update(
      {
        user_id: userId,
        session_id: null,
      },
      {
        where: {
          session_id: sessionId,
        },
      }
    );

    delete req.session.cartSessionId;
  }

  const shoppingCartItems = shoppingCart.get("cartItems").map((item) => ({
    id: item.id,
    productId: item.product_id,
    cartId: item.cart_id,
    quantity: item.quantity,
    name: item.product.name,
    sku: item.product.sku,
    price: item.product.price,
    image: item.product.image,
  }));

  return {
    id: shoppingCart.id,
    cartItems: shoppingCartItems,
  };
};

const addToCart = async ({ productId, decreaseQuantity, sessionId, req }) => {
  console.log("adding to cart");
  const userId = req.user ? req.user.id : null;
  const existingCart = await db.cart.findOne({
    where: {
      [Op.or]: [
        {
          user_id: {
            [Op.eq]: userId,
          },
        },
        {
          session_id: {
            [Op.eq]: sessionId,
          },
        },
      ],
    },
  });

  console.log("existing cart ", existingCart);

  if (existingCart) {
    const existingItemInTheCart = await db.cartItem.findOne({
      where: {
        cart_id: existingCart.id,
        product_id: productId,
      },
      attributes: ["id", "quantity"],
    });

    if (existingItemInTheCart) {
      const updatedQuantity = decreaseQuantity
        ? existingItemInTheCart.quantity - 1
        : existingItemInTheCart.quantity + 1;
      await db.cartItem.update(
        {
          quantity: updatedQuantity,
        },
        {
          where: {
            id: existingItemInTheCart.id,
          },
        }
      );
      return;
    }

    const newCartItem = await db.cartItem.create({
      id: v4(),
      product_id: productId,
      cart_id: existingCart.id,
      quantity: 1,
    });

    return newCartItem;
  }

  const cartSessionId = v4();

  const newCartId = v4();
  await db.cart.create({
    id: newCartId,
    user_id: userId,
    session_id: cartSessionId,
  });

  req.session.cartSessionId = cartSessionId;

  await db.cartItem.create({
    id: v4(),
    product_id: productId,
    cart_id: newCartId,
    quantity: 1,
  });
};

const deleteCart = async ({ cartId }) => {
  try {
    await db.cart.destroy({
      where: {
        id: cartId,
      },
    });

    return {
      message: "Shopping has been successfully deleted.",
    };
  } catch (e) {
    console.log("Failed to delete users shopping cart!", cartId);
  }
};

const removeFromCart = async ({ cartId, cartItemId }) => {
  const cartItemsCount = await db.cartItem.count({
    where: {
      cart_id: cartId,
    },
  });

  if (cartItemsCount === 1) {
    await db.cart.destroy({
      where: {
        id: cartId,
      },
    });
    return;
  }

  await db.cartItem.destroy({
    where: {
      id: cartItemId,
    },
  });
  return {
    message: "Product was successfully removed from the cart",
  };
};

module.exports = {
  fetchCart,
  addToCart,
  removeFromCart,
  deleteCart,
};
