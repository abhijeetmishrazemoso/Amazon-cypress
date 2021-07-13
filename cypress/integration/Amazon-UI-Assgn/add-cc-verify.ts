/// <reference types="cypress" />
import { AmazonDependencies,AmazonEyes,AmazonHands } from "../../robot/AmazonRobots/amazon-robot";

describe("Visit URL and login",() => {
    const amazonDependencies = new AmazonDependencies();
    const amazonEyes = new AmazonEyes();
    const amazonHands = new AmazonHands();
    beforeEach('Visit URL & login', () => {
            let baseUrl:string ='';
            cy.fixture("info").then((info) =>{
                baseUrl = info.baseUrl;
                return baseUrl;
            }).then((baseUrl) => {
                amazonDependencies.accessUrl(baseUrl)
                amazonHands.login();
            })
        })

    specify('Should not be able to add a payment method',() => {
        cy.get("#nav-cart-count-container").click()
        cy.get('input[name="proceedToRetailCheckout"]').click()
        cy.get("span.a-button-inner a").first().click()
        cy.get('div.ship-speed').contains('FREE with Prime').click()
            cy.get('input[type="submit"][value="Continue"]').first().click()
            cy.wait(5000)
            cy.get('body').contains('Add Debit/Credit/ATM Card')
            .click()
            cy.get('body').contains('Add a credit or debit card')
            .click()
            
            cy.wait(5000)
            //amazon security not allowing a get for below selector
            cy.get('div.a-row.pmts-add-credit-card-container input[name="addCreditCardNumber"]')
            .should('not.exist')
            
    })
})
