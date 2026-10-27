const {randomUUID} = require('node:crypto');
const {test: base, expect} = require('@playwright/test');
const {AccountPage} = require('../pages/accountPage');
const {CartPage} = require('../pages/cartPage');
const {HomePage} = require('../pages/homePage');
const {ProductPage} = require('../pages/productPage');

const test = base.extend({
	homePage: async ({page}, use) => {
		await use(new HomePage(page));
	},
	productPage: async ({page}, use) => {
		await use(new ProductPage(page));
	},
	cartPage: async ({page}, use) => {
		await use(new CartPage(page));
	},
	accountPage: async ({page}, use) => {
		await use(new AccountPage(page));
	},
	newUserCredentials: async ({}, use) => {
		const id = randomUUID();
		await use({
			username: `testuser-${id}`,
			password: `testpassword-${id}`
		});
	}
});

module.exports = {expect, test};
