import { first } from "cypress/types/lodash";
import { AmazonDependencies,AmazonEyes,AmazonHands } from "../../robot/AmazonRobots/amazon-robot";

context('Some test',() =>{
    const amazonDependencies = new AmazonDependencies();
    const amazonEyes = new AmazonEyes();
    const amazonHands = new AmazonHands();

    describe('Amazon testing workflows',() => {
        beforeEach('Access & login',() => {
            amazonDependencies.accessUrl('http://www.amazon.in')
            amazonHands.login();
        })
        let itemsOrdered:number = 0;
        
        it('Amazon Search',() => {
            amazonHands
            .typeTextonId('twotabsearchtextbox', 'Todays Deals{enter}')
            amazonHands.clickOnLinkImgDataIndexSelector('div',3);
            amazonHands.ifSizePresentSelSizeAddToCart();
            itemsOrdered += 1;
        })
            
        it('Search Mobiles and add last to cart',() => {
            amazonHands
            .typeTextonId('twotabsearchtextbox', 'Mobiles{enter}')
            
            cy.get('div[data-component-type="s-search-result"].s-result-item')
            .last().find('img').as('navigateToItem')
            .parent().parent().invoke('removeAttr', 'target')
            cy.get('@navigateToItem').click();
            
            amazonHands.clickOnId('add-to-cart-button');
            itemsOrdered += 1; 
            amazonHands.clickOnId('nav-cart-count-container')
            // amazonHands.clickOnId('nav-cart-count-container')
        })
        it('Verify Items added and Verified',() => {
            amazonHands.clickOnId('nav-cart-count-container')
            cy.get('div[data-name="Active Items"] div[data-asin]')
            .then((elements) => {
                console.log(elements);
                assert.equal(elements.length, itemsOrdered,
                     'Items ordered and verified do not match');
            })
        })
        it('Add Address and Verify and Add Card and Verify',() => {
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
            
            cy.get('#address-ui-widgets-addr-details-address-type-and-business-hours').click()
            cy.get('[name="address-ui-widgets-addr-details-address-type-and-business-hours"]')
            .select("COM",{force:true})
            // cy.get('.a-section.a-spacing-base.adddress-ui-widgets-form-field-container.address-ui-widgets-desktop-form-field')
            // .find('select').select('COM')
            cy.get('#address-ui-widgets-form-submit-button input').click();
            
            // amazonEyes.seesDomContainText('body','ZeMoSo Technologies')
            // amazonEyes.seesDomContainText('body','803 MJR Magnifique')
            // amazonEyes.seesDomContainText('body','500008')
            cy.wait(4000);
            cy.get('#shippingOptionFormId',{ timeout: 10000 })
            .as('dataContainer')
            .contains('ZeMoSo Technologies')
            // cy.get('@dataContainer').contains('803 MJR Magnifique')
            // cy.get('@dataContainer').contains('500008')
            cy.get('div.ship-speed').contains('FREE with Prime').click()
            cy.get('input[type="submit"][value="Continue"]').first().click()
            cy.wait(2000)
            cy.get('body').contains('Add Debit/Credit/ATM Card')
            .click()
            cy.get('body').contains('Add a credit or debit card')
            .click()
            
            cy.wait(5000)
            cy.get('div.a-row.pmts-add-credit-card-container input[name="addCreditCardNumber"]')
            .type('4280940011383882', {force:true})
            // amazonHands.typeTextInInputWithName('addCreditCardNumber','4280940011383882')
            // amazonHands.typeTextInInputWithName('ppw-accountHolderName','Abhijeet')
            // cy.get('select[name="ppw-expirationDate_month"]')
            // .select('10')
            // cy.get('select[name="ppw-expirationDate_year"]')
            // .select('2025')
            amazonHands.clickOnSubmitInputWithName('')

        })
        it('Last year orders',() => {
            amazonHands.clickOnId('nav-link-accountList')
            cy.get('[data-card-identifier="YourOrders"]')
            .click();
            cy.get('select#orderFilter').select('2021', {force:true})
            .should('have.value','year-2021');
            cy.get('#ordersContainer').contains('Track package')
            .first().click()
            // cy.get('div.a-box-group.a-spacing-base.order.js-order-card a')
            // .first().click();
            
        })
            
            // amazonHands.clickOnId('proceed-to-checkout-action');
            
        })
    })