class ProductService {
  listProducts(page = 1, limit = 9) {
    return cy.request({
      method: 'GET',
      url: '/api/produtos',
      qs: { page, limit },
      failOnStatusCode: false,
    });
  }

  getProductById(productId) {
    return cy.request({
      method: 'GET',
      url: `/api/produtos/${productId}`,
      failOnStatusCode: false,
    });
  }
}

module.exports = new ProductService();
