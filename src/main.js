const cryptoPrices = require('./moduleCryptoPrices');
const MySQLAnalyzer = require('./mySQLAnalyzer');


async function main() {
    const pricesList = await cryptoPrices.getPrices();

    console.log(pricesList);

   //MySQLAnalyzer.AnalyzeData(pricesList);

};


main();