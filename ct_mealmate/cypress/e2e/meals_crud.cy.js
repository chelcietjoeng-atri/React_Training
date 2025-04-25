// cypress/e2e/meals_crud.cy.js

describe('MealMate CRUD Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('creates a new meal', () => {
    cy.contains('➕ Add a New Meal').click();

    const mealName = 'Test Pancakes';
    const category = 'Breakfast';

    cy.get('input[name="name"]').type(mealName);
    cy.get('input[type="radio"][value="Breakfast"]').check();
    cy.get('input.flatpickr-input').click();
    cy.get('.flatpickr-day.today').click();
    cy.get('input[type="checkbox"][name="favorite"]').check();
    cy.get('button[type="submit"]').click();

    // ✅ Should show new meal on homepage
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.contains(mealName).should('exist');
    cy.contains(category).should('exist');
  });

  it('edits an existing meal', () => {
    // Click Edit on first meal
    cy.get('table tbody tr').first().within(() => {
      cy.contains('Edit').click();
    });

    // Edit form
    const updatedName = 'Updated Pancakes';
    const updatedCategory = 'Lunch';

    cy.get('input[name="name"]').clear().type(updatedName);
    cy.get('input[type="radio"][value="Lunch"]').check();
    cy.get('input.flatpickr-input').click();
    cy.get('.flatpickr-day.today').click();
    cy.get('button[type="submit"]').click();

    // ✅ Confirm updated meal on homepage
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.contains(updatedName).should('exist');
    cy.contains(updatedCategory).should('exist');
  });

  it('deletes a meal', () => {
    cy.get('table tbody tr').then(($rows) => {
      const initialCount = $rows.length;

      cy.get('table tbody tr').first().within(() => {
        cy.contains('Delete').click();
      });

      cy.get('table tbody tr').should('have.length.lessThan', initialCount);
    });
  });
});
