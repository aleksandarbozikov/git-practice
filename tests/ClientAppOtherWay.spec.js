const {test, expect} = require('@playwright/test'); 

test('Browser Context-Validation Error', async ({page})=>
{
    
    const productName = 'ZARA COAT 3';
    const products = page.locator('.card-body');
    const email = 'mia11@example.com';
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder('email@example.com').fill(email);
    await page.getByPlaceholder('enter your passsword').fill('Mia@12345');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForLoadState('networkidle'); // waitForLoadState() is used to wait for the page to load completely, here we are waiting for the network to be idle, which means that there are no more network requests being made
    await page.locator(".card-body b").first().waitFor(); // use this or the previous one: waitFor() is used to wait for the element to be visible on the page, here we are waiting for the card body to be visible on the page   
    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles); 
    await page.locator('.card-body').filter({hasText: "ZARA COAT 3"}).getByRole('button', { name: 'Add To Cart' }).click(); // filter() is used to filter the elements based on the text content, here we are filtering the card body elements based on the text content 'ZARA COAT 3' and then clicking on the button with the name 'Add To Cart'
    await page.getByRole("listitem").getByRole('button', { name: 'Cart' }).click(); // click on the cart button to go to the cart page

    await page.locator("div li").first().waitFor(); // wait for the first element of the cart to be visible on the page
    await expect(page.getByText("ZARA COAT 3")).toBeVisible(); // toBeVisible() is used to check if the element is visible on the page, here we are checking if the text 'ZARA COAT 3' is visible on the page
    await page.getByRole("button",{ name: "Checkout" }).click(); // click on the checkout button to go to the checkout page
    await page.getByPlaceholder("Select Country").pressSequentially("ind"); // pressSequentially() is used to press the keys sequentially, here we are pressing the keys 'ind' to select the country from the dropdown
    await page.getByRole("button", { name: "India" }).nth(1).click(); // click on the button with the name 'India' to select the country

    await page.getByText("PLACE ORDER").click(); // click on the submit button to place the order
    await expect(page.getByText("THANK YOU FOR THE ORDER.")).toBeVisible();
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent(); // get the text content of the element with the class 'em-spacer-1' and 'ng-star-inserted' which contains the order id
    console.log(orderId);
    await page.locator("button[routerlink*='myorders']").click(); // click on the my orders button to go to the my orders page
    await page.locator("tbody").waitFor(); // wait for the first element of the table body to be visible on the page
    const rows = page.locator("tbody tr"); // get the locator for the rows in the table
    for(let i=0; i< await rows.count(); i++) // count() is used to get the count of the elements in the locator, here we are getting the count of the rows in the table
    {
        const rowOrderId = await rows.nth(i).locator("th").textContent(); // get the text content of the th element in the row which contains the order id
        if(orderId.includes(rowOrderId))  // includes() is used to check if the string contains the specified string, here we are checking if the order id contains the row order id and if it does then we are clicking on the button to view the order details
        {
            await rows.nth(i).locator("button").first().click(); // click on the row to view the order details
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent(); // wait for the first element of the order details to be visible on the page
    expect(orderId.includes(orderIdDetails)).toBeTruthy(); // toBeTruthy() is used to check if the value is true, here we are checking if the order id contains the text content of the first element of the order details and if it does then we are asserting that the value is true
    await page.pause()

});