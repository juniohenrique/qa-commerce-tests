class OrderStatusPage {
  elements = {
    orderStatusContainer: () => cy.get('#order-status'),
    orderId: () => cy.contains('ID do Pedido:'),
    totalPrice: () => cy.contains('Total:'),
    status: () => cy.contains('Status:'),
    thankYouMessage: () => cy.contains('Obrigado pelo seu pedido'),
    notFoundMessage: () => cy.contains('Pedido não encontrado'),
  };

  waitForLoaded() {
    this.elements.orderStatusContainer().should('be.visible');
  }

  assertOrderSuccess() {
    this.elements.thankYouMessage().should('be.visible');
    this.elements.orderId().should('be.visible');
    this.elements.totalPrice().should('be.visible');
  }

  assertStatusEquals(expectedStatus) {
    this.elements.status().should('contain.text', expectedStatus);
  }

  assertTotalGreaterThanZero() {
    this.elements.totalPrice().invoke('text').then((text) => {
      const match = text.match(/R\$([\d.,]+)/);
      if (match) {
        const value = parseFloat(match[1].replace('.', '').replace(',', '.'));
        expect(value).to.be.greaterThan(0);
      }
    });
  }

  getOrderId() {
    return this.elements.orderId().invoke('text').then((text) => {
      const parts = text.split(':');
      return parts[1] ? parts[1].trim() : null;
    });
  }
}

module.exports = new OrderStatusPage();
