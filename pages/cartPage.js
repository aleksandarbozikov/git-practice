const {expect} = require('@playwright/test');

class CartPage {
	constructor(page) {
		this.page = page;
		this.total = page.locator('#totalp');
		this.placeOrderButton = page.getByRole('button', {name: 'Place Order'});
		this.purchaseButton = page.getByRole('button', {name: 'Purchase'});
	}

	async verifyProductIsPresent(productName, price) {
		const productRow = this.page.getByRole('row').filter({hasText: productName});
		await expect(productRow).toBeVisible();
		await expect(productRow.getByRole('cell', {name: String(price), exact: true})).toBeVisible();
	}

	async verifyTotal(expectedTotal) {
		await expect(this.total).toHaveText(String(expectedTotal));
	}

	async placeOrder(orderDetails, expectedTotal) {
		await this.placeOrderButton.click();
		await this.page.locator('#name').fill(orderDetails.name);
		await this.page.locator('#country').fill(orderDetails.country);
		await this.page.locator('#city').fill(orderDetails.city);
		await this.page.locator('#card').fill(orderDetails.card);
		await this.page.locator('#month').fill(orderDetails.month);
		await this.page.locator('#year').fill(orderDetails.year);
		await this.purchaseButton.click();

		const confirmation = this.page.getByText('Thank you for your purchase!', {exact: true});
		await expect(confirmation).toBeVisible();
		await expect(this.page.locator('.sweet-alert')).toContainText(`Amount: ${expectedTotal} USD`);
		await this.page.getByRole('button', {name: 'OK', exact: true}).click();
	}
}

module.exports = {CartPage};
