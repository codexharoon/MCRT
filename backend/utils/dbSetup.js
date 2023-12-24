// dbSetup.js
const connection = require('./dbConnection');

function createDatabaseAndTables() {
  const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`;
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      firstName VARCHAR(255),
      lastName VARCHAR(255),
      email VARCHAR(255),
      password VARCHAR(255)
    )`;

  connection.query(createDatabaseQuery, (err) => {
    if (err) {
      console.error('Error creating database:', err);
    } else {
      console.log('Database created or already exists.');
      // Switch to the database
      connection.query(`USE ${process.env.DB_DATABASE}`, (err) => {
        if (err) {
          console.error('Error switching to the database:', err);
        } else {
          // Create the users table
          connection.query(createTableQuery, (err) => {
            if (err) {
              console.error('Error creating users table:', err);
            } else {
              console.log('Users table created or already exists.');
            }
          });
        }
      });
    }
  });
}

module.exports = {
  createDatabaseAndTables,
};
