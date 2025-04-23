describe('MealMate CRUD Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('creates a new meal', () => {
    cy.contains('➕ Add a New Meal').click();

    cy.get('input[name="name"]').type('Test Pancakes');
    cy.get('input[type="radio"][value="Breakfast"]').check();
    cy.get('select[name="day"]').select('Monday');
    cy.get('input[type="checkbox"][name="favorite"]').check();
    cy.get('button[type="submit"]').click();

    // ✅ Should show new meal grouped under Monday
    cy.contains('Monday').parent().within(() => {
      cy.contains('td', 'Test Pancakes');
      cy.contains('td', 'Breakfast');
    });
  });

  it('edits an existing meal', () => {
    // Click "Edit" link on first meal row
    cy.get('table tbody tr').first().within(() => {
      cy.contains('Edit').click();
    });

    // Update form fields
    cy.get('input[name="name"]').clear().type('Updated Pancakes');
    cy.get('select[name="day"]').select('Tuesday');
    cy.get('input[type="radio"][value="Lunch"]').check();
    cy.get('button[type="submit"]').click();

    // ✅ Confirm meal shows up under Tuesday
    cy.contains('Tuesday').parent().within(() => {
      cy.contains('td', 'Updated Pancakes');
      cy.contains('td', 'Lunch');
    });
  });

  it('deletes a meal', () => {
    // Capture current row count
    cy.get('table tbody tr').then(($rows) => {
      const initialCount = $rows.length;

      // Delete first meal
      cy.get('table tbody tr').first().within(() => {
        cy.contains('Delete').click();
      });

      cy.get('table tbody tr').should('have.length.lessThan', initialCount);
    });
  });
});
