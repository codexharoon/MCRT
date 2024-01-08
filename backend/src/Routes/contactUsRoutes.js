const express = require('express');
const app = express.Router();
const {addFeedbackAndSendEmail} = require('../Controllers/contactUsController')

app.post('/addFeedback',addFeedbackAndSendEmail)

module.exports = app
