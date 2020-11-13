# SuitePortal

This repository is intended to be a starter project for your assignment.

Please review `./Requirements.md` for more detailed instructions about this assignment.

* The API server is built using the [NESTJS](https://nestjs.com/) framework
* The Web App is built using the [Angular](https://angular.io/) framework

You can build the project using the [Nx](https://nx.dev/) command line tools

🔎 **Nx is a set of Extensible Dev Tools for Monorepos.**

Using:

* Node.js v14.15.0
* npm v6.14.8
* Angular v10
* NESTJS v7

### File Structure

* Web App: `apps/suite-portal`
* API Server: `apps/api`
* Shared Library: `libs/api-interfaces` (NOTE: This library can be imported in all the apps by importing from `@suiteportal/api-interfaces`)

## Setup Development Environment

1. Change directory to the root of the monorepo
2. `npm install` to install the dependencies
3. Start the API server `npx nx serve api`
4. Open new terminal
5. Start the Web App dev server `npx nx serve suite-portal`
6. Go to http://localhost:4200/

## Development server

Run `npx nx serve suite-portal` for the web app dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

Run `npx nx serve api` for the API dev server. The service is listening on http://localhost:3333/api

## Code scaffolding

Run `npx nx g @nrwl/react:component my-component --project=suite-portal` to generate a new component.

## Build

Run `npx nx build suite-portal` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npx nx test suite-portal` to execute the unit tests for the web app via [Jest](https://jestjs.io).

Run `npx nx test api` to execute the unit tests for the API via [Jest](https://jestjs.io).

Run `npx nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e suite-portal` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `npx nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `npx nx dep-graph` to see a diagram of the dependencies of your projects.

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

There are also many [community plugins](https://nx.dev/nx-community) you could add.

## Generate an application

Run `npx nx g @nrwl/react:app suite-portal` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `npx nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are sharable across libraries and applications. They can be imported from `@suite-portal/mylib`.


## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

