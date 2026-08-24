class UserService {
  register(payload) {
    return cy.request({
      method: 'POST',
      url: '/api/registrar',
      body: payload,
      failOnStatusCode: false,
    });
  }

  login(payload) {
    return cy.request({
      method: 'POST',
      url: '/api/login',
      body: payload,
      failOnStatusCode: false,
    });
  }

  listUsers() {
    return cy.request({
      method: 'GET',
      url: '/api/users',
      failOnStatusCode: false,
    });
  }
}

module.exports = new UserService();
