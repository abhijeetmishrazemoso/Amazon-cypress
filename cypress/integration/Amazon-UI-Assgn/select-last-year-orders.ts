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
        it('Select & show Last year orders',() => {
            amazonHands.clickOnId('nav-link-accountList')
            cy.get('[data-card-identifier="YourOrders"]')
            .click();
            cy.get('select#orderFilter').select('2021', {force:true})
            .should('have.value','year-2021');
        })
        

})
