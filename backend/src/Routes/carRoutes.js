const express = require('express');
const app = express.Router();
const carController = require('../Controllers/carController')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Add a new car
app.post('/addCar', upload.single('image'), carController.addCar);

// Get all cars
app.get('/getAllCars', carController.getAllCars);

// Get car by ID
app.get('/getcar/:id', carController.getCarById);



// Update car by ID
app.put('/updateCar/:id', upload.single('image'), carController.updateCar);

// Delete car by ID
app.delete('/deleteCar/:id', carController.deleteCar);

module.exports = app;
