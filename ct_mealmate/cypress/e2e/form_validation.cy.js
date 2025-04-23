describe('MealMate Form Validation', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.contains('➕ Add a New Meal').click();
    });
  
    it('shows validation errors when required fields are missing', () => {
      // Submit empty form
      cy.get('button[type="submit"]').click();
  
      // Expect validation messages
      cy.contains(/name is required/i);
      cy.contains(/category is required/i);
      cy.contains(/day is required/i);
    });
  
    it('prevents submission if only some fields are filled', () => {
      cy.get('input[name="name"]').type('Half Filled Meal');
      cy.get('button[type="submit"]').click();
  
      // Should still show category and day errors
      cy.contains(/category is required/i);
      cy.contains(/day is required/i);
  
      // Should NOT navigate away
      cy.url().should('include', '/add-meal');
    });
  
    it('successfully submits when all fields are filled', () => {
      cy.get('input[name="name"]').type('Valid Meal');
      cy.get('input[type="radio"][value="Dinner"]').check();
      cy.get('select[name="day"]').select('Friday');
      cy.get('button[type="submit"]').click();
  
      // Redirect back to homepage and check meal appears
      cy.url().should('eq', Cypress.config().baseUrl + '/');
      cy.contains('Friday').parent().within(() => {
        cy.contains('td', 'Valid Meal');
        cy.contains('td', 'Dinner');
      });
    });
  });
  