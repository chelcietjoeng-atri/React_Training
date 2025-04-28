// cypress/e2e/add-meal.cy.js

describe('Add Meal', () => {
    it('allows the user to add a new meal and see it on the homepage', () => {
      cy.visit('/');
  
      // Go to Add Meal form
      cy.contains('Add a New Meal').click();
      cy.url().should('include', '/add-meal');
  
      // Fill out form fields
      const mealName = 'Cypress Test Meal';
      const mealCategory = 'Lunch';
  
      cy.get('input[name="name"]').type(mealName);
      cy.contains('label', mealCategory).find('input[type="radio"]').check({ force: true });
  
      // Select today's date using flatpickr
      cy.get('input.flatpickr-input').click();
      cy.get('.flatpickr-day.today').click();
  
      // Mark as favorite
      cy.get('input[type="checkbox"]').check();
  
      // Submit form
      cy.contains('Add Meal').click();
  
      // Back on home page, meal should appear
      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
      cy.contains(mealName).should('exist');
      cy.contains(mealCategory).should('exist');
    });
});
  