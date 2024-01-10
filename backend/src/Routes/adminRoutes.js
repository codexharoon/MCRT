const express = require('express');
const app = express.Router();
const {adminLogin,addAdmin} = require('../Controllers/adminController')

app.post('/adminLogin',adminLogin)
app.post('/addAdmin',addAdmin)


module.exports = app;