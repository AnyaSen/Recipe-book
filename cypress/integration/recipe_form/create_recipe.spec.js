describe("RecipeForm", () => {
  it("Creates a recipe", () => {
    cy.visit("http://localhost:3000/create");

    const name = "test";
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
});
