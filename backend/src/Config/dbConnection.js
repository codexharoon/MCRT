const mysql = require('mysql2');
const { promisify } = require('util')

require('dotenv').config();

const dbConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Promisify MySQL queries
const queryAsync = promisify(dbConnection.query).bind(dbConnection);
module.exports = queryAsync
