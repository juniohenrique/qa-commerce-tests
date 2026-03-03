// Custom Cypress commands
// Place reusable cross-page actions here. Example:

// comando genérico para fazer requisição POST à API usando baseUrl
Cypress.Commands.add('postApi', (endpoint, body) => {
  // endpoint pode ser caminho relativo ou URL completa
  return cy.request('POST', endpoint, body);
});
