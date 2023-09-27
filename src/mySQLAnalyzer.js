const MySQLConnector = require('./MySQLConnector');

async function AnalyzeData(pricesList) {

    const Conn = await MySQLConnector.connectMySQL();
    MySQLConnector.queryMySQL("select * from asdasd limit 1",Conn);
}

module.exports = {AnalyzeData}