describe("Stripe Mocking Test", () => {
  it("should mock Stripe session and simulate payment success", () => {
    cy.navigateToCheckout();

    cy.mockStripeSession();
    cy.mockVerifyPayment();

    cy.fillCheckoutFormAndPay();

    cy.wait("@createStripeSession").then((interception) => {
      expect(interception.response.body).to.have.property(
        "sessionId",
        "mock-session-id"
      );
    });

    cy.visit("http://localhost:3000/success?session_id=mock-session-id");

    cy.wait("@verifyPayment");
    cy.get("h1").should("contain.text", "Order placed successfully!");
  });
});
