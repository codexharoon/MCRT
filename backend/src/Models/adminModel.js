const queryAsync = require('../Config/dbConnection');
const { createTableIfNotExists, createDatabaseAndTables } = require('../utils/dbSetup');

// Define the table name and fields for the "cars" table
const tableName = 'admins';
const tableFields = [
  'id INT AUTO_INCREMENT PRIMARY KEY',
  'email VARCHAR(255)',
  'password VARCHAR(255)',
];

// Initialize the database and create the "cars" table
createDatabaseAndTables()
  .then(() => createTableIfNotExists(tableName, tableFields))
  .catch((error) => {
    console.error('Error initializing the database:', error);
  });

const getAdminQuery = async (email,password) => {
  const rows = await queryAsync('SELECT * FROM admins WHERE email = ? AND password = ?', [email,password]);
  // Extract the first element from the result array
  const adminData = rows.length > 0 ? rows[0] : null;
  return adminData;
};

const getAdminByUserName = async(email)=> {
  const rows = await queryAsync('SELECT * FROM admins WHERE email = ?', [email]);
  // Extract the first element from the result array
  const adminData = rows.length > 0 ? rows[0] : null;
  return adminData;
}
const addAdminQuery = async (admin) => {
  const { email, password } = admin;
  console.log("admin", admin)
  const result = await queryAsync(
    'INSERT INTO admins (email,password) VALUES (?, ?)',
    [email, password]
  );

  return getAdminQuery(result.insertId);
};

module.exports = {
  getAdminQuery,
  addAdminQuery,
  getAdminByUserName
}