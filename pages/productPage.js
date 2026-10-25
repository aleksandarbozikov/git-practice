const {expect} = require('@playwright/test');
const {clickAndAcceptDialog} = require('./dialog');

class ProductPage {
	constructor(page) {
		this.page = page;
		this.name = page.locator('#tbodyid h2.name');
		this.price = page.locator('#tbodyid h3.price-container');
		this.description = page.locator('#more-information p');
		this.addToCartLink = page.getByRole('link', {name: 'Add to cart', exact: true});
	}

	async open(productName) {
		const productResponsePromise = this.page.waitForResponse(response =>
			response.url().endsWith('/view') &&
			response.request().method() === 'POST' &&
			response.ok()
		);

		await this.page.getByRole('link', {name: productName, exact: true}).click();
		const productResponse = await productResponsePromise;
		const product = await productResponse.json();

		await expect(this.name).toHaveText(product.title);
		await expect(this.price).toContainText(`$${product.price}`);
		await expect(this.description).toHaveText(product.desc);

		return product;
	}

	async addToCart() {
		await clickAndAcceptDialog(this.page, this.addToCartLink, ['Product added', 'Product added.']);
	}
}

module.exports = {ProductPage};
