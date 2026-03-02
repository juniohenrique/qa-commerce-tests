// Custom Cypress commands
// Place reusable cross-page actions here. Example:

Cypress.Commands.add('login', (user, password) => {
  cy.visit('/login');
  cy.get('[data-testid="username"]').type(user);
  cy.get('[data-testid="password"]').type(password);
  cy.get('[data-testid="submit"]').click();
});
