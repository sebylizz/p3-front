describe("Navigate to Random Product", () => {
  it("should navigate to homepage signup and then login", () => {
    cy.navigateToRandomProduct();

    cy.navigateToHomePage();
    cy.signUp();
    cy.login();

    cy.get("h1").should("be.visible");
  });
});
