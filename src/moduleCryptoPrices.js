const puppeteer = require('puppeteer');
const autoScroller = require('./moduleAutoScroller')
const dataAnalyzer = require('./moduleDataAnalysis')


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

    //Scrolls to the bottom of the website.
    await autoScroller.autoScroll(page);

    //Makes a list with the main cryptocurrencies data (name, price and market cap)
    const dataList = await page.evaluate(async () => {
        const element = Array.from(document.querySelectorAll('a.cmc-link'), (tempElement) => tempElement.textContent);
        return element;
    });

    //Makes a list with the symbols (e.g. BTC, ETH, XRP) we need this to split correctly the name of the currency in the final list.
    const symbolsList = await page.evaluate(async () => {
        const element = Array.from(document.querySelectorAll('.coin-item-symbol'), (tempElement) => tempElement.textContent);
        return element;
    });

    //Receives both lists with raw data and returns a coherent and clean list.
    let finalList = dataAnalyzer.dataAnalysis(dataList,symbolsList);

    //Close the website.
    await browser.close();

    return finalList;
}

module.exports = {getPrices}