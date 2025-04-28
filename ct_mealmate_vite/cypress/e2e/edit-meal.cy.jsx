// cypress/e2e/edit-meal.cy.js

describe('Edit Meal', () => {
    it('allows the user to edit an existing meal and see the changes on the homepage', () => {
      cy.visit('/');
  
      // Add a meal to edit
      const originalName = 'Original Meal';
      const editedName = 'Edited Cypress Meal';
  
      cy.contains('Add a New Meal').click();
      cy.get('input[name="name"]').type(originalName);
      cy.contains('label', 'Dinner').find('input[type="radio"]').check({ force: true });
      cy.get('input.flatpickr-input').click();
      cy.get('.flatpickr-day.today').click();
      cy.get('input[type="checkbox"]').check();
      cy.contains('Add Meal').click();
  
      // Edit the newly added meal
      cy.contains(originalName).parent().contains('Edit').click();
      cy.url().should('include', '/edit-meal/');
  
      // Change name and uncheck favorite
      cy.get('input[name="name"]').clear().type(editedName);
      cy.get('input[type="checkbox"]').uncheck();
  
      // Submit changes
      cy.contains('Save Changes').click();
  
      // Back on home page, edited meal should be visible
      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
      cy.contains(editedName).should('exist');
      cy.contains(originalName).should('not.exist');
    });
  });
  