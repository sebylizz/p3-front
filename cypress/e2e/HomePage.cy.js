describe("Navigate to Random Product", () => {
  it("should navigate to a random product page", () => {
    cy.navigateToRandomProduct();

    cy.navigateToHomePage();
    cy.signUp();
    cy.login();

    cy.get("h1").should("be.visible");
  });
});
