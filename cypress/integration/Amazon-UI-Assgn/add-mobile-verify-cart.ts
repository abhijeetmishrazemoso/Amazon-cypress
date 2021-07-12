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

    specify('Search Mobiles, add last to cart & verify',() => {
        let currentCartCount = amazonHands.getSynchronousCurrentCartCount();
        console.log(`currentCartCount is ${currentCartCount}`);
        amazonHands
        .typeTextonId('twotabsearchtextbox', 'Mobiles{enter}')
        
        cy.get('div[data-component-type="s-search-result"].s-result-item')
        .last().find('img').as('navigateToItem')
        .parent().parent().invoke('removeAttr', 'target')
        cy.get('@navigateToItem').click();
        
        amazonHands.clickOnId('add-to-cart-button');
        // amazonHands.clickOnId('nav-cart-count-container')
        amazonEyes.seesTextWithId('nav-cart-count', String(currentCartCount+1))
    })
})
