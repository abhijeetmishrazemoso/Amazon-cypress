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
            amazonHands.clickOnLinkImgDataIndexSelector('div',6);
            amazonHands.ifSizePresentSelSizeAddToCart();
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
                assert.equal(elements.length, itemsOrdered,
                     'Items ordered and verified do not match');
            })
        })
            
            
            // amazonHands.clickOnId('proceed-to-checkout-action');
            
        })
    })