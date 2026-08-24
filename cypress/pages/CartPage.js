class CartPage {
  elements = {
    cartList: () => cy.get('#cart-list'),
    cartItem: () => cy.get('.cart-item'),
    totalsContainer: () => cy.get('#totals'),
    totalProducts: () => cy.get('#total-products'),
    shippingFee: () => cy.get('#shipping-fee'),
    totalWithShipping: () => cy.get('#total-with-shipping'),
    checkoutButton: () => cy.get('#totals .btn-primary'),
    emptyCartMessage: () => cy.contains('Seu carrinho está vazio.'),
    backToHomeButton: () => cy.contains('a', 'Voltar para Home'),
  };

  visit() {
    cy.visit('/cart.html');
  }

  waitForLoaded() {
    this.elements.cartList().should('be.visible');
  }

  assertHasItems() {
    this.elements.cartItem().should('have.length.greaterThan', 0);
    this.elements.totalsContainer().should('be.visible');
  }

  assertIsEmpty() {
    this.elements.emptyCartMessage().should('be.visible');
    this.elements.totalsContainer().should('not.be.visible');
  }

  getFirstItem() {
    const item = {};
    this.elements.cartItem().first().within(() => {
      cy.get('legend').invoke('text').then((name) => {
        item.name = name.trim();
      });
      cy.contains('Preço:').invoke('text').then((text) => {
        item.price = parseFloat(text.replace('Preço: R$', ''));
      });
      cy.contains('Quantidade:').invoke('text').then((text) => {
        item.quantity = parseInt(text.replace('Quantidade: ', ''), 10);
      });
      cy.contains('Total:').invoke('text').then((text) => {
        item.total = parseFloat(text.replace('Total: R$', ''));
      });
    });
    return cy.wrap(null).then(() => item);
  }

  assertProductPresent(expectedName) {
    this.elements.cartItem().should('contain.text', expectedName);
  }

  assertProductQuantity(expectedQuantity) {
    this.elements
      .cartItem()
      .first()
      .should('contain.text', `Quantidade: ${expectedQuantity}`);
  }

  assertProductPrice(expectedPrice) {
    const formatted = `R$${expectedPrice.toFixed(2)}`;
    this.elements.cartItem().first().should('contain.text', formatted);
  }

  getTotalProducts() {
    return this.elements.totalProducts().invoke('text').then((text) => {
      const match = text.match(/R\$([\d.]+,\d{2})/);
      if (match) {
        return parseFloat(match[1].replace('.', '').replace(',', '.'));
      }
      return parseFloat(text.replace('Valor total do(s) Produto(s): R$', ''));
    });
  }

  getShippingFee() {
    return this.elements.shippingFee().invoke('text').then((text) => {
      return parseFloat(text.replace('Frete: R$', ''));
    });
  }

  getTotalWithShipping() {
    return this.elements.totalWithShipping().invoke('text').then((text) => {
      return parseFloat(text.replace('Valor total + Frete fixo: R$', ''));
    });
  }

  goToCheckout() {
    this.elements.checkoutButton().click();
  }
}

module.exports = new CartPage();
