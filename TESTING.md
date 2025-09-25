# Software Testing Documentation for FashionAdda

This document outlines the testing strategy, principles, and test cases for the FashionAdda e-commerce platform.

## 1. TESTING MECHANISM

Systems testing is an expensive but critical process that can take as much as 50 percent of the budget for program development. The common view of testing held by users is that it is performed to prove that there are no errors in the program. Testing is the process of executing a program with the explicit intention of finding errors that is, making the program fail. A successful test, then, is one that finds an error.

- Test the modules thoroughly- cover all the access paths.
- Generate enough data to cover all the access paths arising from conditions.
- Test the modules by passing wrong data.
- To test the different access paths, look at the conditional statement. Enter some data in the test file, which would satisfy the condition and again test the script.
- Repeat this process many times.
- After each test, analyze the log file to ensure proper, understandable and useful messages are present in the log file.
- Test for locking by invoking multiple concurrent processes.

### 1.1. TESTING OBJECTIVES

- Testing is a process of executing a program with the intent of finding an error.
- A good test case is one that has a high probability of finding an as-yet-undiscovered error.
- A successful test is one that uncovers an as-yet-undiscovered error.

### 1.2. TESTING PRINCIPLES

- All tests should be traceable to customer requirements.
- Tests should be planned long before testing begins.
- The testing should begin “in the small” and progress towards testing “in the large”.
- Exhaustive testing is not possible.
- To be most efficient, testing should be conducted by an independent third party.

### 1.3. CHARACTERISTICS OF A GOOD TEST

- A good test has a high probability of finding an error.
- A good test is not redundant.
- A good test should be the best of its breed.
- A good test should be neither too simple nor too complicated.

## 2. TESTING STRATEGIES

### 2.1. Code Testing (White Box Testing)

The code-testing strategy examines the logic of the program. In this kind of testing, the analyst develops test cases that result in executing every instruction in the program or module; that is, every path through the program is tested. A path is a specific combination of conditions that is handled by the program.

This technique is aimed at exercising all programming statements with minimal tests.
- Guarantee that all the independent paths within the module have been exercised at least once.
- Exercise all logical decisions on their true and false sides.
- Execute all loops and decisions on their true and false sides.
- Exercise all data structures to assure their validity.

### 2.2. Specification Testing (Black Box Testing)

To perform specification testing, the analyst examines the specifications stating what the program should do and how it should perform under various conditions. Then test cases are developed for each condition or combination of conditions and submitted for processing.

This strategy treats the program as if it were a black box; we do not look into the program to study the code. Black box testing enables the discovery of errors in the following categories:
- Incorrect and missing functions.
- Interface errors.
- Errors in the data structures or external database access.
- Performance errors.
- Initialization and termination errors.

## 3. TESTING PHASES

### 3.1. Validation Testing

Once the software is completely assembled as a package, a final series of software tests for the validity of the software is carried out. This is performed through a series of black box tests. Module interfaces (Graphical User Interfaces) are also tested for the proper working of windows, pull-down menus, mouse operations, and data entry.

### 3.2. System Testing

The primary purpose of this phase is to fully exercise the computer-based system, verifying that all system elements have been properly integrated and perform their allocated functions. This includes:
- **Recovery Testing:** Forcing the system to fail to ensure it is fault-tolerant and that recovery is properly performed.
- **Security Testing:** Ensuring that only designated users of the system can access the application.
- **Stress & Performance Testing:** Ensuring the system performs smoothly even at peak loads of data processing.

## 4. TEST CASES

The following test cases are designed for the FashionAdda application.

### Home Module

| Test Case Id | Test Scenario | Test Steps | Test Date | Expected Result | Actual Result | Pass/fail |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **FA-TU01** | User visits the website | 1. Enter the frontend URL in the browser. | 2025-09-24 | The website homepage loads completely with all UI elements. | As Expected | Pass |

### Registration Module

| Test Case Id | Test Scenario | Test Steps | Test Date | Expected Result | Actual Result | Pass/fail |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **FA-TU02** | New user registration with valid data | 1. Go to the Login/Sign Up page. <br> 2. Fill in name, valid email, and password. <br> 3. Click 'Sign Up'. | 2025-09-24 | User is successfully registered and redirected to the login page or homepage. | As Expected | Pass |
| **FA-TU03** | New user registration with an existing email | 1. Go to the Login/Sign Up page. <br> 2. Fill in a name and an email that already exists in the database. <br> 3. Click 'Sign Up'. | 2025-09-24 | An error message "User already exists" is displayed. | As Expected | Pass |

### Login Module

| Test Case Id | Test Scenario | Test Steps | Test Date | Expected Result | Actual Result | Pass/fail |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **FA-TU04** | Check login with valid data | 1. Go to the Login/Sign Up page. <br> 2. Enter a valid email and password. <br> 3. Click 'Login'. | 2025-09-24 | User should be authenticated and redirected to the homepage. | As Expected | Pass |
| **FA-TU05** | Check login with invalid data | 1. Go to the Login/Sign Up page. <br> 2. Enter an invalid email or password. <br> 3. Click 'Login'. | 2025-09-24 | An error message "Invalid credentials" should be displayed. | As Expected | Pass |

### Product Module

| Test Case Id | Test Scenario | Test Steps | Test Date | Expected Result | Actual Result | Pass/fail |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **FA-TU06** | View product details | 1. Navigate to a product collection page. <br> 2. Click on a product item. | 2025-09-24 | The product detail page is displayed with the correct product information, images, and price. | As Expected | Pass |

### Cart Module

| Test Case Id | Test Scenario | Test Steps | Test Date | Expected Result | Actual Result | Pass/fail |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **FA-TU07** | Add a product to the cart | 1. Go to a product detail page. <br> 2. Click the 'Add to Cart' button. | 2025-09-24 | The product is added to the cart, and the cart icon shows the updated item count. | As Expected | Pass |
| **FA-TU08** | Remove a product from the cart | 1. Go to the Cart page. <br> 2. Click the remove icon for a cart item. | 2025-09-24 | The item is removed from the cart, and the cart total is updated. | As Expected | Pass |

### Order Module

| Test Case Id | Test Scenario | Test Steps | Test Date | Expected Result | Actual Result | Pass/fail |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **FA-TU09** | Place an order | 1. Go to the Cart page. <br> 2. Click 'Proceed to Checkout'. <br> 3. Fill in shipping details. <br> 4. Click 'Place Order'. | 2025-09-24 | The order is successfully placed, and the user is redirected to a confirmation or payment page. | As Expected | Pass |

### Feedback Module

| Test Case Id | Test Scenario | Test Steps | Test Date | Expected Result | Actual Result | Pass/fail |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **FA-TU10** | User gives feedback | 1. Navigate to the Contact/Feedback page. <br> 2. Fill in the feedback form. <br> 3. Click 'Send'. | 2025-09-24 | The feedback is successfully submitted, and a confirmation message is shown. | As Expected | Pass |

### Admin Module

| Test Case Id | Test Scenario | Test Steps | Test Date | Expected Result | Actual Result | Pass/fail |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **FA-TU11** | Admin Login | 1. Go to the admin panel URL. <br> 2. Enter admin credentials. <br> 3. Click 'Login'. | 2025-09-24 | Admin is authenticated and redirected to the admin dashboard. | As Expected | Pass |
| **FA-TU12** | Admin adds a new product | 1. Log in as an admin. <br> 2. Navigate to the 'Add Product' page. <br> 3. Fill in all product details and upload an image. <br> 4. Click 'Add'. | 2025-09-24 | The new product is added to the database and appears in the 'List Product' view. | As Expected | Pass |

## 5. FUTURE SCOPE

"FashionAdda" is a modern web-based project for online clothes shopping. As technology advances, so will the features and capabilities of this platform.

Future enhancements and goals of the project include:
- **Increase Database Size:** Expand the product catalog to provide more options for users.
- **Add Time-Based Delivery:** Allow users to select specific delivery time slots.
- **Product Reviews and Ratings:** Implement a system for users to rate and review products.
- **Wishlist Feature:** Allow users to save items they are interested in for later.
- **Advanced Search & Filtering:** Add options to filter products by size, color, brand, and price range.
- **Personalized Recommendations:** Create a recommendation engine based on user browsing history and purchases.
- **Additional Payment Gateways:** Integrate more payment options to provide flexibility for customers.

## 6. BIBLIOGRAPHY

### Books:

1.  MCS-14 (System Analysis and Design)
2.  MCS-23 (Introduction to Database Management)
3.  MCSL-16 (Internet Concepts and Web Designing)
4.  BCS-51 (Introduction to Software Engineering)
5.  BCS-53 (Web Programming)
6.  BCS-62 (E-Commerce)

### Websites:

1.  [W3Schools](https://www.w3schools.com/)
2.  [MySQL Tutorial](https://dev.mysql.com/doc/refman/8.0/en/tutorial.html)
3.  [Node.js Documentation](https://nodejs.org/en/docs/)
4.  [Express.js Documentation](https://expressjs.com/)
5.  [React Documentation](https://react.dev/)
6.  [Vite Documentation](https://vitejs.dev/)
7.  [Jest Documentation](https://jestjs.io/)
8.  [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
