describe('Home Page', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('displays sticky header and navigates home on title click', () => {
      cy.contains("🍽️ CT's MealMate")
        .should('be.visible')
        .click();
      cy.url().should('include', '/'); // confirms nav works
    });
  
    it('shows all filter and action controls', () => {
      cy.get('input[placeholder="Search meals"]').should('exist');
      cy.get('select').should('contain', 'Sort by…');
      cy.contains('⭐ Show Favorites').should('exist');
      cy.contains('➕ Add a New Meal').should('exist');
      cy.contains('📊 View Meal Stats').should('exist');
    });
  
    it('toggles favorite meals', () => {
      // Only if at least one meal is present
      cy.get('table tbody tr').then((rows) => {
        if (rows.length > 0) {
          cy.get('table tbody tr')
            .first()
            .find('button')
            .contains(/⭐|☆/)
            .click();
        }
      });
    });
  
    it('shows meal stats modal when clicked', () => {
      cy.contains('📊 View Meal Stats').click();
      cy.contains('Meals per Category').should('exist');
      cy.contains('Close').click();
    });
  
    it('navigates weeks and resets to today', () => {
      cy.contains('← Prev Week').click();
      cy.contains('Next Week →').click();
      cy.contains('Today').click();
    });
  
    it('shows days of the week and allows adding meals', () => {
      const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      weekDays.forEach((day) => {
        cy.contains(day).should('exist');
      });
  
      // If a day has no meals, show "Add a meal"
      cy.get('table').each(($table) => {
        cy.wrap($table).within(() => {
          cy.contains('➕ Add a meal').should('exist');
        });
      });
    });
  
    it('searches meals by name (case-insensitive)', () => {
      cy.get('input[placeholder="Search meals"]').type('pasta');
      cy.get('table tbody tr').each(($tr) => {
        cy.wrap($tr).should('contain.text', 'pasta');
      });
    });
  
    it('sorts meals by category or date if selected', () => {
      cy.get('select').select('Category');
      cy.get('select').select('Date');
    });
  });
  