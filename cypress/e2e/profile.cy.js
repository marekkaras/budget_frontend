describe("profile", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get("div:nth-child(1) > div > button").click();
    cy.get("div.modal-login > div > form > input[type=text]:nth-child(2)").type(
      "testuser"
    );

    cy.get("div.modal-login input[type=password]").type("test");
    cy.get("div.modal-login > div > form > button").click();
    cy.url().should("contain", "profile");
  });

  it("should be able to navigate to summary section", () => {
    cy.get("#menu_div > button").contains("Summary").click();
    cy.get("h2").contains("Monthly Summary").should("exist");
  });

  it("should be able to navigate to history section", () => {
    cy.get("#menu_div > button").contains("History").click();
    cy.get("h2").contains("History").should("exist");
  });

  it("should be able to navigate to manage section", () => {
    cy.get("#menu_div > button").contains("Manage").click();
    cy.get("h2").contains("Add / update budget").should("exist");
  });

  it("should be able to sign out", () => {
    cy.get("#menu_div > button").contains("Sign Out").click();

    cy.url().should("not.include", "profile");
  });
});
