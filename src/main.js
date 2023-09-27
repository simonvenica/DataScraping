const cryptoPrices = require('./moduleCryptoPrices');
const MySQLAnalyzer = require('./mySQLAnalyzer');


async function main() {

    pricesList = [1,2,3,4];

    //const pricesList = await cryptoPrices.getPrices();

    MySQLAnalyzer.AnalyzeData(pricesList);

};


main();