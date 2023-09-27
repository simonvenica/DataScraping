const puppeteer = require('puppeteer');

async function getPrices() {

    //Initialize Puppeteer.
    const browser = await puppeteer.launch({
        headless: 'new', //Puppeteer requires this to avoid a warning.
    });

    //Navigate to the website.
    const page = await browser.newPage();
    await page.goto('https://coinmarketcap.com/');
    await page.setViewport({
        width: 1200,
        height: 800
    });

    //Seek the data required.
    const data = await page.evaluate(async () => {
        const element = Array.from(document.querySelectorAll('.coin-item-symbol'), (tempElement) => tempElement.textContent);
        return element;
    });

    //Close the website.
    await browser.close();

    console.log(data)
}




getPrices();