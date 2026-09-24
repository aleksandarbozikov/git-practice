const {test, expect} = require('@playwright/test'); 

test('Browser Context Playwright test', async function({browser})
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const password = page.locator('#password');
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title())
    await userName.fill('rahulshettya');
    await password.fill('Learning@830$3mK2');
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent())
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    await userName.fill('');
    await userName.fill('rahulshettyacademy');
    await signIn.click();
    console.log(await page.title())
    console.log(await cardTitles.first().textContent()); // first() is used to get the first element of the locator or last() is used to get the last element of the locator  
    console.log(await cardTitles.nth(1).textContent()); //nth() is used to get the nth element of the locator, here it will get the second element of the locator as index starts from 0
    const allTitles = await cardTitles.allTextContents(); //allTextContents() is used to get all the text contents of the locator and it will return an array of text contents
    console.log(allTitles);
});

// test.only('Create Account', async function({browser})
// {
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     const registerHere = page.locator('.text-reset')
//     const firstName = page.locator('#firstName');
//     const lastName = page.locator('#lastName');
//     const userEmail = page.locator('#userEmail');
//     const phoneNumber = page.locator('#userMobile');
//     const password = page.locator('#userPassword');
//     const confirmPassword = page.locator('#confirmPassword');
//     const checkBox = page.locator("input[type='checkbox']");
//     const register = page.locator('#login');
//     const login = page.locator('.btn btn-primary')
//     const cardTitles = page.locator('.card-body b');
//     await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
//     console.log(await page.title())
//     await registerHere.click();
//     await firstName.fill('Mia');
//     await lastName.fill('Smith');
//     await userEmail.fill('mia232@example.com');
//     await phoneNumber.fill('1234567890');
//     await password.fill('Mia@12345');
//     await confirmPassword.fill('Mia@12345');
//     await checkBox.check();
//     await register.click();
//     await page.title()
//     console.log(await page.locator('.headcolor').textContent())
//     await expect(page.locator('.headcolor')).toHaveText('Account Created Successfully');
//     await page.locator('.btn.btn-primary').click();
//     await userEmail.fill('mia2@example.com');
//     await password.fill('Mia@12345');
//     await register.click();
//     console.log(await page.title())
//     console.log(await cardTitles.first().textContent());

    
// });


test('UI Conrols', async function({page}) 
{
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const userName = page.locator('#username');
const password = page.locator('#password');
const signIn = page.locator('#signInBtn');
const documentLink = page.locator("[href*='documents-request']");
const dropdown = page.locator('select.form-control');
await dropdown.selectOption('consult'); //value is used to select the option from the dropdown
await page.locator('.radiotextsty').last().click(); //last() is used to get the last element of the locator, here we are clicking on the last radio button
console.log(await page.locator('.radiotextsty').last().isChecked()); //isChecked() is used to check if the radio button is checked or not, here we are checking if the last radio button is checked or not and it will return true or false
expect(page.locator('.radiotextsty').last().isChecked()); //toBeChecked() is used to check if the radio button is checked or not, here we are checking if the last radio button is checked or not
await page.locator('#okayBtn').click(); //click() is used to click on the element, here we are clicking on the okay button of the alert box
await page.locator('#terms').click(); //check() is used to check the checkbox, here we are checking the checkbox of terms and conditions
await expect(page.locator('#terms')).toBeChecked(); //toBeChecked() is used to check if the checkbox is checked or not, here we are checking if the checkbox of terms and conditions is checked or not
await page.locator('#terms').uncheck(); //uncheck() is used to uncheck the checkbox, here we are unchecking the checkbox of terms and conditions
expect(await page.locator('#terms').isChecked()).toBeFalsy(); //toBeFalsy() is used to check if the checkbox is unchecked or not, here we are checking if the checkbox of terms and conditions is unchecked or not and it will return true or false
await expect(documentLink).toHaveAttribute('class', 'blinkingText'); //toHaveAttribute() is used to check if the element has the attribute or not, here we are checking if the dropdown has the value attribute with the value 'consult' or not
await page.pause(); //pause() is used to pause the execution of the test and it will open the browser in debug mode, here we can inspect the elements and see the state of the application at that point of time
});

test('Child windows handling', async ({browser})=>
{
const context = await browser.newContext();
const page = await context.newPage();
const userName = page.locator('#username');
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const documentLink = page.locator("[href*='documents-request']");

const [newPage] =await Promise.all([
    context.waitForEvent('page'), //listen for any new page pending, rejected or fulfilled
    documentLink.click(), //new page is opened
])
const text = await newPage.locator('.red').textContent();
console.log(text);
const arrayText = text.split('@'); //split() is used to split the string into an array and if its [1] then it will return the second element of the array, here we are splitting the email id and getting the domain name of the email id
const domain = arrayText[1].split(" ")[0]; //we create new const and take the right side from the array mentor@rahulshettyacademy.com with below template to receive response and we split it from the space and get the first element of the array which is the email id without any space
// console.log(domain);
await page.locator('#username').fill(domain);
await page.locator('#username').textContent()
console.log(await page.locator('#username').inputValue()); //we use inputValue
await page.pause();
});
