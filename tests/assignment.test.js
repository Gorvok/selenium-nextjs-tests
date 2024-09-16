const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

(async function runTests() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Test 1: Open homepage and check title
        await driver.get('http://localhost:3000');
        let homepageTitle = await driver.getTitle();
        console.log('Homepage Title:', homepageTitle);
        assert.strictEqual(homepageTitle, 'Home');
        console.log('Homepage title test passed!');

        // Test 2: Open contact page and check title
        await driver.get('http://localhost:3000/contact');
        let contactTitle = await driver.getTitle();
        console.log('Contact Page Title:', contactTitle);
        assert.strictEqual(contactTitle, 'Contact Us');
        console.log('Contact page title test passed!');

        // Test 3: Sign up for more info via email
        await driver.get('http://localhost:3000/contact');

        // Wait for the email input to be visible
        let emailField = await driver.wait(until.elementIsVisible(driver.findElement(By.id('formInput'))), 5000);
        await emailField.sendKeys('test@example.com');

        // Wait for the submit button to be visible and clickable
        let submitButton = await driver.wait(until.elementIsVisible(driver.findElement(By.id('formSubmit'))), 5000);
        await submitButton.click();

        // Wait for the success message
        let message = await driver.wait(until.elementLocated(By.id('formMessage')), 5000);
        let messageText = await message.getText();
        console.log('Message Text:', messageText);
        assert(messageText.includes('More info coming to test@example.com'));
        console.log('Sign-up test passed!');

    } finally {
        // Close the browser window
        await driver.quit();
    }
})();
