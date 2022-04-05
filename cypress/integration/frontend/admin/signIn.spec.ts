describe("signIn", () => {
  beforeEach(() => {
    cy.visit("admin123");
  });

  describe("errors", () => {
    it(`must receive an error message when credentials aren't valid`, () => {
      cy.get("[name=username]").type("invalid username");
      cy.get("[name=mail]").type("doesntexist@ph7builder.com");
      cy.get("[name=password]").type("invalid password");
      cy.get("form").submit();

      // Check error messages
      cy.get("form").should(
        "contain.text",
        '"Email", "Username" or "Password" is incorrect'
      );
      cy.get("form").should("have.class", "pfbc-error");
    });
  });
});
