const express = require('express');
const app = express.Router();
const tourModel = require('../Controllers/tourController')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Add a new tour
app.post('/addTour', upload.single('image'), tourModel.addTour);

// Get all tours
app.get('/getAllTours', tourModel.getAllTours);

// Get tour by ID
app.get('/getTour/:id', tourModel.getTourById);

// Update tour by ID
app.put('/updateTour/:id', upload.single('image'), tourModel.updateTour);

// Delete tour by ID
app.delete('/deleteTour/:id', tourModel.deleteTour);

module.exports = app;
