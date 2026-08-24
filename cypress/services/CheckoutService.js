class CheckoutService {
  createOrder(payload) {
    return cy.request({
      method: 'POST',
      url: '/api/checkout',
      body: payload,
      failOnStatusCode: false,
    });
  }

  getOrder(orderId) {
    return cy.request({
      method: 'GET',
      url: `/api/orders/${orderId}`,
      failOnStatusCode: false,
    });
  }

  getLastOrder(userId = Cypress.env('DEFAULT_USER_ID')) {
    return cy.request({
      method: 'GET',
      url: `/api/ultimo-pedido/${userId}`,
      failOnStatusCode: false,
    });
  }

  listOrdersByUser(userId = Cypress.env('DEFAULT_USER_ID')) {
    return cy.request({
      method: 'GET',
      url: '/api/orders',
      qs: { userId },
      failOnStatusCode: false,
    });
  }
}

module.exports = new CheckoutService();
