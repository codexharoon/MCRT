const express = require('express');
const app = express.Router();
const adminLogin = require('../Controllers/adminController')

app.post('/adminLogin',adminLogin)


module.exports = app;