// const {test, expect} = require('@playwright/test'); 

// test('Browser Context-Validation Error', async ({page})=>
// {
    
//     const productName = 'ZARA COAT 3';
//     const products = page.locator('.card-body');
//     const email = 'mia11@example.com';
//     await page.goto("https://rahulshettyacademy.com/client");
//     await page.locator('#userEmail').fill(email);
//     await page.locator('#userPassword').fill('Mia@12345');
//     await page.locator("[value='Login']").click();
//     await page.waitForLoadState('networkidle'); // waitForLoadState() is used to wait for the page to load completely, here we are waiting for the network to be idle, which means that there are no more network requests being made
//     await page.locator(".card-body b").first().waitFor(); // use this or the previous one: waitFor() is used to wait for the element to be visible on the page, here we are waiting for the card body to be visible on the page   
//     const titles = await page.locator('.card-body b').allTextContents();
//     console.log(titles); 
//     //find zara coat 4 and add to card
//     const count = await products.count()  // count() is used to get the count of the elements in the locator, here we are getting the count of the card body elements on the page
//     for(let i=0; i<count; i++)
//     {
//         if (await products.nth(i).locator("b").textContent() === productName)  // nth() is used to get the nth element of the locator, here we are getting the nth element of the card body and then we are getting the text content of the b element inside the card body and comparing it with the product name
//         {
//             await products.nth(i).locator("text = Add To Cart").click();  // locator() is used to get the element inside the card body, here we are getting the element with the text 'Add To Cart' and then we are clicking on it to add the product to the cart
//             break;
//         }
//     }
//     await page.locator("[routerlink*='cart']").click(); // click on the cart icon to go to the cart page
//     await page.locator("div li").first().waitFor(); // wait for the first element of the cart to be visible on the page
//     const bool =  await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); // isVisible() is used to check if the element is visible on the page, here we are checking if the h3 element with the text 'ZARA COAT 3' is visible on the page
//     expect(bool).toBeTruthy();  // toBeTruthy() is used to check if the value is true, here we are checking if the bool variable is true, which means that the product is added to the cart successfully
//     await page.locator("text=Checkout").click(); // click on the checkout button to go to the checkout page
//     await page.locator("[placeholder*='Country']").pressSequentially("ind"); // pressSequentially() is used to press the keys sequentially, here we are pressing the keys 'ind' to select the country from the dropdown
//     const dropdown = page.locator(".ta-results"); // get the locator for the dropdown options
//     await dropdown.waitFor(); // wait for the dropdown options to be visible on the page
//     const optionsCount = await dropdown.locator("button").count(); // click on the second option in the dropdown to select the country
//     for(let i=0; i<optionsCount; i++)
//     {
//         const text = await dropdown.locator("button").nth(i).textContent(); // get the text content of the button element in the dropdown options
//         if(text === " India")  // compare the text content with the country name, here we are comparing it with 'India' and if it matches then we are clicking on the button to select the country
//         {
//             await dropdown.locator("button").nth(i).click(); // click on the button to select the country
//             break;
//         }
//     }

//     expect(page.locator(".user__name [type='text']").first()).toHaveText(email); // toHaveText() is used to check if the element has the expected text, here we are checking if the input element with the type 'text' inside the user__name class has the text 'Mia'
//     await page.locator(".action__submit").click(); // click on the submit button to place the order
//     await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. "); // toHaveText() is used to check if the element has the expected text, here we are checking if the h1 element with the class 'hero-primary' has the text 'Thank you for the order.'
//     const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent(); // get the text content of the element with the class 'em-spacer-1' and 'ng-star-inserted' which contains the order id
//     console.log(orderId);
//     await page.locator("button[routerlink*='myorders']").click(); // click on the my orders button to go to the my orders page
//     await page.locator("tbody").waitFor(); // wait for the first element of the table body to be visible on the page
//     const rows = page.locator("tbody tr"); // get the locator for the rows in the table
//     for(let i=0; i< await rows.count(); i++) // count() is used to get the count of the elements in the locator, here we are getting the count of the rows in the table
//     {
//         const rowOrderId = await rows.nth(i).locator("th").textContent(); // get the text content of the th element in the row which contains the order id
//         if(orderId.includes(rowOrderId))  // includes() is used to check if the string contains the specified string, here we are checking if the order id contains the row order id and if it does then we are clicking on the button to view the order details
//         {
//             await rows.nth(i).locator("button").first().click(); // click on the row to view the order details
//             break;
//         }
//     }
//     const orderIdDetails = await page.locator(".col-text").textContent(); // wait for the first element of the order details to be visible on the page
//     expect(orderId.includes(orderIdDetails)).toBeTruthy(); // toBeTruthy() is used to check if the value is true, here we are checking if the order id contains the text content of the first element of the order details and if it does then we are asserting that the value is true
//     await page.pause()

// });