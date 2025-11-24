Feature: New Customer management

    Background:
        Given I navigate to the login page
        When I login with valid credentials
        And I am on the New Customer page

    Scenario: New Customer page is accessible from the menu
        Then I should see the New Customer form

    Scenario: Required fields validation
        When I submit the New Customer form without filling any field
        Then I should see an alert message

    Scenario: PIN must be numeric
        When I fill the New Customer form with an invalid PIN "xyz123"
        Then I should see a PIN validation error

    Scenario: Email must be valid
        When I fill the New Customer form with an invalid email "emailinvalido.com"
        Then I should see an email validation error

    Scenario: Create a new customer successfully
        When I fill the New Customer form with valid data
        And I submit the New Customer form
        Then I should see the new customer confirmation page
