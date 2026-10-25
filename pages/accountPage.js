const {expect} = require('@playwright/test');
const {clickAndAcceptDialog} = require('./dialog');

class AccountPage {
	constructor(page) {
		this.page = page;
		this.signUpUsername = page.locator('#sign-username');
		this.signUpPassword = page.locator('#sign-password');
		this.loginUsername = page.locator('#loginusername');
		this.loginPassword = page.locator('#loginpassword');
	}

	async signUp(username, password) {
		await this.signUpUsername.fill(username);
		await this.signUpPassword.fill(password);
		await clickAndAcceptDialog(
			this.page,
			this.page.getByRole('button', {name: 'Sign up', exact: true}),
			'Sign up successful.'
		);
	}

	async logIn(username, password) {
		await this.loginUsername.fill(username);
		await this.loginPassword.fill(password);
		await this.page.getByRole('button', {name: 'Log in', exact: true}).click();
		await expect(this.page.getByRole('link', {name: `Welcome ${username}`, exact: true})).toBeVisible();
	}
}

module.exports = {AccountPage};
