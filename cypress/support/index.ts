// in cypress/support/index.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
       saveLocalStorage(): void
       restoreLocalStorage(): void
    }
  }