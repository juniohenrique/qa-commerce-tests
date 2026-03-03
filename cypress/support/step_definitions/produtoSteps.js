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
  cy.get('#address').type(faker.location.street());
  cy.get('#number').type(faker.location.buildingNumber());
  cy.get('#email').type(faker.internet.email());
  cy.get('#cep').type('12345858');
  cy.get(':nth-child(3) > .form-check-label').click();
  cy.get(':nth-child(3) > [name="payment-method"]').click();
  cy.get('[name="terms"]').click();
  cy.get('.btn').contains('Finalizar Pedido').click();
});

Then("eu posso visualizar informacoes sobre o produto", function () {
  cy.contains('Moletom com capuz "Se você acha que nada é impossível..."').should('be.visible');
  cy.get('.cart-item > :nth-child(2)').should('contain', 'R$59.00');
});

Then("eu posso visualizar informacoes sobre o pedido", function () {
  cy.get(':nth-child(4) > strong').should('contain', 'Pagamento aprovado');
});

When("preencho os campos do checkout com {string}, {string}, {string}, {string}, {string} e {string}", function (firstName, lastName, email, streetAddress, number, cep) {
  if (firstName) cy.get('#first-name').type(firstName);
  if (lastName) cy.get('#last-name').type(lastName);
  if (email) cy.get('#email').type(email);
  if (streetAddress) cy.get('#address').type(streetAddress);
  if (number) cy.get('#number').type(number);
  if (cep) cy.get('#cep').type(cep);
  cy.get('[name="terms"]').click();
  cy.get('.btn').contains('Finalizar Pedido').click();
});

Then("eu vejo a mensagem de erro {string}", function (errorMessage) {
  cy.contains(errorMessage).should('be.visible');
});
