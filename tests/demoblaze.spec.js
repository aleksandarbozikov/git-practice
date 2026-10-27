const {expect, test} = require('./fixtures');
const {CATEGORIES, CATEGORY_PRODUCTS, PRODUCTS} = require('../data/demoblazeCatalog');

test('Verify homepage navigation is visible', async ({homePage}) => {
	await homePage.goToHomePage();
	await homePage.verifyNavigationIsVisible();
});

test('Show all phones when the Phones category is selected', async ({homePage}) => {
	await homePage.goToHomePage();
	await homePage.selectPhonesCategory();
	await homePage.verifyCategoryProductsAreVisible(CATEGORIES.PHONES);
});

test('Show all laptops when the Laptops category is selected', async ({homePage}) => {
	await homePage.goToHomePage();
	await homePage.selectLaptopsCategory();
	await homePage.verifyCategoryProductsAreVisible(CATEGORIES.LAPTOPS);
});

test('Show all monitors when the Monitors category is selected', async ({homePage}) => {
	await homePage.goToHomePage();
	await homePage.selectMonitorsCategory();
	await homePage.verifyCategoryProductsAreVisible(CATEGORIES.MONITORS);
});

test('Hide products that do not belong to the selected category', async ({homePage}) => {
	await homePage.goToHomePage();

	for (const category of Object.keys(CATEGORY_PRODUCTS)) {
		await homePage.selectCategory(category);
		await homePage.verifyProductsFromOtherCategoriesAreHidden(category);
		await homePage.verifyCategoryProductsAreVisible(category);
	}
});

test('View product details with the price returned by the product API', async ({homePage, productPage}) => {
	await homePage.goToHomePage();
	await homePage.selectMonitorsCategory();
	await productPage.open(PRODUCTS.APPLE_MONITOR);
});

test('Add a single product to the cart', async ({homePage, productPage, cartPage}) => {
	await homePage.goToHomePage();
	await homePage.selectLaptopsCategory();
	const product = await productPage.open(PRODUCTS.MACBOOK_AIR);

	await productPage.addToCart();
	await homePage.clickCartLink();
	await cartPage.verifyProductIsPresent(PRODUCTS.MACBOOK_AIR, product.price);
});

test('Sign up with a new user', async ({homePage, accountPage, newUserCredentials}) => {
	await homePage.goToHomePage();
	await homePage.clickSignUpLink();
	await accountPage.signUp(newUserCredentials.username, newUserCredentials.password);
});

test('Complete a first purchase after registering a new user', async ({
	homePage,
	accountPage,
	productPage,
	cartPage,
	newUserCredentials
}) => {
	await homePage.goToHomePage();
	await homePage.clickSignUpLink();
	await accountPage.signUp(newUserCredentials.username, newUserCredentials.password);

	await homePage.clickLoginLink();
	await accountPage.logIn(newUserCredentials.username, newUserCredentials.password);

	await homePage.selectPhonesCategory();
	const nokiaLumia = await productPage.open(PRODUCTS.NOKIA_LUMIA_1520);
	await productPage.addToCart();

	await homePage.clickHomeLink();
	await homePage.selectLaptopsCategory();
	const macBookAir = await productPage.open(PRODUCTS.MACBOOK_AIR);
	await productPage.addToCart();

	const expectedTotal = nokiaLumia.price + macBookAir.price;
	await homePage.clickCartLink();
	await cartPage.verifyProductIsPresent(PRODUCTS.NOKIA_LUMIA_1520, nokiaLumia.price);
	await cartPage.verifyProductIsPresent(PRODUCTS.MACBOOK_AIR, macBookAir.price);
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
