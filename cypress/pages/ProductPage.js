class ProductPage {
  elements = {
    productDetails: () => cy.get('#product-details'),
    productName: () => cy.get('#product-details legend'),
    productDescription: () => cy.get('#product-description'),
    productPrice: () => cy.get('#product-price'),
    quantityInput: () => cy.get('#product-quantity'),
    addToCartButton: () => cy.get('#add-to-cart'),
    backButton: () => cy.contains('a', 'Voltar para Home'),
    alertContainer: () => cy.get('#alert-container'),
  };

  visit(productId) {
    cy.visit(`/product.html?id=${productId}`);
  }

  waitForLoaded() {
    this.elements.productDetails().should('be.visible');
    this.elements.productName().should('be.visible');
  }

  getName() {
    return this.elements.productName().invoke('text');
  }

  getPrice() {
    return this.elements.productPrice().invoke('text').then((text) => {
      return parseFloat(text.replace('Preço: R$', ''));
    });
  }

  setQuantity(quantity) {
    this.elements.quantityInput().clear().type(String(quantity));
  }

  addToCart() {
    this.elements.addToCartButton().click();
  }

  assertSuccessAlertVisible() {
    this.elements
      .alertContainer()
      .should('be.visible')
      .and('contain.text', 'Produto adicionado ao carrinho!');
  }
}

module.exports = new ProductPage();
