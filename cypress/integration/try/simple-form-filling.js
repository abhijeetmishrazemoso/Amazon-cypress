/// <reference types="cypress" />

describe('first form test', () =>{
    before(() => {
        cy.visit('https://demoqa.com/automation-practice-form')
    })
    
    it('testing Name',() => {
        cy.testNameField('input#firstName', 'Abhijeet');
        cy.testNameField('input#lastName', 'Mishra');
    })


    it('testing email',() => {
        cy.get('input[placeholder="name@example.com"]')
        .as('emailField')
        .type('abhijeet.mishra@zemosolabs.com')
        cy.get('@emailField')
        .should('have.value','abhijeet.mishra@zemosolabs.com');

    })

    it('testing checkboxes',() => {
        cy.get('input[name="gender"]').check('Male', {force: true});
        // cy.get('input#gender-radio-1').focus().click();
    })
        //giving 11 numbers in mobile number
    it('test date of birth', () => {
        cy.get('input#dateOfBirthInput').click();
        cy.get('div.react-datepicker').should('be.visible')
        .as('wholeDatePicker')
        .children()
        .find('select.react-datepicker__month-select')
        .select('8');

        cy.get('@wholeDatePicker').should('be.visible')
        .find('select.react-datepicker__year-select')
        .select('2000');
        //testing a particular date hence specific below
        cy.get('@wholeDatePicker')
        .find('div.react-datepicker__day.react-datepicker__day--014')
        .click();
    })
        
    it('Enter "History", "Sc -Computer Science" and clear all',() => {
        cy.get('input#subjectsInput').
        as('subjectsInput')
        .type('His{enter}')
        cy.get('div#subjectsContainer').contains('History');
        
        cy.get('@subjectsInput')
        .type('Sc{enter}')
        cy.get('div#subjectsContainer').contains('Computer Science');

        cy.get('div.subjects-auto-complete__clear-indicator')
        .click()
        cy.get('@subjectsInput').should('not.have.text','History');
        cy.get('@subjectsInput').should('not.have.text','Computer Science');
        cy.get('div.subjects-auto-complete__indicators.css-1wy0on6 svg').should('not.exist')

    })
    it('Enter "History", "Sc -Computer Science" and clear only "History"',() => {
        cy.get('input#subjectsInput')
        .as('subjectsInput')
        .type('His{enter}')
        cy.get('div#subjectsContainer')
        .contains('History').as('historyContainer');
        
        cy.get('@subjectsInput')
        .type('Sc{enter}')
        cy.get('div#subjectsContainer').contains('Computer Science');

        //removing "History"
        cy.get('div.subjects-auto-complete__value-container')
        .contains('History').siblings('div').click();
        cy.get('@subjectsInput').should('not.have.text','History');

    })

    




    it('Sports Reading music Checkboxes test', () => {
        cy.get('input[type="checkbox"').check('1',{force: true})
    })
    it('Textarea test', () => {
        cy.get('textarea[placeholder="Current Address"')
        .type('An Amazing address')
        .should('have.value','An Amazing address');
    })
        
    it('Modal Testing', () => {
        cy.get('button#submit').click();

        cy.get('div.modal-content')
        .as('submitModal')
        .should('be.visible');

        cy.get('button#closeLargeModal').click({force:true})
        .then(() => {
        cy.get('@submitModal').should('not.exist')
        })
    })

})