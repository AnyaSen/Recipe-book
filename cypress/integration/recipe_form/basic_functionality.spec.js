describe("RecipeForm", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/create");
  });

  it("Opens and closes confirmation card", () => {
    cy.fillRecipeForm("My test recipe");

    const confirmationCardId = "[data-cy=confirmation-card]";

    cy.contains("Continue").click();
    cy.get(confirmationCardId).should("be.visible");
    cy.contains("Close").click();
    cy.get(confirmationCardId).should("not.be.visible");
  });

  it("Should have correct css in case if name, time, portins fields are empty", () => {
    cy.addIngredientsAndSteps();

    cy.contains("Continue").click();
    cy.contains("Submit").click();

    cy.get("[data-cy=input]").should(
      "have.css",
      "border-color",
      "rgb(254, 107, 107)"
    );
  });

  it("Should show an error message if ingredients or steps were not added", () => {
    const ingQuantity = "100gr";
    const ingredient = "chicken";

    const ingredientInputs = {
      quantityInput: 'input[placeholder="quantity"]',
      ingredientInput: 'input[placeholder="ingredient"]'
    };
    const { quantityInput, ingredientInput } = ingredientInputs;

    const addIngrBtn = "[data-cy=add-ingredient]";

    cy.fillFormHeader("My test recipe");

    cy.contains("Continue").click();
    cy.contains("Submit").click();
    cy.get("[data-cy=input-error]").should("be.visible");

    cy.get(quantityInput).type(ingQuantity);
    cy.get(ingredientInput).type(ingredient);
    cy.get(addIngrBtn).click();

    cy.contains("Submit").click();
    cy.get("[data-cy=input-error]").should("be.visible");
  });

  it("Should show an error message if portions field value is not of a number type", () => {
    cy.fillFormHeader("My test recipe");
    cy.get('input[placeholder="no. of portions"]').type(" portions");

    cy.contains("Continue").click();
    cy.contains("Submit").click();
    cy.get("[data-cy=error-number-type]").should("be.visible");
  });

  it("Should not have red border on input header field if they are filled", () => {
    cy.fillFormHeader("My test recipe");

    cy.contains("Continue").click();
    cy.contains("Submit").click();

    cy.get("[data-cy=input]").should(
      "not.have.css",
      "border-color",
      "rgb(254, 107, 107)"
    );
  });

  it("Should not show any error messages stpes and ingredient fields are filled", () => {
    cy.addIngredientsAndSteps();

    cy.get("[data-cy=input-error]").should("not.be.visible");
  });
});
