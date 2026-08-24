const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const HomePage = require('../../../pages/HomePage');
const CartPage = require('../../../pages/CartPage');
const CheckoutPage = require('../../../pages/CheckoutPage');
const { generateValidCustomer } = require('../../../support/constants');

Given('que estou na página inicial da loja', function () {
  HomePage.visit();
});

Given('adicionei um produto ao carrinho', function () {
  HomePage.visit();
  HomePage.waitForProductsLoaded();
  HomePage.getFirstProductDetails();
  HomePage.addFirstProductToCart(1);
});

When('visualizo a lista de produtos carregada', function () {
  HomePage.waitForProductsLoaded();
});

When('adiciono o primeiro produto da lista ao carrinho', function () {
  HomePage.getFirstProductDetails();
  HomePage.addFirstProductToCart(1);
});

When('o primeiro produto da lista foi adicionado ao carrinho', function () {
  HomePage.waitForProductsLoaded();
  HomePage.getFirstProductDetails();
  HomePage.addFirstProductToCart(1);
});

When('acesso a página do carrinho', function () {
  CartPage.visit();
  CartPage.waitForLoaded();
});

When('estou na página de checkout', function () {
  CartPage.visit();
  CartPage.waitForLoaded();
  CartPage.assertHasItems();
  CartPage.goToCheckout();
  CheckoutPage.waitForLoaded();
});

When('preencho todos os dados do cliente válidos', function () {
  this.customerData = generateValidCustomer();
  CheckoutPage.fillCustomerData(this.customerData);
});

When('aceito os termos e condições', function () {
  CheckoutPage.acceptTerms();
});

When('submeto o formulário de checkout', function () {
  CheckoutPage.submitForm();
});

Then('devo ver a mensagem de sucesso de produto adicionado', function () {
  HomePage.assertSuccessAlertVisible();
});

Then('o contador do carrinho deve ser atualizado', function () {
  HomePage.assertCartCountEquals(1);
});
