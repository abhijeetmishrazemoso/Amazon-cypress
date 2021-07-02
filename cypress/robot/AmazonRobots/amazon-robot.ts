import { BaseHands, BaseEyes,BaseDependencies } from "../BaseRobot/BaseRobot";

export class AmazonHands extends BaseHands {
 clickOnLinkImgDataIndexSelector(selector:string, dataIndexNumber:number){
     cy.get(`${selector}[data-index="${dataIndexNumber}"] img`)
     .parent().parent()
     .invoke('removeAttr', 'target')
     .first()
     .click();
 }
 login(){
     this.clickOnId('nav-link-accountList');
     this.typeTextonId('ap_email','colouredpages@gmail.com{enter}');
     this.typeTextonId('ap_password','R1dh!madhava{enter}');
 }
 ifSizePresentSelSizeAddToCart(){
     let minQuantity:string ='0';
     cy.get('body').then((container)=>{
        if(container
        .find('#native_dropdown_selected_size_name').length){
            minQuantity = container
            .find('#native_dropdown_selected_size_name')
            .children(':nth-child(2)').text();
        console.log(`Entered size selector ${minQuantity}`);
        }
        return minQuantity;
     }).then((selQuantity) =>{
         if(!(selQuantity === '0')) {
            cy.get('body select#native_dropdown_selected_size_name')
            .select(selQuantity);
        }else{
            cy.get('#quantity')
            .as('selectQuantity')
            .then((element)=>{
                let text = element.children()
                .first().text();
                console.log('no size business');
                console.log(text);
                //selecting the least quantity giving error
                return text;
            }).then((text) =>{
                cy.get('@selectQuantity').select(text, {force:true});
            })
        }
        console.log('clicked on add to cart button');
        this.clickOnId('add-to-cart-button');
     })
    
    }

}
export class AmazonEyes extends BaseEyes {


}
export class AmazonDependencies extends BaseDependencies {


}

