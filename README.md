# Basic Firebase + Cypress Example

This repo contains a simple React appliction connected to Firebase. It uses Firebase Auth plus Firestore for data storage. It includes tests for auth, storing data, and logging out.

## Getting started

### 1. Clone the repo, install

```
git clone git@github.com:mihalik/cypress-firebase-example.git
npm install
```

### 2. Run the server

`npm run dev`

This will run a static webserver on port 5000 which will host the index.html and index.js files. You can verify by opening your browser and navigating to http://localhost:5000.

### 3. Run Cypress

`npm run cypress`

This will run Cypress and load the tests.

## Notes

The current implementation uses a [login command](./cypress/support/commands.js) to login before each test using `beforeEach`. Ideally this would bypass automating the login form to improve test speed.

Due to some issues with long-polling (used by Firebase) and using a single-page application with Cypress ([#761](https://github.com/cypress-io/cypress/issues/761)), these tests use a blank.html page after each test to clear out any lingering XHR requests.
