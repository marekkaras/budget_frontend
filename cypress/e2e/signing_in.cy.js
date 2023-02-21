describe("Signing in", () => {
  it("Should have sign in and sign up buttons", () => {
    cy.visit("http://localhost:3000");

    cy.get("div:nth-child(1) > div > button").contains("Sign In");
    cy.get("div:nth-child(2) > div > button").contains("Sign Up");
  });

  it("Sign in should render a form", () => {
    cy.visit("http://localhost:3000");

    cy.get("div:nth-child(1) > div > button").click();
    cy.get("div.modal-login").should("exist");
  });

  it("Sign up should render a form", () => {
    cy.visit("http://localhost:3000");

    cy.get("div:nth-child(2) > div > button").click();
    cy.get("form.sign-up-form").should("exist");
  });

  it("Should be able to sign in", () => {
    cy.visit("http://localhost:3000");

    cy.get("div:nth-child(1) > div > button").click();

    cy.get("div.modal-login > div > form > input[type=text]:nth-child(2)").type(
      "testuser"
    );

    cy.get("div.modal-login input[type=password]").type("test");
    cy.get("div.modal-login > div > form > button").click();
    cy.url().should("contain", "profile");
  });

  it("Should be able to sign up", () => {
    cy.visit("http://localhost:3000");

    cy.get("div:nth-child(2) > div > button").click();
    cy.get("form.sign-up-form input[type=text]:nth-child(2)").type(
      "some username"
    );
    cy.get("form.sign-up-form input[type=password]").type("some password");
    cy.get("form.sign-up-form input[type=email]").type("hello@test.com");
    cy.get("form.sign-up-form input[type=text]:nth-child(11)").type(
      "MyUserName"
    );
    cy.get("form.sign-up-form").submit();
  });
});
