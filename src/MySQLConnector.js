const mysql = require('mysql2');
mysql.debug = true;
require('dotenv').config();

const databaseHost = process.env.DATABASE_HOST;
const databaseUser = process.env.DATABASE_USER;
const databasePassword = process.env.DATABASE_PASSWORD;
const databaseName = process.env.DATABASE_NAME;

// Function to connect to the database
function connectMySQL() {
  const connection = mysql.createConnection({
    host: databaseHost,
    user: databaseUser,
    password: databasePassword,
    database: databaseName,
  });
  connection.connect((error) => {
    if (error) {
      console.error('Error connecting to the Database:', error);
      throw error;
    }
  });
  
  return connection;
}

// Function to execute an SQL query
function queryMySQL(queryString, connection) {
  return new Promise((resolve, reject) => {
    connection.query(queryString, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

// Function to close the connection
function closeMySQL(connection) {
  return new Promise((resolve, reject) => {
    connection.end((err) => {
      if (err) {
        reject(err);
      } else {
        resolve('Connection closed successfully');
      }
    });
  });
}

module.exports = {
  connectMySQL,
  queryMySQL,
  closeMySQL,
};