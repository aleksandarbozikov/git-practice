const {expect} = require('@playwright/test');

class HomePage {
	constructor(page) {
		this.page = page;
		this.phonesCategoryLink = page.getByRole('link', {name: 'Phones', exact: true});
		this.laptopsCategoryLink = page.getByRole('link', {name: 'Laptops', exact: true});
		this.monitorsCategoryLink = page.getByRole('link', {name: 'Monitors', exact: true});
	}

	async goToHomePage() {
		await this.page.goto('/');
		await expect(this.page.getByRole('link', {name: 'Home'})).toBeVisible();
	}

	async verifyNavigationIsVisible() {
		for (const name of ['Home', 'Contact', 'About us', 'Cart', 'Log in', 'Sign up']) {
			await expect(this.page.getByRole('link', {name})).toBeVisible();
		}
	}

	async selectPhonesCategory() {
		await this.phonesCategoryLink.click();
	}

	async selectLaptopsCategory() {
		await this.laptopsCategoryLink.click();
	}

	async selectMonitorsCategory() {
		await this.monitorsCategoryLink.click();
	}

	async verifyProductIsVisible(productName) {
		await expect(this.page.getByRole('link', {name: productName, exact: true})).toBeVisible();
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
