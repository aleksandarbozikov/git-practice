# Demoblaze Playwright test guide

**Updated:** October 27, 2026

## Table of contents

1. Purpose and prerequisites
2. Install and run the tests
3. Project structure and Page Object Model
4. Playwright fixtures: what they are and why we use them
5. Catalog data and category filtering
6. Product API data, cart prices, and totals
7. Test scenarios, step by step
8. Adding or changing a scenario
9. Today's mentor-feedback changes and test results

## 1. Purpose and prerequisites

This project uses Playwright Test to automate browser scenarios for the
Demoblaze sample store. The configured base URL is
`https://www.demoblaze.com/`, and the configured browser is Chromium in
headless mode.

The scenarios interact with the live website rather than a local mock. A
working network connection is therefore required, and external site or catalog
changes can affect results even when the test code has not changed. The
repository uses CommonJS JavaScript and keeps its dependency versions in
`package-lock.json`.

## 2. Install and run the tests

Open PowerShell in the repository root. Install the locked Node dependencies
and Playwright's Chromium browser:

```powershell
npm ci
npx playwright install chromium
```

Run all discovered tests:

```powershell
npx playwright test
```

Run only the Demoblaze spec:

```powershell
npx playwright test demoblaze
```

Run that spec with the browser visible:

```powershell
npx playwright test demoblaze --headed
```

The Playwright configuration uses the HTML reporter. Open the latest report
after a run with:

```powershell
npx playwright show-report
```

When diagnosing a failure, start with the failing test name, file, line, and
assertion in the terminal output. The HTML report provides the test result and
captured failure details; a live-site timeout can also indicate a network or
site availability issue.

## 3. Project structure and Page Object Model

The project separates scenario intent, reusable browser operations, and
expected catalog data:

| Location | Responsibility |
|---|---|
| `playwright.config.js` | Base URL, browser, headless setting, timeouts, test discovery, and HTML reporting. |
| `tests/demoblaze.spec.js` | Describes user scenarios and sequences page-object operations. |
| `tests/fixtures.js` | Provides test-scoped page objects and unique user credentials. |
| `pages/homePage.js` | Homepage navigation, category selection, and product-list checks. |
| `pages/productPage.js` | Opens a product, verifies its details, and adds it to the cart. |
| `pages/accountPage.js` | Sign-up and login interactions. |
| `pages/cartPage.js` | Cart rows, totals, and order submission/confirmation. |
| `pages/dialog.js` | Shared handling of browser dialogs. |
| `data/demoblazeCatalog.js` | Shared category, product, and navigation names. |

The Page Object Model (POM) keeps page-specific locators and actions in
classes rather than repeating them throughout test bodies. For example, a test
asks `homePage` to select a category or verify a product; `HomePage` owns how
the product link is located and how visibility is asserted. This keeps test
scenarios readable and lets a locator or interaction be updated in one place.

Tests should describe what the user is doing and the outcome being checked.
Reusable UI operations and assertions belong in the relevant page object.
Scenario-level control flow can remain in the spec when it describes the
coverage itself, such as iterating over each category in the isolation test.

## 4. Playwright fixtures: what they are and why we use them

A Playwright fixture is a value or setup routine that the test runner provides
to a test when requested. A test declares its needed fixtures as parameters:

```js
test('Example', async ({homePage, productPage}) => {
	// Use the ready-to-use page objects.
});
```

In `tests/fixtures.js`, `base.extend(...)` adds the project's fixtures to
Playwright's built-in fixtures. The page-object fixtures receive Playwright's
`page`, construct the matching page object with it, and provide that object to
the test through `use(...)`. Playwright manages the browser page and its
per-test context lifecycle; the page objects are consequently tied to the
correct isolated page for that test.

| Fixture | What it provides | Why it is useful |
|---|---|---|
| `homePage` | A `HomePage` constructed with the current test's `page`. | Avoids repeating `new HomePage(page)` and centralizes setup. |
| `productPage` | A `ProductPage` constructed with the current test's `page`. | Makes product actions available consistently in tests that need them. |
| `cartPage` | A `CartPage` constructed with the current test's `page`. | Keeps cart page construction out of scenario bodies. |
| `accountPage` | An `AccountPage` constructed with the current test's `page`. | Provides the sign-up and login page object only where requested. |
| `newUserCredentials` | A username and password using a new `randomUUID()` for each request. | Avoids duplicate account names across repeated or parallel test runs. |

Fixtures help by making test dependencies explicit in the test signature,
reducing repeated setup, and giving tests a consistent way to access
test-scoped resources. They are not a replacement for POM: fixtures supply
ready-to-use objects and test data; page objects remain responsible for
locators, browser actions, and UI assertions.

Only the fixtures requested by a test are set up. For example, the navigation
scenario asks for `homePage`, while the purchase scenario requests homepage,
account, product, cart, and credential fixtures.

## 5. Catalog data and category filtering

`data/demoblazeCatalog.js` is the single source for the category names,
category-to-product membership, product names, and navigation link labels used
by the tests. Keeping the expected names in one module avoids scattering
catalog strings across assertions and makes catalog updates easier to review.

The separate Phones, Laptops, and Monitors tests select their category and
ask `HomePage.verifyCategoryProductsAreVisible` to check the corresponding
list. The page object owns the iteration and product-link visibility
assertions.

The category-isolation test also checks that products from the other
categories are hidden. The loops that inspect products remain inside
`HomePage.verifyProductsFromOtherCategoriesAreHidden`; the spec keeps only
the outer iteration over categories because that is the scenario's coverage
definition. This addresses the POM goal without hiding which categories the
test exercises.

`HomePage.selectCategory` starts waiting for a successful `POST` response to
the `/bycat` endpoint before clicking the category link. It waits for the
response before returning, so the subsequent visibility checks happen after
the category request completes instead of depending on an arbitrary fixed
sleep.

When the catalog changes, update the matching product constants and category
arrays in `data/demoblazeCatalog.js`. The category tests use those arrays, so
the visibility and isolation expectations stay aligned.

## 6. Product API data, cart prices, and totals

`ProductPage.open` starts waiting for the successful product `POST` response
to `/view`, then opens the selected product. It reads the response data and
checks the displayed title, price, and description against that data. The
method returns the product object to the test.

Cart scenarios use the returned price instead of embedding a fixed catalog
price in the test. The purchase scenario adds the two returned prices to
calculate the expected cart total, then verifies each cart row, the total,
and the purchase confirmation amount. This avoids brittle price expectations
if the live catalog prices change while still checking that the UI agrees
with the product data returned by the site.

The product-details scenario also checks the details in `ProductPage.open`;
it does not need a second hard-coded price assertion in the spec because the
page object already compares the displayed price with the API response.

## 7. Test scenarios, step by step

The Demoblaze spec currently contains nine scenarios:

| # | Scenario | Steps and expected result |
|---|---|---|
| 1 | Homepage navigation | Open the homepage and verify all shared navigation links are visible. |
| 2 | Phones category | Open the homepage, select Phones, and verify every phone in the catalog data is visible. |
| 3 | Laptops category | Open the homepage, select Laptops, and verify every laptop in the catalog data is visible. |
| 4 | Monitors category | Open the homepage, select Monitors, and verify every monitor in the catalog data is visible. |
| 5 | Category isolation | Select each category in turn; verify its products are visible and products from the other categories are hidden. |
| 6 | Product details | Select Monitors, open Apple monitor 24, and check its displayed title, price, and description against the product API response. |
| 7 | Single-item cart | Select Laptops, open MacBook air, add it to the cart, and verify its cart row and API-derived price. |
| 8 | Sign-up | Generate unique credentials, open Sign up, and submit registration. The successful registration is confirmed by the dialog helper. |
| 9 | First purchase | Register and log in; add Nokia lumia 1520 and MacBook air; verify each API-derived price and their sum; place the order and verify confirmation and amount. |

These are the scenarios covered by `tests/demoblaze.spec.js`; setup, shared
data, response waits, and reusable UI checks are described in the sections
above rather than repeated for every scenario.

## 8. Adding or changing a scenario

1. **Update expected catalog values:** change `data/demoblazeCatalog.js` if
   product names, category membership, or navigation expectations change.
2. **Add reusable page behavior:** put locators, browser actions, and UI
   assertions in the appropriate class under `pages/`. Avoid implementing the
   same page interaction separately in multiple test bodies.
3. **Add setup only when needed:** if a new reusable test dependency is needed,
   provide it from `tests/fixtures.js`. Request it in the test signature.
4. **Write a focused scenario:** use fixtures and page-object methods to
   express the user flow. Keep test-level loops only when they define the
   scenario's coverage, not to locate and assert individual page elements.
5. **Use live response values where appropriate:** for product prices and
   derived totals, use the data returned by the product API rather than a
   fixed literal.
6. **Validate in stages:** run `npx playwright test demoblaze` for the
   focused spec, then `npx playwright test` for the full suite.
7. **Investigate failures:** use the test output and HTML report to identify
   the exact spec line and assertion. Consider live-site availability and
   catalog/UI changes when the failure is an external dependency.

## 9. Today's mentor-feedback changes and test results

On October 27, 2026, the mentor comments were applied to the Demoblaze
scenarios and POM:

- Page objects are now supplied by Playwright fixtures rather than manually
  constructed in each scenario.
- A `newUserCredentials` fixture provides unique credentials to signup tests.
- Navigation labels, category names, and product names are centralized in
  the catalog data module.
- Category product visibility has a separate scenario for each category, and
  an additional isolation scenario checks products are hidden outside their
  category.
- Product and cart price expectations use the product API response instead of
  hard-coded catalog prices.
- Product-level loops and assertions are in `HomePage` methods. The isolation
  spec retains only the outer category loop that declares which categories
  are covered.
- The guide now explains the fixtures, their purpose, and how they relate to
  the POM.

The latest focused Demoblaze run passed **9 of 9 tests**. The latest full
Playwright run passed those 9 Demoblaze tests but had **1 failure** in the
unrelated `tests/ClientAppOtherWay.spec.js` test. At line 27, that test
expected the text `THANK YOU FOR THE ORDER.`, but Playwright did not find the
text before the assertion timed out. That failure is outside the Demoblaze
spec and was not changed as part of this documentation and POM work.
