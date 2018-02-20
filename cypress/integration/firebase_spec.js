// This example has a couple of goals around Firebase interaction:
//
// * Logging in with a firebase uesr
// * Testing errors around login
// * Saving data and verifying it shows up on the page
// * Logout
//
// Be sure to run `npm start` to start the server
// before running the tests below.

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

describe("Firebase & Authentication example", function() {
  context("Login tests", function() {
    beforeEach(function() {
      cy.visit("/");
    });

    afterEach(function() {
      cy.visit("blank.html");
    });

    it("logs in with the correct username and password", () => {
      // Fill out login form
      cy.get("input[name=email]").type("test@example.com");
      cy.get("input[name=password]").type("Password1");
      cy.get("button[name=login]").click();
      // Login form should dissapear
      cy.get("button[name=login]").should("not.exist");
      // Logged in user should be displayed
      cy
        .get("#user")
        .should("be.visible")
        .and("contain", "test@example.com");
    });

    it("displays errors with invalid login", () => {
      // Login without any entries
      cy.get("button[name=login]").click();
      cy
        .get("#login-error")
        .should("have.attr", "data-error-code")
        .and("equal", "auth/invalid-email");

      // Login without valid email
      cy.get("input[name=email]").clear();
      cy.get("input[name=password]").clear();
      cy.get("input[name=email]").type("invalid@example.com");
      cy.get("input[name=password]").type("pass");
      cy.get("button[name=login]").click();
      cy
        .get("#login-error")
        .should("have.attr", "data-error-code")
        .and("equal", "auth/user-not-found");

      // Login without valid password
      cy.get("input[name=email]").clear();
      cy.get("input[name=password]").clear();
      cy.get("input[name=email]").type("test@example.com");
      cy.get("input[name=password]").type("wrongpassword");
      cy.get("button[name=login]").click();
      cy
        .get("#login-error")
        .should("have.attr", "data-error-code")
        .and("equal", "auth/wrong-password");
    });
  });

  context("Notes tests", function() {
    beforeEach(() => {
      cy.login("test@example.com", "Password1");
    });

    afterEach(function() {
      cy.visit("blank.html");
    });

    it("able to type in the note field", () => {
      // Fill out login form
      const note = uuid();
      cy.get("input[name=note]").type(note);
    });

    it("saving a note stores the value", () => {
      // Fill out login form
      const note = uuid();
      cy.get("input[name=note]").type(note);
      cy.get("button[name=add]").click();
      cy.get("#notes").contains(note);
    });
  });

  context("Logout tests", function() {
    beforeEach(() => {
      cy.login("test@example.com", "Password1");
    });

    afterEach(function() {
      cy.visit("blank.html");
    });

    it("hides content and shows login when logged out", () => {
      cy.get("#user").should("be.visible");
      cy.get("button[name=logout]").click();
      cy.get("#user").should("not.exist");
      cy.get("button[name=login]").should("exist");
    });
  });
});
