class CartService {
  getCart(userId = Cypress.env('DEFAULT_USER_ID')) {
    return cy.request({
      method: 'GET',
      url: `/api/carrinho/${userId}`,
      failOnStatusCode: false,
    });
  }

  addItem(payload) {
    return cy.request({
      method: 'POST',
      url: '/api/carrinho',
      body: payload,
      failOnStatusCode: false,
    });
  }

  clearCart(userId = Cypress.env('DEFAULT_USER_ID')) {
    return cy.request({
      method: 'DELETE',
      url: `/api/carrinho/${userId}`,
      failOnStatusCode: false,
    });
  }

  removeItem(userId, productId) {
    return cy.request({
      method: 'DELETE',
      url: `/api/carrinho/${userId}/${productId}`,
      failOnStatusCode: false,
    });
  }
}

module.exports = new CartService();
