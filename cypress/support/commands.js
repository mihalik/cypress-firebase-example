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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("getLoginToken", (email, password) => {
  cy.visit("/").then(win => {
    cy.get("input[name=email]").type("test@example.com");
    cy.get("input[name=password]").type("Password1");
    cy.get("button[name=login]").click();
    return cy
      .get("#user")
      .should("be.visible")
      .then(() => {
        const key = Object.keys(win.localStorage).filter(item =>
          item.startsWith("firebase:authUser")
        )[0];
        const obj = {key, value: win.localStorage.getItem(key)};
        console.log(obj);
        return obj;
      });
  });
});
