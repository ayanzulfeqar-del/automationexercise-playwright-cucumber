Feature: User account - register, login and logout

  Background:
    Given the user is on the home page

  @smoke
  Scenario: Register a new user and delete the account
    When the user clicks on Signup / Login
    Then the login page is visible
    When the user starts signup with name "Ayan" and a new email
    Then the account information form is visible
    When the user fills account details and address
    And the user clicks Create Account
    Then "Account Created!" message is shown
    When the user clicks Continue
    Then the user is logged in as "Ayan"
    When the user deletes the account
    Then "Account Deleted!" message is shown

  @smoke
  Scenario: Login with correct email and password
    Given a registered user exists
    When the user clicks on Signup / Login
    And the user logs in with the registered email and password
    Then the user is logged in as "Ayan"

  Scenario: Login with wrong email and password
    When the user clicks on Signup / Login
    And the user logs in with email "wrong_user@test.com" and password "wrong123"
    Then the login error "Your email or password is incorrect!" is shown

  Scenario: Logout user
    Given a registered user exists
    When the user clicks on Signup / Login
    And the user logs in with the registered email and password
    And the user clicks Logout
    Then the login page is visible

  Scenario: Register with an email that already exists
    Given a registered user exists
    When the user clicks on Signup / Login
    And the user starts signup with name "Ayan" and the registered email
    Then the signup error "Email Address already exist!" is shown
