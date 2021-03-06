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
    let email:string = '';
    let passwordd:string = '';
   cy.fixture("login-credentials.json").then((loginCredentials) => {
      email = loginCredentials.email;
      passwordd = loginCredentials.password;
   }).then(() => {
      this.clickOnId('nav-link-accountList');
     this.typeTextonId('ap_email',email);
     this.typeTextonId('ap_email','{enter}');
     this.typeTextonId('ap_password',passwordd);
     this.typeTextonId('ap_password','{enter}');
   })
 }
 getSynchronousCurrentCartCount():number{
    return Number(Cypress.$('#nav-cart-count').text());
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
        if(Cypress.
         // $('div.a-section.a-spacing-small.a-text-center strong').length){
         $('#native_dropdown_selected_size_name').length){
            console.log("Entered jquery select size found")
            Cypress.$
            ('#native_dropdown_selected_size_name>option:eq(2)')
            .prop('selected','selected');
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

