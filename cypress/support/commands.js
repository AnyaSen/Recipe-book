Cypress.Commands.add("addIngredientsAndSteps", () => {
  const ingQuantityOne = "100gr";
  const ingredientOne = "chicken";
  const ingQuantityTwo = "100ml";
  const ingredientTwo = "water";
  const stepOneDescription = "Cut chicken";
  const stepTwoDescription = "Boil chicken";

  const ingredientInputs = {
    quantityInput: 'input[placeholder="quantity"]',
    ingredientInput: 'input[placeholder="ingredient"]'
  };
  const { quantityInput, ingredientInput } = ingredientInputs;

  const addIngrBtn = "[data-cy=add-ingredient]";
  const addStepBtn = "[data-cy=add-step]";
  const stepTextArea = 'textarea[placeholder="Describe a step..."]';

  cy.get(quantityInput).type(ingQuantityOne);
  cy.get(ingredientInput).type(ingredientOne);
  cy.get(addIngrBtn).click();
  cy.get("[data-cy=toggle-new-inputs]").click();
  cy.get(quantityInput).type(ingQuantityTwo);
  cy.get(ingredientInput).type(ingredientTwo);
  cy.get(addIngrBtn).click();
  cy.get(stepTextArea).type(stepOneDescription);
  cy.get(addStepBtn).click();
  cy.get("[data-cy=toggle-new-textarea]").click();
  cy.get(stepTextArea).type(stepTwoDescription);
  cy.get(addStepBtn).click();
});

Cypress.Commands.add("fillFormHeader", name => {
  const time = "10min";
  const portions = 2;

  cy.get('input[placeholder="Name"]').type(name);
  cy.get('input[placeholder="time"]').type(time);
  cy.get('input[placeholder="no of portions"]').type(portions);
});

Cypress.Commands.add("fillRecipeForm", name => {
  cy.visit("http://localhost:3000/create");

  cy.fillFormHeader(name);
  cy.addIngredientsAndSteps();
});
