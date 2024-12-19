import "cypress-file-upload";
describe("Checkout Process", () => {
  beforeEach(() => {});

  it("should Add procut, then modify and update", () => {
    cy.loginAdmin();
    cy.chooseProducts();
    cy.addProduct();
    const newProduct = {
      name: "Test Product",
      description: "This is a test product description.",
      price: 1500,
      startDate: "2024-12-31",
      isActive: true,
      collectionId: "1",
      parentCategoryId: "2",
      colors: [
        {
          colorId: "4",
          mainImage: "cap.jpg",
          extraImages: ["cap2.jpg"],
          variants: [
            { sizeId: "1", quantity: 10 },
            { sizeId: "2", quantity: 20 },
          ],
        },
      ],
    };

    cy.fillProductInformation(newProduct);
    cy.get('[aria-label="Admin Panel"]').should("be.visible");

    cy.get('[aria-label="Admin Panel"]').click();

    cy.url().should("include", "/admin");
    cy.chooseProducts();
    cy.get('input[placeholder="Search For Products"]').type(newProduct.name);
    cy.contains(newProduct.name).should("exist");

    cy.clickFirstModifyButton();
    cy.toggleActiveAndUpdate();
  });
});
