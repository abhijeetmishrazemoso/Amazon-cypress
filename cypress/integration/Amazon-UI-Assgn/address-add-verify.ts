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
        it('Add Address and Verify',() => {
            amazonHands.clickOnId('nav-cart-count-container')
            amazonHands.clickOnDomElement('input[data-feature-id="proceed-to-checkout-action"')
            amazonHands.typeTextOnInputWithId('address-ui-widgets-enterAddressFullName',
            'ZeMoSo Technologies Pvt Ltd' )
            amazonHands.typeTextOnInputWithId('address-ui-widgets-enterAddressPhoneNumber',
            '9666738943' )
            amazonHands.typeTextOnInputWithId('address-ui-widgets-enterAddressPostalCode',
            '500008' )
            amazonHands.typeTextOnInputWithId('address-ui-widgets-enterAddressLine1',
            '802/803 MJR Magnifique{downArrow}{enter}' )
            amazonHands.typeTextOnInputWithId('address-ui-widgets-enterAddressLine2',
            'raidurgam' )
            
            cy.get('#address-ui-widgets-addr-details-address-type-and-business-hours').click()
            cy.get('[name="address-ui-widgets-addr-details-address-type-and-business-hours"]')
            .select("COM",{force:true})
            cy.get('#address-ui-widgets-form-submit-button input').click();
            cy.wait(4000);
            amazonEyes.includesTextWithId('shippingOptionFormId', 'ZeMoSo Technologies')
        })
    
})
