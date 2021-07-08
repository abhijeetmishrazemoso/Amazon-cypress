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
     this.typeTextonId('ap_email','');
     this.typeTextonId('ap_password','');
     cy.wait(400);
 }
 typeTextInInputWithName(name:string,text:string){
    cy.get(`input[name="${name}"]`)
    .type(text)
 }
 clickOnSubmitInputWithName(name:string){
    cy.get(`input[name="${name}"]`)
    .click();
 }
 ifSizePresentSelSizeAddToCart(){
     cy.get('body').then((container)=>{
        if(container
        .find('div.a-section.a-spacing-small.a-text-center strong').length !==0 ){
            container
            .find('#native_dropdown_selected_size_name')
            .children(':nth-child(2)').attr('selected','selected');
        }
    }).then(() => {
        cy.wait(4000);
        this.clickOnId('add-to-cart-button');
    })
    }
 typeTextOnInputWithId(id :string, text:string){
    cy.get(`input#${id}`).type(text);
 }  
 typeTextOnInputWithAttr(attrName :string, attrVal:string, text:string){
    cy.get(`input[${attrName}]=[${attrVal}]`).type(text);
 }  

}
export class AmazonEyes extends BaseEyes {


}
export class AmazonDependencies extends BaseDependencies {


}

