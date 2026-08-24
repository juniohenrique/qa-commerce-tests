class HomePage {
  elements = {
    productList: () => cy.get('#product-list'),
    firstProductCard: () => cy.get('#product-list .card').first(),
    addToCartButtons: () => cy.get('.add-to-cart'),
    alertContainer: () => cy.get('#alert-container'),
    cartCount: () => cy.get('#cart-count'),
  };

  visit() {
    cy.visit('/');
  }

  waitForProductsLoaded() {
    this.elements.productList().should('be.visible');
    this.elements.firstProductCard().should('be.visible');
  }

  getFirstProductDetails() {
    return this.elements.firstProductCard().within(() => {
      cy.get('legend a').invoke('text').as('productName');
      cy.get('.card-text').invoke('text').as('productDescription');
      cy.get('p').contains('Preço:').invoke('text').then((text) => {
        const price = parseFloat(text.replace('Preço: R$', ''));
        cy.wrap(price).as('productPrice');
      });
    });
  }

  addFirstProductToCart(quantity = 1) {
    this.elements.firstProductCard().within(() => {
      if (quantity > 1) {
        cy.get('input[type="number"]').clear().type(String(quantity));
      }
      cy.get('.add-to-cart').click();
    });
  }

  assertSuccessAlertVisible(message = 'Produto adicionado ao carrinho!') {
    this.elements
      .alertContainer()
      .should('be.visible')
      .and('contain.text', message);
  }

  assertCartCountEquals(count) {
    this.elements.cartCount().should('have.text', String(count));
  }
}

module.exports = new HomePage();
