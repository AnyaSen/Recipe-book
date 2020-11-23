describe("RecipeForm", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/create");
  });

  it("Deleats ingredient pairs and steps", () => {
    cy.addIngredientsAndSteps();
    const secondIngrPairId = `[data-cy=ingredient-pair-1]`;
    const secondIngrPairDeleteBtnId = `[data-cy=delete-ingredient-pair-1]`;

    cy.get(secondIngrPairId).should("be.visible");
    cy.get(secondIngrPairDeleteBtnId).click();
    cy.get(secondIngrPairId).should("not.be.visible");

    const secondStepId = `[data-cy=step-1]`;
    const secondStepeleteBtnId = `[data-cy=delete-step-1]`;

    cy.get(secondStepId).should("be.visible");
    cy.get(secondStepeleteBtnId).click();
    cy.get(secondStepId).should("not.be.visible");
  });

  it("Opens and closes input fields and textareas", () => {
    cy.addIngredientsAndSteps();

    const stepTextAreaPlaceholder = "Describe a step...";
    const ingrPlaceholder = "ingredient";
    const ingrQuantityPlaceholder = "quantity";

    const toggleTextAreaId = "[data-cy=toggle-new-textarea]";
    const toggleInputsId = "[data-cy=toggle-new-inputs]";

    cy.get(toggleTextAreaId).click();
    cy.get(`textarea[placeholder='${stepTextAreaPlaceholder}']`).should(
      "be.visible"
    );
    cy.get(toggleTextAreaId).click();
    cy.get(`textarea[placeholder='${stepTextAreaPlaceholder}']`).should(
      "not.be.visible"
    );

    cy.get(toggleInputsId).click();
    cy.get(`input[placeholder='${ingrPlaceholder}']`).should("be.visible");
    cy.get(`input[placeholder='${ingrQuantityPlaceholder}']`).should(
      "be.visible"
    );
    cy.get(toggleInputsId).click();
    cy.get(`input[placeholder='${ingrPlaceholder}']`).should("not.be.visible");
    cy.get(`input[placeholder='${ingrQuantityPlaceholder}']`).should(
      "not.be.visible"
    );
  });
});
