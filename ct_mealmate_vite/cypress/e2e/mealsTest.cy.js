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
  it('should not allow duplicate usernames', () => {
    // Pre-create the user to simulate duplicate username
    cy.request('POST', usersApiUrl, testUser);

    cy.visit(`${baseUrl}/register`);
    cy.get('input[type="text"]').type(testUser.username); // Try using the same username
    cy.get('input[type="password"]').type(testUser.password);
    cy.contains('Register').click(); // Attempt to register again

    // Should display a message that the username already exists
    cy.contains('Username already exists.').should('exist');
  });

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
    cy.contains('Login').click(); // Submit login form

    // Expect to see an error message indicating login failure
    cy.contains('Invalid username or password').should('exist');
  });

  // 5. Display the list of meals on HomePage
  it('should display the list of meals on HomePage', () => {
    cy.contains('Test Meal').should('exist');       // Meal name
    cy.contains('Breakfast').should('exist');       // Meal category
    cy.contains('2025-05-07').should('exist');      // Meal date
  });

  // 6. Add a new meal
  it('should add a new meal', () => {
    cy.contains('➕ Add a New Meal').click();        // Open Add Meal form

    // Fill out the form fields
    cy.get('input[name="name"]').type('New Test Meal');
    cy.get('input[value="Lunch"]').check();         // Select category
    cy.get('.flatpickr-input').clear().type('2025-05-08'); // Set meal date
    cy.get('input[type="checkbox"]').check();       // Mark as favorite

    cy.contains('Add Meal').click();                // Submit the form

    // Confirm redirection to homepage
    cy.url().should('eq', `${baseUrl}/`);

    // Check that the newly added meal appears in the list
    cy.contains('New Test Meal').should('exist');
    cy.contains('Lunch').should('exist');
    cy.contains('2025-05-08').should('exist');
  });

  // 7. Edit an existing meal
  it('should edit an existing meal', () => {
    cy.contains('Test Meal').parent().contains('✏️ Edit').click(); // Open edit form

    // Change the form values
    cy.get('input[name="name"]').clear().type('Edited Meal');      // Update name
    cy.get('input[value="Dinner"]').check();                       // Change category
    cy.get('.flatpickr-input').clear().type('2025-05-09');         // Update date
    cy.get('input[type="checkbox"]').uncheck();                    // Unmark favorite

    cy.contains('Save Changes').click();                           // Submit the changes

    // Confirm changes are reflected on the homepage
    cy.url().should('eq', `${baseUrl}/`);
    cy.contains('Edited Meal').should('exist');
    cy.contains('Dinner').should('exist');
    cy.contains('2025-05-09').should('exist');
  });

  // 8. Delete a meal
  it('should delete a meal', () => {
    cy.contains('Test Meal').parent().contains('Delete').click();  // Trigger delete

    // Confirm that the meal is removed from the list
    cy.contains('Test Meal').should('not.exist');
  });

  // 9. Logout
  it('should log out successfully', () => {
    // Assuming there is a logout button/link on the page
    cy.contains('Logout').click(); // Click the logout button/link

    // Expect the user to be redirected to the login page after logging out
    cy.url().should('include', '/login');
  });
});
