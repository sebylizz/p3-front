describe("Checkout Process", () => {
  beforeEach(() => {
    Cypress.env("NODE_ENV", "test");
    cy.mockStripeSession();
    cy.mockVerifyPayment({ success: true });
  });

  it("should complete the checkout process with mock session ID", () => {
    cy.navigateToHomePage();
    cy.signUp();
    cy.login();
    cy.navigateToHomePage();
    cy.navigateToRandomProduct();
    cy.navigateAndAddToCart();
    cy.navigateToBrowseProducts();
    cy.navigateAndAddToCart();
    cy.getCartItemCount().should("eq", 2);
    cy.navigateToCart();
    cy.navigateToCheckout();
    cy.fillCheckoutFormAndPay();
    cy.wait("@createStripeSession").then((interception) => {
      expect(interception.response.body).to.equal("mock_session_id");
    });
    cy.visit("http://localhost:3000/success?session_id=mock_session_id");
    cy.wait("@verifyPayment").then((interception) => {
      expect(interception.response.body).to.have.property("success", true);
    });
    cy.get("h1").should("contain.text", "Order placed successfully!");
    cy.getCartItemCount().should("eq", 0);
  });
});
