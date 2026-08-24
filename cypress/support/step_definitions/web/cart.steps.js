const { Then } = require('@badeball/cypress-cucumber-preprocessor');
const CartPage = require('../../../pages/CartPage');
const { SHIPPING_FEE } = require('../../../support/constants');

Then('o carrinho deve conter pelo menos um item', function () {
  CartPage.assertHasItems();
});

Then('o nome do produto adicionado deve ser exibido', function () {
  cy.get('@productName').then((expectedName) => {
    CartPage.assertProductPresent(expectedName);
  });
});

Then('o preço do produto deve ser exibido corretamente', function () {
  cy.get('@productPrice').then((expectedPrice) => {
    CartPage.assertProductPrice(expectedPrice);
  });
});

Then('a quantidade do produto deve ser {int}', function (expectedQuantity) {
  CartPage.assertProductQuantity(expectedQuantity);
});

Then('os valores totais devem ser calculados com frete', function () {
  CartPage.getTotalProducts().should('be.a', 'number').and('be.gt', 0);
  CartPage.getShippingFee().should('equal', SHIPPING_FEE);
  CartPage.getTotalWithShipping().should('be.a', 'number').and('be.gt', SHIPPING_FEE);
});
