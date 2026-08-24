const { faker } = require('@faker-js/faker');

const SHIPPING_FEE = 19.9;
const DEFAULT_USER_ID = 1;

const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  BOLETO: 'boleto',
  PIX: 'pix',
};

const BOLETO_CODE_DEFAULT = '23793.38128 60082.677139 66003.996498 1 89440000010000';
const PIX_KEY_DEFAULT = '123e4567-e89b-12d3-a456-426614174000';

const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'Este campo é obrigatório.',
  INVALID_EMAIL: 'Por favor, insira um email válido.',
  INVALID_CEP_LENGTH: 'O CEP deve ter 8 caracteres.',
  FIELDS_REQUIRED_ALERT:
    'Por favor, preencha todos os campos obrigatório marcados com asteriscos!',
};

function generateValidCustomer() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.location.street(),
    number: faker.location.buildingNumber(),
    cep: '12345678',
    phone: '11987654321',
    email: faker.internet.email(),
  };
}

function generateValidCardDetails() {
  return {
    cardNumber: '1234123412341234',
    cardExpiry: '12/2027',
    cardCvc: '123',
  };
}

function formatCurrencyBRL(value) {
  return `R$${value.toFixed(2)}`;
}

module.exports = {
  SHIPPING_FEE,
  DEFAULT_USER_ID,
  PAYMENT_METHODS,
  BOLETO_CODE_DEFAULT,
  PIX_KEY_DEFAULT,
  ERROR_MESSAGES,
  generateValidCustomer,
  generateValidCardDetails,
  formatCurrencyBRL,
};
