const { When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const CheckoutPage = require('../../../pages/CheckoutPage');
const OrderStatusPage = require('../../../pages/OrderStatusPage');

When('seleciono o método de pagamento {string}', function (method) {
  const methodMap = {
    'Pix': 'pix',
    'Boleto': 'boleto',
    'Cartão de Crédito': 'credit_card',
    'Cartao de Credito': 'credit_card',
  };
  const methodValue = methodMap[method] || method;
  CheckoutPage.selectPaymentMethod(methodValue);

  if (methodValue === 'credit_card') {
    CheckoutPage.fillCardDetails('1234123412341234', '12/2027', '123');
  }
});

When('seleciono um método de pagamento', function () {
  CheckoutPage.selectPaymentMethod('pix');
});

Then('devo ser redirecionado para a página de status do pedido', function () {
  OrderStatusPage.waitForLoaded();
  OrderStatusPage.assertOrderSuccess();
});

Then('o status do pedido deve ser {string}', function (expectedStatus) {
  OrderStatusPage.assertStatusEquals(expectedStatus);
});

Then('o valor total do pedido deve ser maior que zero', function () {
  OrderStatusPage.assertTotalGreaterThanZero();
});
