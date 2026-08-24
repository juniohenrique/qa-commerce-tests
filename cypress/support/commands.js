const CartService = require('../services/CartService');

const DEFAULT_USER_ID = Cypress.env('DEFAULT_USER_ID') || 1;

Cypress.Commands.add('clearCart', (userId = DEFAULT_USER_ID) => {
  return CartService.clearCart(userId);
});

Cypress.Commands.add('addProductToCartViaApi', (productId, quantity = 1, userId = DEFAULT_USER_ID) => {
  return CartService.addItem({ userId, productId, quantity });
});
