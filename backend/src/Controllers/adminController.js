const { getAdminQuery, addAdminQuery,getAdminByUserName } = require('../Models/adminModel')
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await getAdminQuery(email,password);


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

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required.'
      });
    }

    const existingAdminWithEmailPassword = await getAdminQuery(email, password);
    console.log("Exists",existingAdminWithEmailPassword)
    
    const existingAdminWithEmail = await getAdminByUserName(email);
    console.log("Exists",existingAdminWithEmail)
     
    if (existingAdminWithEmailPassword) {
      return res.status(400).json({
        success: false,
        error: 'Duplicate Admin!,Try a different one'
      });
    }
    if (existingAdminWithEmail) {
      return res.status(400).json({
        success : false,
        message : "Duplicate email! Try a different one"
      })
    }

    const admin = {
      email,
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

