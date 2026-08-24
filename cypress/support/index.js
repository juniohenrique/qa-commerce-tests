import './commands';

const DEFAULT_USER_ID = Cypress.env('DEFAULT_USER_ID') || 1;

beforeEach(() => {
  cy.clearCart(DEFAULT_USER_ID);
  cy.clearCookies();
  cy.clearLocalStorage();
});
