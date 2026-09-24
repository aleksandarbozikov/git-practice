import {test, expect} from '@playwright/test';

test('Playwright Special Locators', async ({page})=> {

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check(); // getByLabel() is used to get the element by its label text, here we are getting the checkbox element by its label text and then we are checking it
    await page.getByLabel("Employed").check(); // getByLabel() is used to get the element by its label text, here we are getting the radio button element by its label text and then we are checking it
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("Test123!"); // getByPlaceholder() is used to get the element by its placeholder text, here we are getting the input element by its placeholder text and then we are filling it with the text 'ind'
    await page.getByRole("button", {name: "Submit"}).click(); // getByRole() is used to get the element by its role, here we are getting the button element by its role and then we are clicking on it
    await expect(page.getByText("Success! The Form has been submitted successfully!")).toBeVisible({timeout: 10_000}); // getByText() is used to get the element by its text, here we are getting the element by its text and then we are checking if it is visible or not
    //5 seconds default timeout for expected assertions, and on step level we are changing it to 10 seconds, so that it will wait for 10 seconds to find the element before throwing an error
    await page.getByRole("link", {name: "Shop"}).click(); // getByRole() is used to get the element by its role, here we are getting the link element by its role and then we are clicking on it
    await page.waitForLoadState('networkidle');
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click(); // filter() is used to filter the elements in the locator, here we are filtering the app-card elements by the text 'Nokia Edge' and then we are clicking on the button inside it
    await page.waitForLoadState('networkidle');
    
    
    // await page.pause()
});


test.only('Test level timeout', async ({page})=> {
    test.setTimeout(6000); //This will set the timeout for this test to 60 seconds, so that it will wait for 60 seconds for the test to be completed before throwing an error
    const slowExpect = expect.configure({timeout: 9000}); //This will set the timeout for all the expect assertions in this test to 10 seconds, so that it will wait for 10 seconds to find the element before throwing an error
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check(); // getByLabel() is used to get the element by its label text, here we are getting the checkbox element by its label text and then we are checking it
    await page.getByLabel("Employed").check(); // getByLabel() is used to get the element by its label text, here we are getting the radio button element by its label text and then we are checking it
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("Test123!"); // getByPlaceholder() is used to get the element by its placeholder text, here we are getting the input element by its placeholder text and then we are filling it with the text 'ind'
    await page.getByRole("button", {name: "Submit"}).click(); // getByRole() is used to get the element by its role, here we are getting the button element by its role and then we are clicking on it
    await slowExpect(page.getByText("Success! The Form has been submitted successfully!")).toBeVisible(); // getByText() is used to get the element by its text, here we are getting the element by its text and then we are checking if it is visible or not
    //5 seconds default timeout for expected assertions, and on step level we are changing it to 10 seconds, so that it will wait for 10 seconds to find the element before throwing an error
    await page.getByRole("link", {name: "Shop"}).click(); // getByRole() is used to get the element by its role, here we are getting the link element by its role and then we are clicking on it
    await slowExpect(page.locator(".my-4").first()).toHaveText("Shop"); // locator() is used to get the element by its selector, here we are getting the first element with the class 'my-4' and then we are checking if it has the text 'Shop' or not
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click(); // filter() is used to filter the elements in the locator, here we are filtering the app-card elements by the text 'Nokia Edge' and then we are clicking on the button inside it
    
    
    
    // await page.pause()
});