const { getAdminQuery, addAdminQuery,getAdminByUserName } = require('../Models/adminModel')
const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await getAdminQuery(username,password);


    if (!admin || admin.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    res.status(200).json(
      {
        success: true,
        message: 'Login successful',
        data: admin
      });
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
const addAdmin = async (req, res) => {
  try {
    // Ensure that req.body is defined
    if (!req.body) {
      return res.status(400).json({ error: 'Request body is undefined.' });
    }

    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({
        success: false,
        error: 'User name and password are required.'
      });
    }

    // Check if userName and password combination already exists in the database
    const existingAdminWithUserNamePassword = await getAdminQuery(userName, password);
    console.log("Exists",existingAdminWithUserNamePassword)
    
    const existingAdminWithUserName = await getAdminByUserName(userName);
    console.log("Exists",existingAdminWithUserName)
     
    if (existingAdminWithUserNamePassword) {
      return res.status(400).json({
        success: false,
        error: 'Duplicate Admin!,Try a different one'
      });
    }
    if (existingAdminWithUserName) {
      return res.status(400).json({
        success : false,
        message : "Duplicate username! Try a different one"
      })
    }

    const admin = {
      userName,
      password
    };

    await addAdminQuery(admin);

    res.status(201).json({
      success: true,
      message: 'Admin added successfully',
      data: admin
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message
    });
  }
};




module.exports = 
{
  adminLogin,
  addAdmin
}

