const {expect} = require('@playwright/test');

async function clickAndAcceptDialog(page, locator, expectedMessage) {
	const dialogPromise = page.waitForEvent('dialog');
	const clickPromise = locator.click();
	const dialog = await dialogPromise;
	const acceptedMessages = Array.isArray(expectedMessage) ? expectedMessage : [expectedMessage];

	expect(acceptedMessages).toContain(dialog.message());
	await dialog.accept();
	await clickPromise;
}

module.exports = {clickAndAcceptDialog};
