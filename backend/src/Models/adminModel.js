const queryAsync = require('../Config/dbConnection');
const { createTableIfNotExists, createDatabaseAndTables } = require('../utils/dbSetup');

// Define the table name and fields for the "cars" table
const tableName = 'admins';
const tableFields = [
  'id INT AUTO_INCREMENT PRIMARY KEY',
  'userName VARCHAR(255)',
  'password VARCHAR(255)',
];

// Initialize the database and create the "cars" table
createDatabaseAndTables()
  .then(() => createTableIfNotExists(tableName, tableFields))
  .catch((error) => {
    console.error('Error initializing the database:', error);
  });

const getAdminQuery = async (username,password) => {
  const rows = await queryAsync('SELECT * FROM admins WHERE userName = ? AND password = ?', [username,password]);
  // Extract the first element from the result array
  const adminData = rows.length > 0 ? rows[0] : null;
  return adminData;
};

const getAdminByUserName = async(userName)=> {
  const rows = await queryAsync('SELECT * FROM admins WHERE userName = ?', [userName]);
  // Extract the first element from the result array
  const adminData = rows.length > 0 ? rows[0] : null;
  return adminData;
}
const addAdminQuery = async (admin) => {
  const { userName, password } = admin;
  console.log("admin", admin)
  const result = await queryAsync(
    'INSERT INTO admins (userName,password) VALUES (?, ?)',
    [userName, password]
  );

  return getAdminQuery(result.insertId);
};

module.exports = {
  getAdminQuery,
  addAdminQuery,
  getAdminByUserName
}