# GitHub readiness audit

Checked on 2026-09-08 for the `angular-car-catalog` repository.

## Verification

- `npm ci`: passed with the final lockfile; npm reported zero known vulnerabilities. Compatible updates remain within the declared dependency ranges (Angular 20.3).
- `npm run build`: passed. The initial bundle is about 696 kB, above the 500 kB warning budget but below the 1 MB error limit.
- `npm test -- --watch=false --browsers=ChromeHeadless`: both existing application tests passed after correcting their providers and navigation assertion.
- `npm start`: the development server compiled and served the application with HTTP 200.
- JSON Server 0.17.4 served the sample catalog and empty Users collection. Registration/read requests were checked against a disposable database and the temporary account was removed.
- Complete interactive user journeys were not tested: no browser was connected to the browser tool. The headless unit tests cover the application shell only.

## Publication checks

- Reviewed the tracked and non-ignored candidate files for credentials, private database values, personal contact data, and absolute home-directory paths. No publishable credentials or personal database records were identified.
- `db.example.json` contains 26 sample cars and no user accounts. The original `db.json` stays local and ignored.
- Build output, dependencies, caches, diagnostic logs, file inventories, and submission ZIPs are ignored. Source code, configuration, and package-lock.json are included.
- Local PNG metadata was inspected; it contains image-editor metadata, not personal contact information or machine paths.
- The README describes the implemented features, verified local commands, academic context, and remaining limitations. The displayed contact email now uses example data.
- The new publication history uses a GitHub noreply commit address. The old starter history is retained locally and is not intended for publication.

## Remaining limitations

Authentication is an insecure local demonstration: it compares plaintext passwords in the browser and stores the account in localStorage. Use fictional accounts and keep the API local. The add-product route has no authorization guard. The unfinished Gammes page, mobile-menu collapse, and validation-message inconsistencies remain documented; this audit did not redesign the application.

The npm audit result covers the project's locked dependencies, not the separately downloaded JSON Server tool or a guarantee against future advisories. Third-party images and BMW branding do not come with a redistribution license from this project.
