const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    products(
      searchTerm: String
      isProductSearch: Boolean
      limit: Int
      skip: Int
    ): [Product]
    product(id: ID!): Product
    reviews(productId: ID!): [Review]
    cart: Cart
    categories(limit: Int): [Category]
    categoryProducts(categoryId: Int, limit: Int, skip: Int): CategoryProducts
    orders(limit: Int, offset: Int): [Order]
  }

  type PaymentResult {
    clientSecret: String
  }

  type OrderItem {
    id: String
    productId: String
    orderId: String
    quantity: Int
    product: Product
  }

  type Order {
    id: String
    amount: Int
    createdAt: String
    orderItems : [OrderItem]
  }

  type CategoryProducts {
    count: Int
    categoryId: String
    categoryName: String
    products: [Product]
  }

  type SuccessMessage {
    message: String
  }

  type Category {
    id: Int
    name: String
    description: String
  }

  type Cart {
    id: ID!
    sessionId: String
    status: String
    cartItems: [CartItem]
  }

  type CartItem {
    id: ID!
    productId: String
    cartId: String
    quantity: Int
    name: String
    sku: String
    price: Int
    image: String
  }

  type Mutation {
    signup(email: String!, name: String!, password: String!): User
    logout: Boolean
    login(email: String!, password: String!): SuccessMessage
    createReview(
      title: String!
      description: String!
      rating: Int!
      productId: Int!
    ): SuccessMessage
    addToCart(productId: Int!, decreaseQuantity: Boolean): SuccessMessage
    removeFromCart(cartId: String!, cartItemId: String!): SuccessMessage
    createOrder: PaymentResult
    deleteCart(cartId: String!): SuccessMessage
    changePassword(currentPassword: String!, newPassword: String!): SuccessMessage
    passwordResetRequest(email: !String!):SuccessMessage
    resetPassword(password: String!, resetPassword: String!, resetToken: String!): SuccessMessage
  }

  type ProductResult {
    count: Int
    rows: [Product]
  }

  type Product {
    id: ID
    name: String
    sku: String
    description: String
    price: Int
    reviewsCount: Int
    averageRating: String
    image: String
  }

  type Review {
    id: ID!
    title: String
    description: String
    createdAt: String
    author: String
    rating: Int
  }

  type User {
    userId: ID
    name: String
    email: String
  }
`;

module.exports = { typeDefs };
