const cryptoPrices = require('./moduleCryptoPrices');
const mySQLAnalyzer = require('./mySQLAnalyzer');

async function main() {
    const pricesTable = await cryptoPrices.getPrices();
    mySQLAnalyzer.uploadData(pricesTable);
};

main();