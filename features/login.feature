Feature: Login to Guru99 Bank

    Background:
        Given I navigate to the login page

    Scenario: Page title is visible
        Then the page title should be "Guru99 Bank"

    Scenario: Reset button clears fields
        When I fill the login form with user "user" and password "pass"
        And I click the reset button
        Then the login form fields should be empty

    Scenario: Successful login with valid credentials
        When I login with valid credentials
        Then I should see the manager home page
