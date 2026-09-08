# Angular Car Catalog

A French-language BMW catalog built as a university Angular project. It demonstrates component-based pages, routing, reactive forms, and HTTP requests to a local demo API. It is an academic exercise, not an official BMW website or a production shop.

## Implemented features

- Home page with contact information, an embedded video, and a map.
- Separate new-car and used-car catalogs with category filters, prices, and stock availability.
- Registration, demo login/logout, and a navigation menu that reflects login state.
- A reactive form for adding cars to the catalog.

## Technologies

Angular 20.3, TypeScript 5.9, RxJS, reactive forms, HttpClient, Bootstrap 5.3, and Bootstrap Icons. The setup below uses JSON Server as a local REST API backed by a JSON file. Angular SSR/Express scaffolding is present, but the current build is configured for the browser.

## Project structure

```text
src/app/
  components/      Pages and shared header
  models/          Product and user interfaces
  services/        HTTP requests and login state
  app.routes.ts    Application routes
src/assets/        Local images
src/styles.css     Global styles and Bootstrap imports
public/            Additional static assets
docs/              Project review and known issues
db.example.json    Sample catalog with an empty Users collection
angular.json       Angular build configuration
```

## Local setup

Use Node.js 22.12 or newer within the 22.x release line, and npm. Run these commands from the project root after cloning the repository.

1. Install the project dependencies:

   ```sh
   npm ci
   ```

2. Copy `db.example.json` to `db.json` once. In PowerShell:

   ```powershell
   Copy-Item db.example.json db.json
   ```

   On macOS/Linux, use `cp db.example.json db.json`. Do not overwrite an existing working database unless you intend to reset it. The example includes sample cars and no accounts; register a fictional account through the application.

3. Start the local API in a separate terminal:

   ```sh
   npx --yes json-server@0.17.4 --watch db.json --port 3000
   ```

   This downloads the specified [JSON Server version](https://github.com/typicode/json-server/tree/v0.17.4) on first use; it is not a package.json dependency. The application expects `http://localhost:3000/produits` and `http://localhost:3000/Users` (capital U). Registrations and added cars are saved in `db.json`, which Git ignores.

4. Start Angular in another terminal:

   ```sh
   npm start
   ```

   Open `http://localhost:4200/`. Keep both terminals running. External images, video, and map content require internet access.

To build the browser application, run `npm run build`; output is written under `dist/`.

To run the two basic application tests, use `npm test -- --watch=false --browsers=ChromeHeadless` with Chrome installed. These tests cover application creation and the navigation shell, not complete user journeys.

## Current limitations

Login compares plaintext passwords in the browser and saves the account in localStorage. Use fictional credentials only. The add-product route has no authorization guard, and this local API is not intended for public hosting.

The Gammes page is a placeholder, the mobile menu lacks its collapse behavior, and some validation messages need correction. There is no cart, checkout, or payment flow. See [the initial project review](docs/PROJECT_REVIEW.md) and [the final audit](docs/GITHUB_AUDIT.md) for details.

The working database, local logs, and submission archives are excluded from Git. BMW branding and third-party images remain the property of their respective owners; no redistribution license is supplied by this project.
