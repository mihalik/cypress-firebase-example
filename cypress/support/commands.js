// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add("login", (email, password) => {
  cy.visit("/").then(win => {
    cy.get("input[name=email]").type("test@example.com");
    cy.get("input[name=password]").type("Password1");
    cy.get("button[name=login]").click();
    cy.get("#user").should("be.visible");
  });
});
