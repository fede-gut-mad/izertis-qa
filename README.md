# IZERTIS QA Technical Test — Playwright + TypeScript

## Description

QA technical test for IZERTIS QA Automation Engineer position, providing E2E UI automated tests

## Tech Stack

- Playwright with TypeScript, under BDD (Cucumber)
- Target CI/CD: Github Actions

## Installation

```bash
npm install --save-dev typescript
npm install --save-dev ts-node
npm install --save-dev @types/node
npm install --save-dev playwright
npm install --save-dev @playwright/test
npm install --save-dev @cucumber/cucumber
npm install --save-dev multiple-cucumber-html-reporter

npx playwright install
```

## Reporting

Setup a small cucumber HTML report

```bash
npm run report
```

## Usage

Run all tests in Chromium(default) and headless(default)

```bash
npm tests
```

Run all tests in Chrome headless

```bash
HEADLESS=false BROWSER=chrome npm test
```

Run all tests in Firefox headless

```bash
HEADLESS=false BROWSER=firefox npm test
```

Run all tests in an specific browser, headed or headlessly and generate a report:

```bash
HEADLESS=false BROWSER=firefox npm run test:report
```

## CI/CD GitHub Actions

This project includes a GitHub Actions CI/CD pipeline that automatically runs the full end-to-end test suite using Cucumber and Playwright. The workflow executes tests in parallel across two browsers—Chromium and Firefox—using a build matrix to ensure cross-browser reliability. It installs dependencies, sets up Playwright browsers, runs all scenarios, and generates an HTML report for each browser as a downloadable artifact. The pipeline is triggered on every push and pull request to the main branch, and it also runs nightly at 03:00 (Spain time) to ensure ongoing stability. Caching is disabled to guarantee clean, consistent test runs.
