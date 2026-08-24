class CheckoutPage {
  elements = {
    form: () => cy.get('#checkout-form'),
    firstNameInput: () => cy.get('#first-name'),
    lastNameInput: () => cy.get('#last-name'),
    addressInput: () => cy.get('#address'),
    numberInput: () => cy.get('#number'),
    cepInput: () => cy.get('#cep'),
    phoneInput: () => cy.get('#phone'),
    emailInput: () => cy.get('#email'),
    createAccountCheckbox: () => cy.get('#create-account'),
    passwordFields: () => cy.get('#password-fields'),
    passwordInput: () => cy.get('#password'),
    confirmPasswordInput: () => cy.get('#confirm-password'),
    paymentCardRadio: () => cy.get('#payment-card'),
    paymentBoletoRadio: () => cy.get('#payment-boleto'),
    paymentPixRadio: () => cy.get('#payment-pix'),
    cardDetails: () => cy.get('#card-details'),
    cardNumberInput: () => cy.get('#card-number'),
    cardExpiryInput: () => cy.get('#card-expiry'),
    cardCvcInput: () => cy.get('#card-cvc'),
    boletoDetails: () => cy.get('#boleto-details'),
    boletoCode: () => cy.get('#boleto-code'),
    pixDetails: () => cy.get('#pix-details'),
    pixKey: () => cy.get('#pix-key'),
    termsCheckbox: () => cy.get('#terms'),
    submitButton: () => cy.get('#checkout-form button[type="submit"]'),
    alertContainer: () => cy.get('#alert-container'),
    invalidFeedback: () => cy.get('.invalid-feedback'),
  };

  visit() {
    cy.visit('/checkout.html');
  }

  waitForLoaded() {
    this.elements.form().should('be.visible');
  }

  fillFirstName(value) {
    if (value) this.elements.firstNameInput().type(value);
  }

  fillLastName(value) {
    if (value) this.elements.lastNameInput().type(value);
  }

  fillAddress(value) {
    if (value) this.elements.addressInput().type(value);
  }

  fillNumber(value) {
    if (value) this.elements.numberInput().type(value);
  }

  fillCep(value) {
    if (value) this.elements.cepInput().type(value);
  }

  fillPhone(value) {
    if (value) this.elements.phoneInput().type(value);
  }

  fillEmail(value) {
    if (value) this.elements.emailInput().type(value);
  }

  fillCustomerData(data) {
    this.fillFirstName(data.firstName);
    this.fillLastName(data.lastName);
    this.fillAddress(data.address);
    this.fillNumber(data.number);
    this.fillCep(data.cep);
    this.fillPhone(data.phone);
    this.fillEmail(data.email);
  }

  selectPaymentMethod(method) {
    switch (method) {
      case 'credit_card':
        this.elements.paymentCardRadio().check();
        break;
      case 'boleto':
        this.elements.paymentBoletoRadio().check();
        break;
      case 'pix':
        this.elements.paymentPixRadio().check();
        break;
      default:
        this.elements.paymentPixRadio().check();
    }
  }

  fillCardDetails(number, expiry, cvc) {
    this.elements.cardNumberInput().type(number);
    this.elements.cardExpiryInput().type(expiry);
    this.elements.cardCvcInput().type(cvc);
  }

  acceptTerms() {
    this.elements.termsCheckbox().check();
  }

  submitForm() {
    this.elements.submitButton().click();
  }

  assertFieldError(fieldId, expectedMessage) {
    cy.get(`#${fieldId}`)
      .should('have.class', 'is-invalid')
      .parent()
      .find('.invalid-feedback')
      .should('be.visible')
      .and('contain.text', expectedMessage);
  }

  assertGlobalAlertVisible(message) {
    this.elements
      .alertContainer()
      .should('be.visible')
      .and('contain.text', message);
  }

  assertInvalidFeedbackContains(message) {
    this.elements.invalidFeedback().should('contain.text', message);
  }
}

module.exports = new CheckoutPage();
