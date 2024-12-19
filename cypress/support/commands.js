// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("navigateAndAddToCart", () => {
  cy.get("#size", { timeout: 10000 }).should("be.visible");

  cy.get('[data-testid="size-option"]:not([disabled])').then((sizes) => {
    const randomIndex = Math.floor(Math.random() * sizes.length);
    cy.wrap(sizes[randomIndex])
      .invoke("val")
      .then((sizeValue) => {
        cy.get("#size").select(sizeValue);
      });
  });

  cy.get('button[aria-label="Add to Cart"]')
    .scrollIntoView()
    .should("be.visible")
    .and("not.be.disabled");

  cy.get('button[aria-label="Add to Cart"]').click();
});

Cypress.Commands.add("navigateToHomePage", () => {
  cy.visit("http://localhost:3000/");
});

Cypress.Commands.add("navigateToRandomProduct", () => {
  cy.get('[data-testid="browse-product-slider"]').should("exist");

  cy.get('[data-testid="product-card"]', { timeout: 10000 }).should(
    "be.visible"
  );

  cy.get('[data-testid="product-card"]').then((cards) => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    cy.wrap(cards[randomIndex]).click();
  });

  cy.url().should("include", "/productPage/");
});

Cypress.Commands.add("navigateToBrowseProducts", () => {
  cy.get('a[aria-label="Browse Products"]').should("be.visible").click();

  cy.url().should("include", "/browseProducts");
});

Cypress.Commands.add("navigateToCart", () => {
  cy.get('button[aria-label="Cart"]').should("be.visible").click();

  cy.url().should("include", "/cart");
});

Cypress.Commands.add("navigateToCheckout", () => {
  cy.get("button").contains("Checkout").should("be.visible");

  cy.get("button").contains("Checkout").click();

  cy.url().should("include", "/cart/checkout");
});

Cypress.Commands.add("fillCheckoutFormAndPay", (formData = {}) => {
  const defaultData = {
    firstName: "John",
    lastName: "Doe",
    address: "123 Elm Street",
    postalCode: "12345",
    phoneNumber: "1234567890",
    email: "john.doe@example.com",
  };

  const dataToUse = { ...defaultData, ...formData };

  Object.entries(dataToUse).forEach(([key, value]) => {
    cy.get(`input[name="${key}"]`)
      .invoke("val")
      .then((currentValue) => {
        if (!currentValue) {
          cy.get(`input[name="${key}"]`).clear().type(value);
        }
      });
  });

  cy.get('button[type="submit"]').contains("Pay").should("be.visible").click();

  cy.get("h1").should("contain.text", "Please pay via Stripe");
});

Cypress.Commands.add("signUp", (user) => {
  const defaultUser = {
    firstName: "Jens",
    lastName: "LeGhetto",
    email: `testuser${Date.now()}@gnail.com`,
    password: "Testin12@",
  };
  const userData = { ...defaultUser, ...user };
  cy.visit("http://localhost:3000/signup");
  cy.get("#FirstName").clear().type(userData.firstName);
  cy.get("#LastName").clear().type(userData.lastName);
  cy.get("#Email").clear().type(userData.email);
  cy.get("#Password").clear().type(userData.password);
  cy.get("#ConfirmPassword").clear().type(userData.password);
  cy.get('button[type="submit"]').contains("Sign Up").click();
  cy.url().should("include", "/");
});

Cypress.Commands.add("login", (credentials) => {
  const defaultCredentials = {
    email: "test@example.com",
    password: "TestPassword123",
  };
  const loginData = { ...defaultCredentials, ...credentials };
  cy.visit("http://localhost:3000/login");
  cy.get('input[name="email"]').clear().type(loginData.email);
  cy.get('input[name="password"]').clear().type(loginData.password);
  cy.get('button[type="submit"]').contains("Login").click();
  cy.url().should("not.include", "/login");
});

Cypress.Commands.add("mockStripeSession", () => {
  cy.intercept("POST", "http://localhost:8080/payment/generatesessionid", {
    statusCode: 200,
    body: "mock_session_id",
  }).as("createStripeSession");
});

Cypress.Commands.add("mockVerifyPayment", (response = { success: true }) => {
  cy.intercept("POST", "http://localhost:8080/payment/confirmorder", {
    statusCode: response.success ? 200 : 500,
    body: response,
  }).as("verifyPayment");
});

Cypress.Commands.add("mockSessionId", () => {
  cy.intercept("POST", "http://localhost:8080/payment/generatesessionid", {
    statusCode: 200,
    body: "mock_session_id",
  }).as("mockSessionId");
});

Cypress.Commands.add("loginAdmin", (credentials) => {
  const defaultCredentials = {
    email: "youngO69420@gmail.com",
    password: "bøsse",
  };

  const loginData = { ...defaultCredentials, ...credentials };

  cy.visit("http://localhost:3000/login");

  cy.get('input[name="email"]').clear().type(loginData.email);
  cy.get('input[name="password"]').clear().type(loginData.password);

  cy.get('button[type="submit"]').contains("Login").click();

  cy.url().should("not.include", "/login");

  cy.get('[aria-label="Admin Panel"]').should("be.visible");

  cy.get('[aria-label="Admin Panel"]').click();

  cy.url().should("include", "/admin");
});

Cypress.Commands.add("chooseProducts", () => {
  cy.contains("h2", "Products").should("be.visible");

  cy.contains("h2", "Products").click();

  cy.url().should("include", "/admin/products");
});

Cypress.Commands.add("addProduct", (productDetails) => {
  cy.get('a[href="./products/addProduct"]').click();
});

Cypress.Commands.add("fillProductInformation", (productDetails) => {
  cy.get('a[href="./products/addProduct"]').click();
});

Cypress.Commands.add("fillProductInformation", (productDetails) => {
  cy.get('input[placeholder="product name"]').type(productDetails.name);

  cy.get("textarea#description-input").type(productDetails.description);

  cy.get("input#price-input").type(productDetails.price.toString());

  cy.get("input#start-input").type(productDetails.startDate);

  if (!productDetails.isActive) {
    cy.get("span.typography-label-sm")
      .contains("Active")
      .siblings("input")
      .uncheck();
  }

  if (productDetails.collectionId) {
    cy.get('select[label="Collection"]').select(
      productDetails.collectionId.toString()
    );
  }

  if (productDetails.parentCategoryId) {
    cy.get('select[label="Parent Category"]').select(
      productDetails.parentCategoryId.toString()
    );
  }
  if (productDetails.childCategoryId) {
    cy.get('select[label="Child Category"]').select(
      productDetails.childCategoryId.toString()
    );
  }

  productDetails.colors.forEach((color) => {
    cy.get('select[label="Choose Color"]').select(color.colorId.toString());
    cy.get("button").contains("Add Variant").click();

    if (color.mainImage) {
      cy.get('input[type="file"]').eq(0).attachFile(color.mainImage);
    }

    if (color.extraImages && color.extraImages.length > 0) {
      color.extraImages.forEach((image) => {
        cy.get('input[type="file"]').eq(1).attachFile(image);
      });
    }

    color.variants.forEach((variant) => {
      cy.get('select[label="Size"]').select(variant.sizeId.toString());
      cy.get('input[placeholder="Enter Quantity"]').type(
        variant.quantity.toString()
      );
      cy.get("button").contains("Add Size and Quantity").click();
    });
  });

  cy.get('button[type="submit"]').contains("Add Product").click();

  cy.get(".fixed.inset-0")
    .should("exist")
    .within(() => {
      cy.get("button").contains("Confirm").click();
    });

  cy.get(".fixed.inset-0")
    .should("exist")
    .within(() => {
      cy.get("button").contains("Close").click();
    });
});

Cypress.Commands.add("clickFirstModifyButton", () => {
  cy.get(".flex.items-center.border-b.border-gray-300").should("exist");

  cy.get("button").contains("Modify").first().click();
});

Cypress.Commands.add("toggleActiveAndUpdate", () => {
  cy.get("div.flex.justify-between.items-center")
    .find("input[type='checkbox']")
    .should("be.visible")
    .click();

  cy.get('[aria-label="Update Product"]').should("be.visible").click();

  cy.get(".fixed.inset-0")
    .should("exist")
    .within(() => {
      cy.contains("Confirm").click();
    });

  cy.on("window:alert", (alertText) => {
    cy.log(`Alert displayed: ${alertText}`);
  });
});

Cypress.Commands.add("getCartItemCount", () => {
  return cy.get('[data-testid="cart-count"]').invoke("text").then(Number);
});
