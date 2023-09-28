const MySQLConnector = require('./MySQLConnector');

//Load the data in a table in the MySQL server.
async function uploadData(pricesTable) {
    let Conn = MySQLConnector.connectMySQL();
    const tableName = createTableName(); 
    createTable(Conn,tableName);
    insertData(Conn,pricesTable,tableName);
    console.log("marselo");
    await MySQLConnector.closeMySQL(Conn);    
};

//Create a new table to insert the data.
async function createTable(Conn,tableName){
    const queryCreate = "CREATE TABLE " + tableName + " (id INT AUTO_INCREMENT PRIMARY KEY, symbol VARCHAR(100), name VARCHAR(100), price FLOAT(20), market_cap DOUBLE);";
    await MySQLConnector.queryMySQL(queryCreate,Conn);
    setTimeout(function() {}, 3000);
};

//Iterate the list and insert the data in the table created in the previous step.
async function insertData(Conn,pricesTable,tableName){
    let i = 1; // Iteration counter to show the progress through the screen.
    for (const list of pricesTable){
        if (i>1){
            Conn = MySQLConnector.connectMySQL();
        }
        varSymbol = list[0];
        varName = list[1];
        varPrice = list[2];
        varMarket_cap = list[3];
        if (isNaN(varPrice)){
            varPrice = "0";//Some Cryptocurrencies values are so low that the website shows values like $0.0...03806, it should be corrected in the future.
        } 
        const queryInsert = "INSERT INTO " + tableName + " (symbol, name, price, market_cap) select '" + varSymbol + "','" + varName + "'," + varPrice + "," + varMarket_cap +";";
        await MySQLConnector.queryMySQL(queryInsert,Conn);
        console.log("Uploaded "+i+"/100");
        i++;
    };
    process.exit()
};

function createTableName(){
    var timeStamp = new Date().getTime().toString().slice(4,-2); //Used to create the name of the different tables
    tableName = "crypto_prices_" + timeStamp;
    return tableName
};

module.exports = {uploadData}