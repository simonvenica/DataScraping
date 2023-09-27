const MySQLConnector = require('./MySQLConnector');

function AnalyzeData(pricesList) {


    const Conn = MySQLConnector.connectMySQL();

}

module.exports = {AnalyzeData}