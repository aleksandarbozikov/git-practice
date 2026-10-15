const {test, expect} = require('@playwright/test');

const app = 'https://www.demoblaze.com/';

test('Verify homepage navigation is visible', async ({page}) => {
	await page.goto(app);
	await expect(page.getByRole('link', {name: 'Home'})).toBeVisible();
	await expect(page.getByRole('link', {name: 'Contact'})).toBeVisible();
	await expect(page.getByRole('link', {name: 'About us'})).toBeVisible();
	await expect(page.getByRole('link', {name: 'Cart'})).toBeVisible();
	await expect(page.getByRole('link', {name: 'Log in'})).toBeVisible();
	await expect(page.getByRole('link', {name: 'Sign up'})).toBeVisible();
});

test('Filter Producsts by Category', async ({page}) => {
	await page.goto(app);
    await page.getByText('Phones').click();
	    await expect(page.getByRole('link', {name: 'Samsung galaxy s6'})).toBeVisible();
	    await expect(page.getByRole('link', {name: 'Nokia lumia 1520'})).toBeVisible();
	    await expect(page.getByRole('link', {name: 'Nexus 6'})).toBeVisible();
	    await expect(page.getByRole('link', {name: 'Samsung galaxy s7'})).toBeVisible();
	    await expect(page.getByRole('link', {name: 'Iphone 6 32gb'})).toBeVisible();
	    await expect(page.getByRole('link', {name: 'Sony xperia z5'})).toBeVisible();
	    await expect(page.getByRole('link', {name: 'HTC One M9'})).toBeVisible();
    await page.getByText('Laptops').click();
        await expect(page.getByRole('link', {name: 'Sony vaio i5'})).toBeVisible();
        await expect(page.getByRole('link', {name: 'Sony vaio i7'})).toBeVisible();
        await expect(page.getByRole('link', {name: 'MacBook air'})).toBeVisible();
        await expect(page.getByRole('link', {name: 'Dell i7 8gb'})).toBeVisible();
        await expect(page.getByRole('link', {name: '2017 Dell 15.6 Inch'})).toBeVisible();
        await expect(page.getByRole('link', {name: 'MacBook Pro'})).toBeVisible();
    await page.getByText('Monitors').click();
        await expect(page.getByRole('link', {name: 'Apple monitor 24'})).toBeVisible();
        await expect(page.getByRole('link', {name: 'ASUS Full HD'})).toBeVisible();
	
});

test('View a Product Details', async ({page}) => {
	await page.goto(app);
    await page.getByText('Monitors').click();
    await page.getByRole('link', {name: 'Apple monitor 24'}).click();
    await expect(page.getByText("Apple monitor 24")).toBeVisible();
    await expect(page.getByText("$400 *includes tax")).toBeVisible();
    await expect(page.getByText("LED Cinema Display features a 27-inch glossy LED-backlit")).toBeVisible();
    await expect(page.getByRole('link', {name: 'Add to cart'})).toBeVisible();

});

test('Add a Single Product to the Card', async ({page}) => {
	await page.goto(app);
    await page.getByText('Laptop').click();
    await page.getByRole('link', {name: 'MacBook air'}).click();
    await expect(page.getByText("MacBook air")).toBeVisible();
    await expect(page.getByText("$700 *includes tax")).toBeVisible();
    await expect(page.getByText("1.6GHz dual-core Intel Core i5")).toBeVisible();
    await expect(page.getByText("Add to cart")).toBeVisible();
    await page.getByRole('link', {name: 'Add to cart'}).click();
    page.once('dialog', dialog => dialog.accept());
    await page.getByRole('link', { name: 'Cart' }).click();
    await expect(page.getByRole('link', {name: 'MacBook air'})).toBeVisible();
    await expect(page.getByText("$700")).toBeVisible();


});

test('Sign Up With a New User', async ({page}) => {
	await page.goto(app);
    await page.getByRole('link', {name: 'Sign up'}).click();
    await page.locator('#sign-username').fill('testuser');
    await page.locator('#sign-password').fill('testpassword');
    await page.getByRole('button', {name: 'Sign up'}).click();
    page.once('dialog', dialog => dialog.accept());

});

test.only('New User Registration Through First Purchase', async ({page}) => {
	const username = `registrationuser${Date.now()}`;
	const password = 'registrationpassword';

	await page.goto(app);
    await page.getByRole('link', {name: 'Sign up'}).click();
    await page.locator('#sign-username').fill(username);
    await page.locator('#sign-password').fill(password);
    page.once('dialog', dialog => dialog.accept());
    await page.getByRole('button', {name: 'Sign up'}).click();
    await page.getByRole('dialog', {name: 'Sign up'}).getByLabel('Close').click();
    await page.getByRole('link', {name: 'Log in'}).click();
    await page.locator('#loginusername').fill(username);
    await page.locator('#loginpassword').fill(password);
    page.once('dialog', dialog => dialog.accept());
    await page.getByRole('button', {name: 'Log in'}).click();
    await page.getByText('Phones').click();
    await page.getByRole('link', {name: 'Nokia lumia 1520'}).click();
    page.once('dialog', dialog => dialog.accept());
    await page.getByRole('link', {name: 'Add to cart'}).click();
    await page.getByRole('link', {name: 'Home'}).click();
    await page.getByText('Laptops').click();
    await page.getByRole('link', {name: 'MacBook air'}).click();
    page.once('dialog', dialog => dialog.accept());
    await page.getByRole('link', {name: 'Add to cart'}).click();
    await page.getByRole('link', {name: 'Cart', exact: true}).click();
    await expect(page.getByRole('cell', {name: 'Nokia lumia 1520'})).toBeVisible();
    await expect(page.getByRole('cell', {name: '820', exact: true})).toBeVisible();
    await expect(page.getByRole('cell', {name: 'MacBook air'})).toBeVisible();
    await expect(page.getByRole('cell', {name: '700', exact: true})).toBeVisible();
    await expect(page.locator('#totalp')).toHaveText('1520');
    await page.getByRole('button', { name: 'Place Order' }).click();
    await page.locator('#name').fill('Asuma');
    await page.locator('#country').fill('Alabama');
    await page.locator('#city').fill('Your Vegas');
    await page.locator('#card').fill('324 3232 32323 323 321');
    await page.locator('#month').fill('March');
    await page.locator('#year').fill('1998');
    page.once('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: 'Purchase' }).click();
    await page.getByRole('button', {name: 'OK', exact: true}).click();

});

