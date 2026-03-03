import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('que o serviço de checkout esteja disponível', () => {
  // opcional: poderíamos fazer um health-check se existir
  cy.log('verificando disponibilidade do serviço');
});

When('eu envio uma requisição POST para {string} com os dados válidos', (endpoint) => {
  const body = {
    userId: 1,
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St',
    number: '456',
    cep: '12345678',
    phone: '1234567890',
    email: 'john.doe@example.com',
    paymentMethod: 'credit_card',
    cardNumber: '1234123412341234',
    cardExpiry: '12/2025',
    cardCvc: '123',
    boletoCode: '23793.38128 60082.677139 66003.996498 1 89440000010000',
    pixKey: '123e4567-e89b-12d3-a456-426614174000',
    createAccount: false,
    password: 'Password123!'
  };
  cy.postApi(endpoint, body).as('response');
});

// novo step para carrinho
When('eu envio uma requisição POST para {string} com os dados do carrinho', (endpoint) => {
  const body = {
    userId: 1,
    productId: 101,
    quantity: 2
  };
  cy.postApi(endpoint, body).as('response');
});

Then('deveria receber status {int}', (status) => {
  cy.get('@response').its('status').should('eq', status);
});

