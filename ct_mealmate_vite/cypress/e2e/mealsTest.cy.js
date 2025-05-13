// mealsTest.cy.js
// This file contains Cypress tests for the MealMate application, covering user registration, login, meal management (add, edit, delete), and logout functionality.

describe('Authentication and Meal Management', () => {
  const baseUrl = 'http://localhost:5173'; // Frontend base URL
  const apiUrl = 'http://localhost:3001/meals'; // Backend API endpoint for meals
  const usersApiUrl = 'http://localhost:3001/users'; // Backend API for users

  // Register and log in user data
  const testUser = { username: 'testuser', password: 'testpass' };

  beforeEach(() => {
    // Reset the users database before each test to ensure a clean state
    cy.request('GET', usersApiUrl).then((response) => {
      response.body.forEach((user) => {
        cy.request('DELETE', `${usersApiUrl}/${user.id}`);
      });
    });

    // Pre-create the user to ensure they can log in
    cy.request('POST', usersApiUrl, testUser);

    // Reset the meals database before each test to ensure a clean state
    cy.request('GET', apiUrl).then(response => {
      response.body.forEach(meal => {
        cy.request('DELETE', `${apiUrl}/${meal.id}`);
      });
    });

    // Add a default meal for testing display, edit, and delete functionality
    cy.fixture('testMeal').then((meal) => {
      cy.request('POST', apiUrl, meal);
    });

    // Visit the homepage before each test
    cy.visit(baseUrl);
  });

  // 1. Register a new user
  it('should register a new user', () => {
    cy.visit(`${baseUrl}/register`);
    cy.get('input[type="text"]').type('newuser'); // Enter username
    cy.get('input[type="password"]').type('newpassword'); // Enter password
    cy.contains('Register').click(); // Submit the form

    // Expect the user to be redirected to the login page after successful registration
    cy.url().should('include', '/login');
  });

  // 2. Check if duplicate usernames are not allowed
  // it('should not allow duplicate usernames', () => {
  //   // Pre-create the user to simulate duplicate username
  //   cy.request('POST', usersApiUrl, testUser);

  //   cy.visit(`${baseUrl}/register`);
  //   cy.get('input[type="text"]').type(testUser.username); // Try using the same username
  //   cy.get('input[type="password"]').type(testUser.password);
  //   cy.contains('Register').click(); // Attempt to register again

  //   // Should display a message that the username already exists
  //   cy.contains('Username already exists.').should('exist');
  // });

  // 3. Login with valid credentials
  it('should login successfully with correct credentials', () => {
    cy.visit(`${baseUrl}/login`);
  
    cy.get('input[type="text"]').type(testUser.username);
    cy.get('input[type="password"]').type(testUser.password);
    cy.get('button[type="submit"]').click();
  
    // Wait for redirect
    cy.location('pathname', { timeout: 5000 }).should('eq', '/');
  
    // Check user is stored
    cy.window().then((win) => {
      const storedUser = win.localStorage.getItem('user');
      expect(storedUser).to.not.be.null;
    });
  });  

  // 4. Login with invalid credentials
  it('should display error on invalid login', () => {
    cy.visit(`${baseUrl}/login`);
    cy.get('input[type="text"]').type('wronguser'); // Enter invalid username
    cy.get('input[type="password"]').type('wrongpass'); // Enter invalid password
    cy.get('button[type="submit"]').click(); // Submit login form
  
    // After inspecting, resume and assert
    cy.contains('Invalid username or password').should('exist');
  });

  // 5. Display the list of meals on HomePage
  it('should display the list of meals on HomePage', () => {
    cy.visit(`${baseUrl}/login`);

    cy.get('input[type="text"]').type(testUser.username); // Type valid username
    cy.get('input[type="password"]').type(testUser.password); // Type valid password
    cy.get('button[type="submit"]').click(); // Submit login form
    
    // Wait for redirect to home page
    cy.location('pathname', { timeout: 5000 }).should('eq', '/');
    
    // Check if the user is stored in localStorage
    cy.window().then((win) => {
      const storedUser = win.localStorage.getItem('user');
      expect(storedUser).to.not.be.null;
    });

    // If the welcome popup exists in localStorage, check for it
    cy.window().then((win) => {
      const showWelcomePopup = win.localStorage.getItem('showWelcomePopup');
      if (showWelcomePopup === 'true') {
        // Check that the Welcome Popup is visible
        cy.get('.welcome-popup').should('be.visible');
        cy.contains('Good Morning!'); // Check for greeting message
        cy.contains('Have you eaten yet?'); // Check for additional message
        cy.contains('🍽 Add a Meal').should('be.visible'); // Check for "Add a Meal" button
        cy.contains('📋 View Meals').should('be.visible'); // Check for "View Meals" button
      } else {
        // No popup, so continue with meal listing
        cy.contains('Test Meal').should('exist'); // Check if the meal name exists
        cy.contains('Breakfast').should('exist'); // Check if the meal category exists
      }
    });

    // If no popup, proceed to meal checks
    cy.contains('Test Meal').should('exist'); // Meal name check
    cy.contains('Breakfast').should('exist'); // Meal category check
  });

  // 6. Add a new meal
  it('should add a new meal', () => {
    cy.visit(`${baseUrl}/login`);

    cy.get('input[type="text"]').type(testUser.username);
    cy.get('input[type="password"]').type(testUser.password);
    cy.get('button[type="submit"]').click();

    cy.location('pathname', { timeout: 5000 }).should('eq', '/');

    cy.window().then((win) => {
      const storedUser = win.localStorage.getItem('user');
      expect(storedUser).to.not.be.null;
    });

    // Check if Welcome Popup is present and click "Add a Meal"
    cy.get('body').then(($body) => {
      if ($body.find('.welcome-popup').length > 0) {
        cy.get('.welcome-popup').should('be.visible');
        cy.contains('Have you eaten yet?').should('exist');
        cy.contains('🍽 Add a Meal').click(); // Navigate to add meal page
      } else {
        cy.contains('➕ Add a New Meal').click(); // Fallback if no popup
      }
    });

    // Fill form and submit
    cy.get('input[name="name"]').type('New Test Meal');
    cy.get('input[value="Lunch"]').check();
    cy.get('input[type="checkbox"]').check();

    cy.contains('Add Meal').click();

    cy.url().should('eq', `${baseUrl}/`);
    cy.contains('New Test Meal').should('exist');
    cy.contains('Lunch').should('exist');
  });

  // 7. Edit an existing meal
  it('should edit an existing meal', () => {
    cy.visit(`${baseUrl}/login`);

    cy.get('input[type="text"]').type(testUser.username);
    cy.get('input[type="password"]').type(testUser.password);
    cy.get('button[type="submit"]').click();

    cy.location('pathname', { timeout: 5000 }).should('eq', '/');

    cy.window().then((win) => {
      const storedUser = win.localStorage.getItem('user');
      expect(storedUser).to.not.be.null;
    });

    cy.get('body').then(($body) => {
      if ($body.find('.welcome-popup').length > 0) {
        cy.get('.welcome-popup').should('be.visible');
        cy.contains('Have you eaten yet?').should('exist');
        cy.contains('🍽 Add a Meal').click();
      } else {
        cy.contains('➕ Add a New Meal').click();
      }
    });

    // Wait until input is enabled before typing
    cy.get('input[name="name"]')
      .should('exist')
      .and('not.be.disabled')
      .type('Test Meal');

    cy.get('input[value="Lunch"]').check();
    cy.get('input[type="checkbox"]').check();

    cy.contains('Add Meal').click();

    cy.url().should('eq', `${baseUrl}/`);
    cy.contains('Test Meal').should('exist');
    cy.contains('Lunch').should('exist');

    // Click Edit on the meal
    cy.contains('Test Meal')
      .parent()
      .contains('Edit')
      .click();

    cy.wait(300);

    // Wait for Edit form input to be ready before clearing/typing
    cy.get('input[name="name"]', { timeout: 5000 })
      .should('exist')
      .and('be.visible')
      .and('not.be.disabled')
      .clear()
      .type('Edited Meal');

    cy.get('input[value="Dinner"]').check();
    cy.get('input[type="checkbox"]').uncheck();

    cy.contains('button', 'Save Changes').click();

    cy.url().should('eq', `${baseUrl}/`);
    cy.contains('Edited Meal').should('exist');
    cy.contains('Dinner').should('exist');
  });

  // 8. Delete a meal
  it('should delete a meal', () => {
    cy.visit(`${baseUrl}/login`);

    cy.get('input[type="text"]').type(testUser.username);
    cy.get('input[type="password"]').type(testUser.password);
    cy.get('button[type="submit"]').click();

    cy.location('pathname', { timeout: 5000 }).should('eq', '/');

    cy.window().then((win) => {
      const storedUser = win.localStorage.getItem('user');
      expect(storedUser).to.not.be.null;
    });

    cy.get('body').then(($body) => {
      if ($body.find('.welcome-popup').length > 0) {
        cy.get('.welcome-popup').should('be.visible');
        cy.contains('Have you eaten yet?').should('exist');
        cy.contains('🍽 Add a Meal').click();
      } else {
        cy.contains('➕ Add a New Meal').click();
      }
    });

    // Wait until input is enabled before typing
    cy.get('input[name="name"]')
      .should('exist')
      .and('not.be.disabled')
      .type('Test Meal');

    cy.get('input[value="Lunch"]').check();
    cy.get('input[type="checkbox"]').check();

    cy.contains('Add Meal').click();

    cy.url().should('eq', `${baseUrl}/`);
    cy.contains('Test Meal').should('exist');
    cy.contains('Lunch').should('exist');

    // Delete the meal
    cy.contains('Test Meal')
      .parent()
      .contains('Delete')
      .click();

    // Verify meal is gone
    cy.contains('Test Meal').should('not.exist');
  });

  // 9. Logout
  it('should log out successfully', () => {
    // Login flow
    cy.visit(`${baseUrl}/login`);
    
    cy.get('input[type="text"]').type(testUser.username); // Type valid username
    cy.get('input[type="password"]').type(testUser.password); // Type valid password
    cy.get('button[type="submit"]').click(); // Submit login form
    
    // Wait for redirect to home page
    cy.location('pathname', { timeout: 5000 }).should('eq', '/');
    
    // Check if the user is stored in localStorage
    cy.window().then((win) => {
      const storedUser = win.localStorage.getItem('user');
      expect(storedUser).to.not.be.null;
    });
  
    // Check if Welcome Popup is present and click "View Meals"
    cy.get('body').then(($body) => {
      if ($body.find('.welcome-popup').length > 0) {
        cy.get('.welcome-popup').should('be.visible');
        cy.contains('Have you eaten yet?').should('exist');
        cy.contains('📋 View Meals').click(); // Navigate to view meals
      } else {
        cy.contains('📋 View Meals').click(); // Fallback if no popup
      }
    });
  
    // Logout action
    cy.contains('Logout').click(); // Click the logout button/link
  
    // Expect the user to be redirected to the login page after logging out
    cy.url().should('include', '/login');
  
    // Optionally, verify the user is removed from localStorage after logout
    cy.window().then((win) => {
      const storedUserAfterLogout = win.localStorage.getItem('user');
      expect(storedUserAfterLogout).to.be.null;
    });
  });  
});
