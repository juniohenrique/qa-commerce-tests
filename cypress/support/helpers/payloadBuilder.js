const { faker } = require('@faker-js/faker');
const {
  PAYMENT_METHODS,
  BOLETO_CODE_DEFAULT,
  PIX_KEY_DEFAULT,
  DEFAULT_USER_ID,
} = require('../constants');

function buildCheckoutPayload(overrides = {}) {
  const base = {
    userId: DEFAULT_USER_ID,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    number: faker.location.buildingNumber(),
    cep: '12345678',
    phone: '11987654321',
    email: faker.internet.email(),
    paymentMethod: PAYMENT_METHODS.PIX,
    boletoCode: null,
    pixKey: PIX_KEY_DEFAULT,
    cardNumber: null,
    cardExpiry: null,
    cardCvc: null,
    createAccount: false,
    password: null,
  };

  if (base.paymentMethod === PAYMENT_METHODS.BOLETO) {
    base.boletoCode = BOLETO_CODE_DEFAULT;
  } else if (base.paymentMethod === PAYMENT_METHODS.CREDIT_CARD) {
    base.cardNumber = '1234123412341234';
    base.cardExpiry = '12/2027';
    base.cardCvc = '123';
  }

  return { ...base, ...overrides };
}

function buildCartItemPayload(overrides = {}) {
  return {
    userId: DEFAULT_USER_ID,
    productId: 1,
    quantity: 1,
    ...overrides,
  };
}

function buildInvalidCheckoutPayload(overrides = {}) {
  return {
    userId: DEFAULT_USER_ID,
    ...overrides,
  };
}

module.exports = {
  buildCheckoutPayload,
  buildCartItemPayload,
  buildInvalidCheckoutPayload,
};
