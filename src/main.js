const cryptoPrices = require('./moduleCryptoPrices');
const MySQLAnalyzer = require('./mySQLAnalyzer');


async function main() {

    const pricesTable = await cryptoPrices.getPrices();

    MySQLAnalyzer.uploadData(pricesTable);

};


main();