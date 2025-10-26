# Demoblaze Test Automation Framework

A comprehensive end-to-end test automation framework for the [Demoblaze](https://www.demoblaze.com/) e-commerce website, built with Playwright and JavaScript.

## 📋 Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Page Objects](#page-objects)
- [Test Workflow](#test-workflow)
- [Running Tests](#running-tests)
- [Test Scenarios](#test-scenarios)
- [Configuration](#configuration)
- [Test Reports](#test-reports)
- [Best Practices](#best-practices)

## 🔍 Overview

This project implements automated tests for the Demoblaze e-commerce platform using Playwright. It follows the Page Object Model (POM) design pattern and includes data-driven testing capabilities with complete test coverage for user registration, authentication, product ordering, and logout workflows.

**Key Features:**
- ✅ **Custom Playwright fixtures** for automatic test setup and cleanup
- ✅ **Page Object Model** architecture with separate classes for each page
- ✅ **Authenticated page fixture** - auto-login for tests requiring authentication
- ✅ Data-driven testing with JSON file storage
- ✅ Dynamic user data generation for registration
- ✅ Complete user journey testing (register → login → order → logout)
- ✅ Automated product selection and checkout process
- ✅ Proper alert/dialog handling with event listeners
- ✅ Screenshot and video capture on failure
- ✅ HTML test reports with detailed execution traces
- ✅ CI/CD ready configuration
- ✅ Independent test execution with automatic validation

## 📦 Prerequisites

Before running the tests, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)

## 🚀 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd demoblaze
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## 📁 Project Structure

```
demoblaze/
├── fixtures/                  # Custom Playwright fixtures
│   ├── base-test.js          # Custom test fixtures (auto-setup)
│   └── BASE_TEST_GUIDE.md    # Detailed guide on using fixtures
├── pages/                     # Page Object Model classes
│   ├── categoriesPage.js     # Category navigation
│   ├── loginPage.js          # Login page interactions
│   ├── logoutPage.js         # Logout page interactions
│   ├── productPage.js        # Product and cart operations
│   └── registerPage.js       # Registration page interactions
├── tests/                     # Test specifications
│   ├── login-test.js         # Login functionality tests
│   ├── logout-test.js        # Logout functionality tests
│   ├── order-test.js         # Product ordering tests
│   └── register-test.js      # User registration tests
├── test-data/                 # Test data files
│   └── userData.json         # User credentials (dynamically generated)
├── utils/                     # Helper utilities
│   └── dataHelper.js         # Data generation and reading utilities
├── playwright.config.js       # Playwright configuration
├── package.json              # Project dependencies
└── README.md                  # Project documentation
```

## 🎭 Base Test Fixtures Pattern

This framework uses **custom Playwright fixtures** for cleaner, more maintainable tests. All tests import from `fixtures/base-test.js` instead of `@playwright/test` directly.

### Why Use Fixtures?

**Before (without fixtures):**
```javascript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';

test('login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('https://www.demoblaze.com/');
  await loginPage.openLogin();
  // ... repeated code in every test
});
```

**After (with fixtures):**
```javascript
import { test, expect } from '../fixtures/base-test.js';

test('login', async ({ loginPage, userData }) => {
  await loginPage.openLogin();  // Already at homepage, page objects ready!
  await loginPage.login(userData.username, userData.password);
});
```

### Available Fixtures

| Fixture | Description |
|---------|-------------|
| `page` | Auto-navigates to Demoblaze homepage |
| `loginPage` | Pre-initialized LoginPage object |
| `registerPage` | Pre-initialized RegisterPage object |
| `logoutPage` | Pre-initialized LogoutPage object |
| `productPage` | Pre-initialized ProductPage object |
| `categoriesPage` | Pre-initialized CategoriesPage object |
| `userData` | User credentials from userData.json (validated) |
| `authenticatedPage` | **Auto-logs in the user before test starts** |

### Key Benefits:
- ✅ No repetitive `page.goto()` calls
- ✅ Page objects automatically initialized
- ✅ `authenticatedPage` fixture auto-logs in users
- ✅ Automatic validation of test data
- ✅ Cleaner, more readable tests
- ✅ Built-in hooks for logging and debugging

📖 **See `fixtures/BASE_TEST_GUIDE.md` for detailed usage examples**

## 🎯 Page Objects

The framework implements Page Object Model with dedicated classes for each functional area:

### 1. **RegisterPage** (`pages/registerPage.js`)
Handles user registration functionality.

**Locators:**
- `signupLink`: Opens the registration modal (`#signin2`)
- `usernameInput`: Username input field (`#sign-username`)
- `passwordInput`: Password input field (`#sign-password`)
- `signupButton`: Registration submit button

**Methods:**
- `openSignup()`: Opens the sign-up modal and waits for form to load
- `register(username, password)`: Fills credentials and submits registration

### 2. **LoginPage** (`pages/loginPage.js`)
Manages user authentication.

**Locators:**
- `loginLink`: Opens the login modal (`#login2`)
- `usernameInput`: Username input field (`#loginusername`)
- `passwordInput`: Password input field (`#loginpassword`)
- `loginButton`: Login submit button

**Methods:**
- `openLogin()`: Opens the login modal and waits for form
- `login(username, password)`: Performs user login

### 3. **ProductPage** (`pages/productPage.js`)
Handles product browsing, cart operations, and checkout.

**Locators:**
- `addToCartButton`: Add product to cart button
- `cartLink`: Shopping cart link (`#cartur`)
- `placeOrderButton`: Initiates checkout process
- `nameInput`, `countryInput`, `cityInput`: Order form fields
- `cardInput`, `monthInput`, `yearInput`: Payment information fields
- `purchaseButton`: Completes the purchase

**Methods:**
- `addProductToCart(productCategory, productName)`: Navigates to category, selects product, and adds to cart
- `openCart()`: Opens the shopping cart page
- `placeOrder()`: Fills order details and completes purchase (uses test data: QA Tester, Egypt, Cairo)

### 4. **LogoutPage** (`pages/logoutPage.js`)
Manages user logout functionality.

**Locators:**
- `logoutLink`: Logout button (`#logout2`)

**Methods:**
- `logout()`: Performs user logout

## 🔄 Test Workflow

The test suite follows a complete user journey:

```
1. Register → Generate unique credentials → Create new user account
                    ↓
2. Login    → Use stored credentials → Authenticate user
                    ↓
3. Shop     → Browse products → Add to cart → Complete checkout
                    ↓
4. Logout   → End session → Verify logout successful
```

**Data Flow:**
- `register-test.js` generates credentials via `generateUserData()`
- Credentials are saved to `test-data/userData.json`
- Subsequent tests (`login-test.js`, `product-test.js`, `logout-test.js`) read from this file using `readUserData()`
- Each test is independent and can run standalone

## 🏃 Running Tests

### Run all tests:
```bash
npx playwright test
```

### Run a specific test file:
```bash
npx playwright test tests/login-test.js
npx playwright test tests/product-test.js
npx playwright test tests/register-test.js
npx playwright test tests/logout-test.js
```

### Run tests in UI mode (interactive):
```bash
npx playwright test --ui
```

### Run tests in headed mode (see browser):
```bash
npx playwright test --headed
```

### Debug a specific test:
```bash
npx playwright test tests/login-test.js --debug
```

### View test report:
```bash
npx playwright show-report
```

## 🧪 Test Scenarios

### 1. **Registration Test** (`tests/register-test.js`)
**Test Name:** "User can register with valid data"

**Steps:**
1. Generate unique credentials using `generateUserData()` (format: `user_xxxxxx` / `pass_xxxxxx`)
2. Navigate to https://www.demoblaze.com/
3. Open the sign-up modal
4. Fill in username and password
5. Submit registration form
6. Wait 3 seconds to observe the registration process

**Data Generated:**
- Credentials are saved to `test-data/userData.json` for use in subsequent tests

**Expected Outcome:**
- User account is created successfully
- Credentials are persisted for later tests

---

### 2. **Login Test** (`tests/login-test.js`)
**Test Name:** "User can log in with valid data"

**Steps:**
1. Read credentials from `test-data/userData.json` using `readUserData()`
2. Navigate to https://www.demoblaze.com/
3. Open the login modal
4. Enter username and password
5. Submit login form
6. Wait 3 seconds to observe login process

**Assertions:**
- Verify that `#nameofuser` element contains the username
- Confirms successful authentication

**Expected Outcome:**
- User is logged in successfully
- Username is displayed in the navigation bar

---

### 3. **Product Test** (`tests/product-test.js`)
**Test Name:** "User can successfully order an Apple monitor 24"

**Steps:**
1. Read credentials from `test-data/userData.json`
2. Navigate to https://www.demoblaze.com/
3. Perform login using `LoginPage`
4. Navigate to "Monitors" category
5. Click on "Apple monitor 24" product
6. Add product to cart (handles alert dialog)
7. Open shopping cart
8. Click "Place Order" button
9. Fill order form with test data:
   - Name: "QA Tester"
   - Country: "Egypt"
   - City: "Cairo"
   - Card: "123456789"
   - Month: "10"
   - Year: "2025"
10. Click "Purchase" button

**Assertions:**
- Verify that `.sweet-alert` confirmation dialog is visible

**Expected Outcome:**
- Product is successfully added to cart
- Order is placed successfully
- Confirmation message appears

---

### 4. **Logout Test** (`tests/logout-test.js`)
**Test Name:** "User can log out successfully"

**Steps:**
1. Read credentials from `test-data/userData.json`
2. Navigate to https://www.demoblaze.com/
3. Perform login using `LoginPage`
4. Wait for `#nameofuser` element to appear (confirms login)
5. Click logout button using `LogoutPage`

**Assertions:**
- Verify that `#login2` (login link) is visible again
- Confirms user is logged out

**Expected Outcome:**
- User session is terminated
- Login link reappears in navigation
- User can login again

---

### 📊 Test Execution Order (Recommended)

For a complete test run, execute tests in this order:

```bash
# 1. Register a new user
npx playwright test tests/register-test.js

# 2. Test login functionality
npx playwright test tests/login-test.js

# 3. Test product ordering
npx playwright test tests/product-test.js

# 4. Test logout functionality
npx playwright test tests/logout-test.js
```

Or run all tests together:
```bash
npx playwright test
```

## ⚙️ Configuration

The `playwright.config.js` file contains the test configuration:

- **Test Directory**: `./tests`
- **Test Pattern**: Files ending with `-test.js`
- **Parallel Execution**: Enabled (`fullyParallel: true`)
- **Retries**: 2 retries in CI, 0 locally
- **Browser**: Chromium (Desktop Chrome)
- **Screenshots**: Captured on failure
- **Videos**: Retained on failure
- **Trace**: Captured on first retry

### Key Configuration Options:
```javascript
{
  testDir: './tests',
  testMatch: '**/*-test.js',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  }
}
```

## 🛠️ Utilities

### Data Helper (`utils/dataHelper.js`)

Provides utility functions for test data management:

**Functions:**

1. **`generateUserData()`**
   - Generates unique username and password
   - Format: `user_xxxxxx` and `pass_xxxxxx` (random 6-char strings)
   - Automatically saves credentials to `test-data/userData.json`
   - Returns: `{ username, password }`
   - Used by: `register-test.js`

2. **`readUserData()`**
   - Reads credentials from `test-data/userData.json`
   - Returns: `{ username, password }`
   - Used by: `login-test.js`, `product-test.js`, `logout-test.js`

**Example userData.json:**
```json
{
  "username": "user_hfl7pa",
  "password": "pass_ongyqo"
}
```

## 📊 Test Reports

After running tests, an HTML report is automatically generated:

1. **View the latest report**:
```bash
npx playwright show-report
```

2. **Report location**: `playwright-report/index.html`

The report includes:
- Test execution summary with pass/fail statistics
- Duration of each test
- Screenshots of failures
- Video recordings of failed tests (if enabled)
- Execution traces for debugging
- Detailed error messages and stack traces
- Browser console logs
- Network activity logs

## 📚 Best Practices

### Page Object Model (POM)
- Each page has its own class with locators and methods
- Separates test logic from page interactions
- Makes tests more maintainable and reusable

### Data-Driven Testing
- Test data is stored in `test-data/userData.json`
- Helper functions in `utils/dataHelper.js` manage data
- Credentials are generated dynamically for registration

### Test Independence
- Each test can run independently
- Tests don't depend on each other's state
- Fresh user data can be generated as needed

### Error Handling
- Screenshots captured on test failures
- Videos retained for failed tests
- Traces available for debugging

## 🔧 Troubleshooting

### Common Issues and Solutions:

#### 1. **Tests fail with timeout errors**
**Symptoms:** Test times out waiting for elements or page load

**Solutions:**
```javascript
// Increase timeout in individual test
test('my test', async ({ page }) => {
  test.setTimeout(60000); // 60 seconds
  // ... test code
});

// Or increase globally in playwright.config.js
export default defineConfig({
  timeout: 60000, // 60 seconds per test
});
```
- Check network connectivity
- Verify https://www.demoblaze.com/ is accessible
- Try running with `--headed` flag to see what's happening

#### 2. **Login/Register tests fail: User already exists**
**Symptoms:** Registration fails because username is taken

**Solutions:**
- Delete `test-data/userData.json` and run `register-test.js` first
- Or manually generate new credentials:
```bash
# This will create new credentials
npx playwright test tests/register-test.js
```

#### 3. **Product test fails: Cannot find product**
**Symptoms:** Test cannot locate "Apple monitor 24" or "Monitors" category

**Solutions:**
- Verify product exists on the website
- Check if product name or category changed
- Update `productPage.js` with correct selectors
- Use Playwright Inspector:
```bash
npx playwright test tests/product-test.js --debug
```

#### 4. **Locator not found errors**
**Symptoms:** Element with selector `#login2`, `#nameofuser`, etc. not found

**Solutions:**
- Website UI may have changed
- Inspect the page and update selectors in page objects
- Use Playwright Inspector to find correct locators:
```bash
npx playwright codegen https://www.demoblaze.com/
```

#### 5. **Alert/Dialog handling issues**
**Symptoms:** Tests hang or fail when alert appears after "Add to cart"

**Solutions:**
- The `productPage.js` already includes `waitForTimeout(2000)` and dialog handling
- If issues persist, update the alert handling:
```javascript
page.on('dialog', async dialog => {
  console.log(dialog.message());
  await dialog.accept();
});
```

#### 6. **Tests fail: userData.json not found**
**Symptoms:** `Error: ENOENT: no such file or directory, open './test-data/userData.json'`

**Solutions:**
- Run the registration test first to generate credentials:
```bash
npx playwright test tests/register-test.js
```
- This creates the `userData.json` file needed by other tests

#### 7. **All tests fail in CI/CD**
**Symptoms:** Tests pass locally but fail in CI environment

**Solutions:**
- Ensure Playwright browsers are installed in CI:
```yaml
# Example for GitHub Actions
- name: Install Playwright Browsers
  run: npx playwright install --with-deps
```
- Check CI environment has network access
- Review CI logs for specific error messages

### Debug Commands

**Run with UI Mode (Interactive):**
```bash
npx playwright test --ui
```

**Run with Debug Mode (Step-by-step):**
```bash
npx playwright test tests/login-test.js --debug
```

**Generate Locators (Codegen):**
```bash
npx playwright codegen https://www.demoblaze.com/
```

**View Trace (After failure):**
```bash
npx playwright show-trace trace.zip
```

## 🆕 What's New

### Recent Updates and Improvements:

#### 🎭 Custom Fixtures Pattern (NEW!)
- **`base-test.js`** - Custom Playwright fixtures for automatic test setup
- **`authenticatedPage` fixture** - Auto-login functionality eliminates duplicate code
- **Pre-initialized page objects** - All page classes available as fixtures
- **Automatic validation** - userData fixture validates test data before running
- **Built-in hooks** - Test lifecycle logging and debugging support
- **50% less code** - Tests are now cleaner and more maintainable
- 📖 **Complete documentation** in `fixtures/BASE_TEST_GUIDE.md`

#### ✅ Bug Fixes & Enhancements
- **Fixed critical dialog handling** - Properly handles alerts with `page.once()` before actions
- **Enhanced error handling** - `dataHelper.js` now provides clear error messages
- **Improved waits** - Replaced fixed timeouts with explicit waits where possible
- **Flexible order data** - `placeOrder()` method now accepts custom order data
- **Better assertions** - Registration test now validates success messages

#### ✅ Complete Test Suite Implementation
- **4 comprehensive test files** covering the entire user journey
- **5 Page Object classes** for clean separation of concerns
- **Data-driven approach** with JSON file storage and dynamic credential generation

#### ✅ Page Objects
- `loginPage.js` - Complete login functionality with modal handling
- `logoutPage.js` - Simple and effective logout implementation
- `productPage.js` - Full e-commerce workflow (browse, cart, checkout)
- `registerPage.js` - User registration with unique credential generation
- `categoriesPage.js` - Category navigation (Monitors, Phones, Laptops)

#### ✅ Test Coverage
- `register-test.js` - Automated user registration with dynamic data & assertion
- `login-test.js` - Authentication testing with verification
- `order-test.js` - End-to-end product ordering (Apple monitor 24)
- `logout-test.js` - Session termination testing

#### ✅ Utility Functions
- `dataHelper.js` - Centralized data management with error handling
  - `generateUserData()` - Creates unique credentials with validation
  - `readUserData()` - Retrieves stored credentials with clear error messages

#### ✅ Test Configuration
- Playwright config optimized for Chromium browser
- HTML reporting enabled
- Screenshot and video capture on failures
- Trace recording on first retry
- CI/CD ready configuration

## 🤝 Contributing

1. **Create a new branch** for your feature
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Follow the existing code structure**
   - Use Page Object Model pattern
   - Keep page objects in `pages/` directory
   - Keep tests in `tests/` directory with `-test.js` suffix
   - Use utility functions in `utils/` directory

3. **Add tests for new functionality**
   - Write clear test names describing the scenario
   - Include proper assertions
   - Follow the existing naming convention

4. **Ensure all tests pass before submitting**
   ```bash
   npx playwright test
   ```

5. **Update documentation as needed**
   - Update README if adding new features
   - Document any new Page Objects or utilities

## 📝 Notes

- The framework is configured for **Chromium browser** by default (can be extended to Firefox and Safari)
- Test data is **generated dynamically** and stored in `userData.json`
- All tests run against the **live Demoblaze website** (https://www.demoblaze.com/)
- Tests include **necessary wait times** for UI interactions and dialogs
- Each test is **independent** and can run in any order
- The framework follows **Page Object Model** design pattern for maintainability
- Test files must end with **`-test.js`** to be picked up by Playwright
- Generated usernames follow the pattern **`user_xxxxxx`** (6 random chars)

## 🎯 Future Enhancements

Potential improvements for the framework:

- [ ] Add tests for multiple browsers (Firefox, Safari, Mobile)
- [ ] Implement negative test scenarios (invalid login, empty cart checkout)
- [ ] Add tests for different product categories
- [ ] Implement data-driven testing with multiple test data sets
- [ ] Add API tests for backend validation
- [ ] Integrate with CI/CD pipeline (GitHub Actions, Jenkins)
- [ ] Add visual regression testing
- [ ] Implement parallel test execution across multiple workers
- [ ] Add performance testing metrics
- [ ] Create custom Playwright fixtures

## 📞 Support

For issues or questions:
1. Check the [Playwright Documentation](https://playwright.dev/)
2. Review test execution reports in `playwright-report/`
3. Use debug mode to troubleshoot failing tests: `npx playwright test --debug`
4. Inspect page elements using Codegen: `npx playwright codegen https://www.demoblaze.com/`
5. Review this README for troubleshooting common issues

## 📄 License

This project is for educational and testing purposes.

---

**Happy Testing! 🎭**

*Built with ❤️ using Playwright*
