# BoutiqueBMW project review

This records the initial review before GitHub preparation. Since then, the missing CommonModule registration has been fixed, the README has been replaced with project-specific setup instructions, a sanitized `db.example.json` has been added, and local data/logs/archives have been excluded through `.gitignore`. Findings below describe the original state unless noted here.

The final audit also corrected the two starter tests, set the page language to French, replaced the contact email with example data, and refreshed compatible locked dependencies. See [GITHUB_AUDIT.md](GITHUB_AUDIT.md) for current verification results.

## What it does

A French-language university demo for a BMW car catalog in Tunisia. Visitors can browse new and used cars, filter by engine category, and see prices and availability. Users can register, log in, log out, and submit a car through a form. The home page includes a video, map, and contact section. There is no cart, checkout, payment, or order management.

## Technologies and structure

- Angular 20.3, TypeScript 5.9, standalone components, Router, reactive forms, and HttpClient.
- RxJS observables for HTTP requests and a BehaviorSubject for the current user.
- Bootstrap 5.3 CSS, Bootstrap Icons, and component CSS.
- `db.json`: 26 products and 16 user records. Services expect a separate JSON-style REST API at port 3000. JSON Server appears to be the intended backend, but it is not declared in package.json and no API startup script is supplied.
- Angular SSR and Express files/dependencies exist, but angular.json currently configures a browser build only.
- Jasmine/Karma test setup, with a leftover starter test.

Main flow: route -> component -> service -> local API. Product components keep a local list and filter it without another HTTP request. The header subscribes to login state; localStorage restores that state after a reload.

## Bugs and weaknesses

| Priority | Location | Finding |
| --- | --- | --- |
| High | `components/produits/produits.ts` and `.html` | The template uses `[ngClass]`, but the standalone component has `imports: []`. Importing CommonModule at the top of the file does not register it in the component. This causes NG8002. |
| High | `services/user.service.ts` | Login downloads all users and compares plaintext passwords in the browser. It stores the entire matching account, including the password, in localStorage. This is demo login, not secure authentication. |
| High | `app.routes.ts`, `header.html` | Hiding the add-product link does not protect `/ajouter-produit`. Anyone can navigate there. No backend authorization implementation is supplied; a route guard alone would not secure API writes. |
| Medium | `db.json`, `models/users.ts` | Some records use `Nom`/`Prenom`, others `nom`/`prenom`. Existing accounts can show a missing first name in the greeting. `profile` and `valide` are not checked during login. |
| Medium | `services/user.service.ts` | JSON.parse has no recovery for malformed saved data, which can break application startup. Registration has no duplicate-email check in the supplied code. |
| Medium | Login/registration templates | Email messages check `pattern`, but the validator produces `email`. Registration messages promise 5-character names and 8-character passwords while validators require 2 and 6. Pattern messages have no corresponding validators. |
| Medium | `components/header/header.html` | Mobile navigation uses Bootstrap collapse attributes, but only Bootstrap CSS is loaded; no JavaScript or Angular toggle implements the collapse. |
| Medium | `models/produits.ts`, `db.json` | Product IDs are typed as numbers but the data uses strings. addProduct requires an ID through its type even though the form supplies none; the untyped FormGroup hides this mismatch. |
| Medium | Catalog components | Errors are only logged. Loading, API failure, and a genuinely empty catalog all look like no cars are available. The add form offers Essence, but the catalog has no Essence filter button. |
| Low | Catalog components | Nearly identical loading/filter code is duplicated. Initial filtering of an empty array is redundant. Deferred manual detectChanges calls add complexity worth revisiting after fixing compilation. |
| Low | Add-product form | No integer check for stock, no image URL validation, and no pending-request lock against repeated submissions. An occasion submission redirects to the new-car catalog, where it will not appear. |
| Low | `app.routes.ts`, home page, `index.html` | No wildcard route for unknown URLs; social links are placeholders; the document declares English although the UI is French. |
| Low | `app.spec.ts` | The test still expects `Hello, BoutiqueBMW`, which is absent from the current template. Router/HTTP dependencies used by the header also need test providers. |

## Unused or unfinished files/code

- `files.txt` and `src/all_ts_files.txt` are empty. `files_list.txt` is a generated local file listing.
- `build_error.log`, `build_error_2.log`, `build_log.txt`, `build_log_full.txt`, and `build_output.txt` are diagnostic leftovers, not app inputs.
- The root submission ZIP contains a source snapshot; it is not used by the app. Its filename identifies the student and class. Only its entry list was inspected, not every archived file.
- `src/server.ts`, `src/main.server.ts`, `app.config.server.ts`, and `app.routes.server.ts` are inactive in the current build configuration. The SSR serve script expects a server bundle that this build does not generate. They may be kept if SSR is planned.
- `gammes` is routed but unfinished (`gammes works!`); its CSS is empty. It is not a dead component.
- `public/favicon.ico` is not referenced by index.html, which uses `assets/logo.png`. Browsers can still request the default favicon path.
- `App.title` and `UserService.getCurrentUser()` have no application callers. `nprix` and `autonomie` are modeled/stored but not displayed.
- Several CommonModule imports are unused. In Produits, however, a template directive actually needs to be registered.
- `app.css` repeats global body styling; component-scoped styles do not target the outer body. `ajouter-produit.css` has an unused `.error-message` rule.
- Both local PNG assets are referenced. No active feature files were deleted.

## Hardcoded values and GitHub publication

1. **Do not publish the current db.json as-is.** It contains names, emails, and 16 plaintext passwords. Whether these are real or demo accounts is unknown. Publish a sanitized example with invented data instead; keep the working database private. If any exposed passwords are real or reused, change them.
2. API URLs are fixed to `http://localhost:3000/Users` and `/produits` in the two services. On a deployed site, localhost refers to the visitor's machine. No hardcoded private filesystem path was found in active application source.
3. File listings and build logs include local machine paths. Omit these from GitHub. The submission ZIP also needs review before publication because it duplicates source and identifies the student/class.
4. `.gitignore` already excludes node_modules, dist, Angular cache, and coverage. It does not exclude the working database, submission ZIP, listed build logs/file inventories, or future `.env` files. Those files were untracked at review time; avoid a blanket `git add .` before cleanup. Adding ignore rules does not remove files already committed.
5. Contact details, third-party car image URLs, YouTube and Maps embeds, and the logo/favicon path are hardcoded. Confirm the contact text is intended for the public demo and verify permission to redistribute the branding/images. External images and embeds require network access and may become unavailable.
6. No separate API key, access token, or private key was identified in the inspected source/configuration. This was a working-tree review, not an audit of Git history, installed dependencies, or all archive contents.

## Changes made

Added short French comments around local API access, shared login state, browser-only storage/DOM access, catalog filtering, registration field mapping, form submission, subscription cleanup, and the unguarded route. No executable code, dependencies, data, or configuration was changed. Existing uncommitted work was preserved.

## Validation

- Compared TypeScript scanner tokens before and after commenting: identical, ignoring whitespace and comments.
- `npm run build` failed with the existing NG8002 error for ngClass. The restricted environment also produced parent-directory access and resource-resolution errors; those are separate from the template error.
- A direct Angular compiler check (`node node_modules/@angular/compiler-cli/bundles/src/bin/ngc.js -p tsconfig.app.json --noEmit`) independently confirmed NG8002 without the build's filesystem errors.
- No browser or API interaction was tested, and the stale unit tests were not run. A successful build is not claimed.

Suggested next steps are small: register the missing directive, align form messages and data field names, repair the mobile menu, document the local API setup, and sanitize publication files. Keep authentication explicitly a local demo until a backend handles passwords and permissions.
