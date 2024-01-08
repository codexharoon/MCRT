const queryAsync = require('../Config/dbConnection');

const getAdminByIdQuery = async (username) => {
    const rows = await queryAsync('SELECT * FROM admins WHERE username = ?', [username]);
    // Extract the first element from the result array
    const adminData = rows.length > 0 ? rows[0] : null;
    return adminData;
  };


  module.exports = getAdminByIdQuery