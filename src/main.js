const cryptoPrices = require('./moduleCryptoPrices');
const mySQLAnalyzer = require('./mySQLAnalyzer');

async function main() {
    const pricesTable = await cryptoPrices.getPrices();
    MySQLAnalyzer.uploadData(pricesTable);
};

main();