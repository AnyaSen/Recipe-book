describe('HomePage', () => {
  it('Has a button to the linkedin profile', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[data-cy=link-to-linkedin]').should(
      'have.attr',
      'href',
      'https://www.linkedin.com/in/anna-senchikhina/'
    );
  });

  it('Opens a recipe form', () => {
    cy.visit('http://localhost:3000/');
    cy.get('button')
      .contains('Create recipe')
      .click();
    cy.location('pathname').should('eq', '/create');
    cy.get('button')
      .contains('Back to all')
      .click();
    cy.location('pathname').should('eq', '/');
  });
});
