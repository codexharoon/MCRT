const queryAsync = require('../Config/dbConnection');

async function createTableIfNotExists(tableName, fields) {
  const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (${fields.join(', ')})`;

  try {
    await queryAsync(createTableQuery);
    console.log(`${tableName} table created or already exists.`);
  } catch (err) {
    console.error(`Error creating ${tableName} table:`, err);
    throw err;
  }
}

async function createDatabaseAndTables() {
  const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`;

  try {
    await queryAsync(createDatabaseQuery);
    console.log('Database created or already exists.');

    // Switch to the database
    await queryAsync(`USE ${process.env.DB_DATABASE}`);
    console.log('Switched to the database.');
  } catch (err) {
    console.error('Error creating or switching to the database:', err);
    throw err;
  }
}

module.exports = {
  createTableIfNotExists,
  createDatabaseAndTables,
};
