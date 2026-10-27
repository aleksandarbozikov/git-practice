const {expect} = require('@playwright/test');
const {CATEGORY_PRODUCTS, CATEGORIES, NAVIGATION_LINKS} = require('../data/demoblazeCatalog');

class HomePage {
	constructor(page) {
		this.page = page;
	}

	async goToHomePage() {
		await this.page.goto('/');
		await expect(this.page.getByRole('link', {name: 'Home'})).toBeVisible();
	}

	async verifyNavigationIsVisible() {
		for (const name of NAVIGATION_LINKS) {
			await expect(this.page.getByRole('link', {name})).toBeVisible();
		}
	}

	async selectCategory(categoryName) {
		const categoryResponse = this.page.waitForResponse(response =>
			response.url().endsWith('/bycat') &&
			response.request().method() === 'POST' &&
			response.ok()
		);
		await this.page.getByRole('link', {name: categoryName, exact: true}).click();
		await categoryResponse;
	}

	async selectPhonesCategory() {
		await this.selectCategory(CATEGORIES.PHONES);
	}

	async selectLaptopsCategory() {
		await this.selectCategory(CATEGORIES.LAPTOPS);
	}

	async selectMonitorsCategory() {
		await this.selectCategory(CATEGORIES.MONITORS);
	}

	async verifyProductIsVisible(productName) {
		await expect(this.page.getByRole('link', {name: productName, exact: true})).toBeVisible();
	}

	async verifyProductIsNotVisible(productName) {
		await expect(this.page.getByRole('link', {name: productName, exact: true})).toBeHidden();
	}

	async verifyCategoryProductsAreVisible(categoryName) {
		const products = CATEGORY_PRODUCTS[categoryName];
		if (!products) {
			throw new Error(`Unknown product category: ${categoryName}`);
		}

		for (const product of products) {
			await this.verifyProductIsVisible(product);
		}
	}

	async verifyProductsFromOtherCategoriesAreHidden(categoryName) {
		if (!CATEGORY_PRODUCTS[categoryName]) {
			throw new Error(`Unknown product category: ${categoryName}`);
		}

		for (const [otherCategory, products] of Object.entries(CATEGORY_PRODUCTS)) {
			if (otherCategory === categoryName) {
				continue;
			}

			for (const product of products) {
				await this.verifyProductIsNotVisible(product);
			}
		}
	}

	async clickHomeLink() {
		await this.page.getByRole('link', {name: 'Home'}).click();
	}

	async clickCartLink() {
		await this.page.getByRole('link', {name: 'Cart', exact: true}).click();
	}

	async clickLoginLink() {
		await this.page.getByRole('link', {name: 'Log in'}).click();
	}

	async clickSignUpLink() {
		await this.page.getByRole('link', {name: 'Sign up'}).click();
	}
}

module.exports = {HomePage};
