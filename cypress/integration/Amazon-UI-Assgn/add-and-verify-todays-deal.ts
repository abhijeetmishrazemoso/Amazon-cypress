/// <reference types="cypress" />
import { AmazonDependencies,AmazonEyes,AmazonHands } from "../../robot/AmazonRobots/amazon-robot";

context('Some test',() =>{
    const amazonDependencies = new AmazonDependencies();
    const amazonEyes = new AmazonEyes();
    const amazonHands = new AmazonHands();

    describe('Amazon testing workflows',() => {
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
        
        
        
        it('Search Amazon for a Today\'s deals',() => {
            let currentCartCount = amazonHands.getSynchronousCurrentCartCount();
            cy.wait(2000);
            amazonHands
            .typeTextonId('twotabsearchtextbox', 'Todays Deals{enter}')
            amazonHands.clickOnLinkImgDataIndexSelector('div',5);
            amazonHands.ifSizePresentSelSizeAddToCart();
            amazonEyes.seesTextWithId('nav-cart-count', String(currentCartCount+1));
        })
        })
    })