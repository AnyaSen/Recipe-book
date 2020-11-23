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
});
