// cypress/e2e/form_validation.cy.js

describe('MealMate Form Validation', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('➕ Add a New Meal').click();
  });

  it('shows validation errors when required fields are missing', () => {
    // Submit empty form
    cy.get('button[type="submit"]').click();

    // Expect validation messages
    cy.contains(/meal name is required/i);
    cy.contains(/meal type is required/i);
  });

  it('prevents submission if only some fields are filled', () => {
    // Fill only name
    cy.get('input[name="name"]').type('Half Filled Meal');
    cy.get('button[type="submit"]').click();

    // Should show category error
    cy.contains(/meal type is required/i);

    // Should not navigate away
    cy.url().should('include', '/add-meal');
  });

  it('successfully submits when all fields are filled', () => {
    const mealName = 'Valid Meal';
    cy.get('input[name="name"]').type(mealName);
    cy.get('input[type="radio"][value="Dinner"]').check();

    // Optional: change date if you want
    cy.get('input.flatpickr-input').click();
    cy.get('.flatpickr-day.today').click();

    cy.get('button[type="submit"]').click();

    // Should return to homepage and show new meal
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.contains(mealName).should('exist');
    cy.contains('Dinner').should('exist');
  });
});
