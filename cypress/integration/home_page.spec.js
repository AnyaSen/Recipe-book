describe("HomePage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("Shows Loading, opens a recipe form and Returns back to the home page", () => {
    cy.contains("Loading...");

    cy.get("button")
      .contains("Create recipe")
      .click();
    cy.location("pathname").should("eq", "/create");
    cy.get("button")
      .contains("Back to all")
      .click();
    cy.location("pathname").should("eq", "/");
  });

  it("Has a logo with a path to the home page and a button to a LinkedIn profile ", () => {
    cy.get("[data-cy=logo]").should("have.attr", "href", "/");

    cy.get("[data-cy=link-to-linkedin]").should(
      "have.attr",
      "href",
      "https://www.linkedin.com/in/anna-senchikhina/"
    );
  });
});
