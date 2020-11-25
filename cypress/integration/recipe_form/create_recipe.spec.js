describe("RecipeForm", () => {
  const name = "test";

  it("Creates a recipe", () => {
    cy.visit("http://localhost:3000/create");

    cy.fillRecipeForm(name);
    cy.contains("Continue").click();
    cy.contains("Submit").click();
    cy.contains("Your recipe has been successfully uploaded!").should(
      "be.visible"
    );
    cy.contains("To the recipes").click();
    cy.get(`[data-cy=${name}]`)
      .children()
      .should("contain", name)
      .and("be.visible");
  });

  it("Shows the correct information about the recipe", () => {
    const time = "10min";
    const portions = 2;
    const ingQuantityOne = "100gr";
    const ingredientOne = "chicken";
    const ingQuantityTwo = "100ml";
    const ingredientTwo = "water";
    const stepOneDescription = "Cut chicken";
    const stepTwoDescription = "Boil chicken";

    cy.visit("http://localhost:3000/");

    cy.get("[data-cy=recipe-list]")
      .children()
      .last()
      .click();
    cy.location("pathname").should("include", "/recipe");

    cy.get("[data-cy=recipe-info]")
      .children()
      .should("contain", name)
      .and("contain", time)
      .and("contain", portions)
      .and("contain", ingQuantityOne)
      .and("contain", ingredientOne)
      .and("contain", ingQuantityTwo)
      .and("contain", ingredientTwo)
      .and("contain", stepOneDescription)
      .and("contain", stepTwoDescription);
  });
});
