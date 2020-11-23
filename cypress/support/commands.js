Cypress.Commands.add('fillRecipeForm', name => {
  const time = '10min';
  const portions = 2;
  const ingQuantityOne = '100gr';
  const ingredientOne = 'chicken';
  const ingQuantityTwo = '100ml';
  const ingredientTwo = 'water';
  const stepOneDescription = 'Cut chicken';
  const stepTwoDescription = 'Boil chicken';

  cy.visit('http://localhost:3000/create');
  cy.get('input[placeholder="Name"]').type(name);
  cy.get('input[placeholder="time"]').type(time);
  cy.get('input[placeholder="no of portions"]').type(portions);
  cy.get('input[placeholder="quantity"]').type(ingQuantityOne);
  cy.get('input[placeholder="ingredient"]').type(ingredientOne);
  cy.get('[data-cy=add-ingredient]').click();
  cy.get('[data-cy=open-new-inputs]').click();
  cy.get('input[placeholder="quantity"]').type(ingQuantityTwo);
  cy.get('input[placeholder="ingredient"]').type(ingredientTwo);
  cy.get('[data-cy=add-ingredient]').click();
  cy.get('textarea[placeholder="Describe a step..."]').type(stepOneDescription);
  cy.get('[data-cy=add-step]').click();
  cy.get('[data-cy=open-new-textarea]').click();
  cy.get('textarea[placeholder="Describe a step..."]').type(stepTwoDescription);
  cy.get('[data-cy=add-step]').click();
});
