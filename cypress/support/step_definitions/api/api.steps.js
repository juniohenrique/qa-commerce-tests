const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const ProductService = require('../../../services/ProductService');
const CartService = require('../../../services/CartService');
const CheckoutService = require('../../../services/CheckoutService');
const {
  buildCheckoutPayload,
  buildCartItemPayload,
} = require('../../../support/helpers/payloadBuilder');
const {
  DEFAULT_USER_ID,
  SHIPPING_FEE,
} = require('../../../support/constants');

Given('que a API está disponível', function () {
  this.userId = DEFAULT_USER_ID;
});

When(
  'envio uma requisição GET para {string} com parâmetros page={int} e limit={int}',
  function (endpoint, page, limit) {
    ProductService.listProducts(page, limit).as('apiResponse');
  }
);

When('envio uma requisição GET para {string}', function (endpoint) {
  const processed = endpoint.replace('{orderId}', this.lastOrderId || '1');
  cy.request({
    method: 'GET',
    url: processed,
    failOnStatusCode: false,
  }).as('apiResponse');
});

When('envio uma requisição POST para {string} com body vazio', function (endpoint) {
  cy.request({
    method: 'POST',
    url: endpoint,
    body: {},
    failOnStatusCode: false,
  }).as('apiResponse');
});

When(
  'envio uma requisição POST para {string} com productId={int} e quantity={int}',
  function (endpoint, productId, quantity) {
    const payload = buildCartItemPayload({
      userId: this.userId,
      productId,
      quantity,
    });
    CartService.addItem(payload).as('apiResponse');
  }
);

When(
  'envio uma requisição POST para {string} com dados válidos de pedido',
  function (endpoint) {
    const payload = buildCheckoutPayload({ userId: this.userId });
    CheckoutService.createOrder(payload).as('apiResponse');
  }
);

Given('o carrinho do usuário está vazio', function () {
  CartService.clearCart(this.userId);
});

Given(
  'adicionei o produto {int} ao carrinho com quantidade {int} via API',
  function (productId, quantity) {
    const payload = buildCartItemPayload({
      userId: this.userId,
      productId,
      quantity,
    });
    CartService.addItem(payload);
  }
);

Given('adicionei o produto {int} ao carrinho do usuário {int}', function (productId, userId) {
  this.userId = userId;
  const payload = buildCartItemPayload({
    userId: this.userId,
    productId,
    quantity: 1,
  });
  CartService.addItem(payload);
});

Given('criei um pedido com dados válidos', function () {
  const payload = buildCheckoutPayload({ userId: this.userId });
  CheckoutService.createOrder(payload).then((response) => {
    this.lastOrderId = response.body.id;
  });
});

Then('o status code da resposta deve ser {int}', function (status) {
  cy.get('@apiResponse').its('status').should('eq', status);
});

Then('a resposta deve conter a lista {string}', function (listKey) {
  cy.get('@apiResponse').its(`body.${listKey}`).should('be.an', 'array');
});

Then('a lista de produtos deve conter até {int} itens', function (maxItems) {
  cy.get('@apiResponse')
    .its('body.products')
    .should('have.length.lte', maxItems);
});

Then(
  'cada produto deve ter as propriedades obrigatórias id, name, description, price e image',
  function () {
    cy.get('@apiResponse').its('body.products').each((product) => {
      expect(product).to.have.property('id');
      expect(product).to.have.property('name');
      expect(product).to.have.property('description');
      expect(product).to.have.property('price');
      expect(product).to.have.property('image');
    });
  }
);

Then('o preço do produto deve ser maior que zero', function () {
  cy.get('@apiResponse').then((response) => {
    const products = response.body.products || [response.body];
    products.forEach((product) => {
      if (product.price !== undefined) {
        expect(product.price).to.be.greaterThan(0);
      }
    });
  });
});

Then(
  'a resposta deve conter as propriedades id, name, description, price e image',
  function () {
    cy.get('@apiResponse').then((response) => {
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('name');
      expect(response.body).to.have.property('description');
      expect(response.body).to.have.property('price');
      expect(response.body).to.have.property('image');
    });
  }
);

Then('o id do produto retornado deve ser {int}', function (expectedId) {
  cy.get('@apiResponse').its('body.id').should('eq', expectedId);
});

Then('o preço deve ser um valor numérico positivo', function () {
  cy.get('@apiResponse').its('body.price').should('be.gt', 0);
});

Then('a resposta deve conter a mensagem {string}', function (expectedMessage) {
  cy.get('@apiResponse').then((response) => {
    const body = response.body;
    const message = typeof body === 'string' ? body : body.message;
    expect(message).to.contain(expectedMessage);
  });
});

Then('a resposta deve conter mensagem de sucesso', function () {
  cy.get('@apiResponse').then((response) => {
    const body = response.body;
    const message = typeof body === 'string' ? body : body.message;
    expect(message).to.not.be.empty;
  });
});

Then('a resposta deve ser uma lista com pelo menos um item', function () {
  cy.get('@apiResponse').its('body').should('be.an', 'array').and('not.be.empty');
});

Then('o item deve ter productId, name, price e quantity', function () {
  cy.get('@apiResponse').its('body').each((item) => {
    expect(item).to.have.property('productId');
    expect(item).to.have.property('name');
    expect(item).to.have.property('price');
    expect(item).to.have.property('quantity');
  });
});

Then('a quantidade do item deve ser {int}', function (expectedQuantity) {
  cy.get('@apiResponse')
    .its('body')
    .then((items) => {
      expect(items[0].quantity).to.equal(expectedQuantity);
    });
});

Then('a resposta deve conter o {string} do pedido', function (field) {
  cy.get('@apiResponse').its(`body.${field}`).should('exist').and('not.be.empty');
});

Then('o status do pedido na resposta da API deve ser {string}', function (expectedStatus) {
  cy.get('@apiResponse').its('body.status').should('eq', expectedStatus);
});

Then('o total do pedido deve ser maior que o frete', function () {
  cy.get('@apiResponse')
    .its('body.total_price')
    .should('be.greaterThan', SHIPPING_FEE);
});

Then('a resposta deve indicar erro de validação', function () {
  cy.get('@apiResponse').then((response) => {
    expect(response.status).to.be.oneOf([400, 422]);
  });
});
