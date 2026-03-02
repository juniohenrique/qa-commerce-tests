import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';

Given("visitei o {string}", function (string) {
  cy.clearCookies();
  cy.visit('/');
});

When("adiciono o produto primeiro produto ao carrinho", function () {
  cy.get(':nth-child(1) > .card > .card-body > .btn').click();
});

When("acesso o carrinho", function () {
cy.get(':nth-child(2) > .nav-link').click();
});


When("vou para a pagina de checkout", function () {
cy.get('#totals > .btn').click();
});

When("finalizo a compra", function () {
  cy.get('#first-name').type(faker.person.firstName());
  cy.get('#last-name').type(faker.person.lastName());
  cy.get('#address').type(faker.location.streetAddress());
  cy.get('#email').type(faker.internet.email());
  cy.get('#cep').type('12345858');
  cy.get(':nth-child(3) > .form-check-label').click();
  cy.get(':nth-child(3) > [name="payment-method"]').click();
  cy.get('#continue').click();
  cy.get('#finish').click();
});

Then("eu posso visualizar informacoes sobre o produto", function () {
  cy.contains('Moletom com capuz "Se você acha que nada é impossível..."').should('be.visible');
  cy.get('.cart-item > :nth-child(2)').should('contain', 'R$59.00');
});