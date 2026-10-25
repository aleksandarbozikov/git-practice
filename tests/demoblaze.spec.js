const {randomUUID} = require('node:crypto');
const {test, expect} = require('@playwright/test');
const {AccountPage} = require('../pages/accountPage');
const {CartPage} = require('../pages/cartPage');
const {HomePage} = require('../pages/homePage');
const {ProductPage} = require('../pages/productPage');

test('Verify homepage navigation is visible', async ({page}) => {
	const homePage = new HomePage(page);
	await homePage.goToHomePage();
	await homePage.verifyNavigationIsVisible();
});

test('Confirm user can filter the products by category', async ({page}) => {
	const homePage = new HomePage(page);
	await homePage.goToHomePage();

	await homePage.selectPhonesCategory();
	for (const product of [
		'Samsung galaxy s6',
		'Nokia lumia 1520',
		'Nexus 6',
		'Samsung galaxy s7',
		'Iphone 6 32gb',
		'Sony xperia z5',
		'HTC One M9'
	]) {
		await homePage.verifyProductIsVisible(product);
	}

	await homePage.selectLaptopsCategory();
	for (const product of [
		'Sony vaio i5',
		'Sony vaio i7',
		'MacBook air',
		'Dell i7 8gb',
		'2017 Dell 15.6 Inch',
		'MacBook Pro'
	]) {
		await homePage.verifyProductIsVisible(product);
	}

	await homePage.selectMonitorsCategory();
	await homePage.verifyProductIsVisible('Apple monitor 24');
	await homePage.verifyProductIsVisible('ASUS Full HD');
});

test('View a product details', async ({page}) => {
	const homePage = new HomePage(page);
	const productPage = new ProductPage(page);
	const expectedAppleMonitorPrice = 400;

	await homePage.goToHomePage();
	await homePage.selectMonitorsCategory();
	const product = await productPage.open('Apple monitor 24');

	expect(product.price).toBe(expectedAppleMonitorPrice);
});

test('Add a single product to the cart', async ({page}) => {
	const homePage = new HomePage(page);
	const productPage = new ProductPage(page);
	const cartPage = new CartPage(page);
	const expectedMacBookAirPrice = 700;

	await homePage.goToHomePage();
	await homePage.selectLaptopsCategory();
	const product = await productPage.open('MacBook air');

	expect(product.price).toBe(expectedMacBookAirPrice);
	await productPage.addToCart();
	await homePage.clickCartLink();
	await cartPage.verifyProductIsPresent('MacBook air', expectedMacBookAirPrice);
});

test('Sign up with a new user', async ({page}) => {
	const homePage = new HomePage(page);
	const accountPage = new AccountPage(page);
	const username = `testuser-${randomUUID()}`;
	const password = 'testpassword';

	await homePage.goToHomePage();
	await homePage.clickSignUpLink();
	await accountPage.signUp(username, password);
});

test('New user registration through first purchase', async ({page}) => {
	const homePage = new HomePage(page);
	const accountPage = new AccountPage(page);
	const productPage = new ProductPage(page);
	const cartPage = new CartPage(page);
	const username = `registrationuser-${randomUUID()}`;
	const password = 'registrationpassword';
	const expectedNokiaLumiaPrice = 820;
	const expectedMacBookAirPrice = 700;
	const expectedTotal = expectedNokiaLumiaPrice + expectedMacBookAirPrice;

	await homePage.goToHomePage();
	await homePage.clickSignUpLink();
	await accountPage.signUp(username, password);

	await homePage.clickLoginLink();
	await accountPage.logIn(username, password);

	await homePage.selectPhonesCategory();
	const nokiaLumia = await productPage.open('Nokia lumia 1520');
	expect(nokiaLumia.price).toBe(expectedNokiaLumiaPrice);
	await productPage.addToCart();

	await homePage.clickHomeLink();
	await homePage.selectLaptopsCategory();
	const macBookAir = await productPage.open('MacBook air');
	expect(macBookAir.price).toBe(expectedMacBookAirPrice);
	await productPage.addToCart();

	await homePage.clickCartLink();
	await cartPage.verifyProductIsPresent('Nokia lumia 1520', expectedNokiaLumiaPrice);
	await cartPage.verifyProductIsPresent('MacBook air', expectedMacBookAirPrice);
	await cartPage.verifyTotal(expectedTotal);
	await cartPage.placeOrder({
		name: 'Asuma',
		country: 'Alabama',
		city: 'Your Vegas',
		card: '324 3232 32323 323 321',
		month: 'March',
		year: '1998'
	}, expectedTotal);
});
