const getAdminByIdQuery = require('../Models/adminModel')
const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await getAdminByIdQuery(username); 
    

    if (!admin || admin.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    res.status(200).json(
        { success: true,
          message: 'Login successful',
          data: admin });
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

module.exports = adminLogin;
