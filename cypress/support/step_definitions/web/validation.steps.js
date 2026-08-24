const { When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const CheckoutPage = require('../../../pages/CheckoutPage');
const { generateValidCustomer, ERROR_MESSAGES } = require('../../../support/constants');

When(
  'preencho o checkout deixando o campo {string} vazio',
  function (fieldId) {
    const data = generateValidCustomer();

    const fieldMap = {
      'first-name': 'firstName',
      'last-name': 'lastName',
      'address': 'address',
      'number': 'number',
      'cep': 'cep',
      'email': 'email',
    };

    const propName = fieldMap[fieldId] || fieldId;
    data[propName] = '';

    CheckoutPage.fillCustomerData(data);
  }
);

When('preencho o checkout com email {string}', function (email) {
  const data = generateValidCustomer();
  data.email = email;
  CheckoutPage.fillCustomerData(data);
});

When('preencho o checkout com CEP {string}', function (cep) {
  const data = generateValidCustomer();
  data.cep = cep;
  CheckoutPage.fillCustomerData(data);
});

Then(
  'devo ver a mensagem de erro {string} associada ao campo {string}',
  function (message, fieldId) {
    if (fieldId === 'terms') {
      CheckoutPage.assertFieldError('terms', message);
    } else {
      CheckoutPage.assertFieldError(fieldId, message);
    }
  }
);

Then(
  'devo ver a mensagem de erro {string} no campo {string}',
  function (message, fieldId) {
    CheckoutPage.assertFieldError(fieldId, message);
  }
);

Then('devo ver o alerta global sobre campos obrigatórios', function () {
  CheckoutPage.assertGlobalAlertVisible(ERROR_MESSAGES.FIELDS_REQUIRED_ALERT);
});
