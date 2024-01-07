const { getAllCarsQuery,
  getCarByIdQuery,
  addCarQuery,
  updateCarQuery,
  deleteCarQuery } = require('../Models/carModel');
const fs = require('fs')
const cloudinary = require('../Config/cloudinaryConfig')

//For All Cars
const getAllCars = async (req, res) => {
  try {
    const cars = await getAllCarsQuery();
    res.status(200).json({
      status: true,
      message: "All car data fetched successfully",
      data: cars,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      data: [],
      error: error.message,
    });
  }
};

//Get Specifc Car
const getCarById = async (req, res) => {
  const carId = req.params.id;
  try {
    const car = await getCarByIdQuery(carId);
    if (!car) {
      return res.status(404).json({
        status: false,
        error: 'Car not found',
      });
    }
    res.status(200).json({
      status: true,
      data: car,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      error: 'Internal Server Error',
    });
  }
};

//Add a new Car(Admin)

const addCar = async (req, res) => {
  try {
    // Ensure that req.body is defined
    if (!req.body) {
      return res.status(400).json({ error: 'Request body is undefined.' });
    }

    const { Title, Description, Price, Tag } = req.body;

    if (!Title || !Description || !Price || !Tag) {
      return res.status(400).json({ error: 'Title, Description, Price, and Tag are required.' });
    }

    // Assuming multer middleware is used for handling file uploads
    if (!req.file) {
      return res.status(400).json({ error: 'File upload is required.' });
    }

    const localImagePath = req.file.path;
    const cloudinaryUploadResult = await cloudinary.uploader.upload(localImagePath);
    fs.unlinkSync(localImagePath);

    const car = {
      Title,
      Description,
      Price,
      Tag,
      ImageUrl: cloudinaryUploadResult.secure_url,
    };

    // Replace 'addCar' with your actual function for adding a car
    const addedCar = await addCarQuery(car);
    const cars = await getAllCarsQuery();

    res.status(201).json({
      success: true,
      message: 'Car added successfully',
      data: cars
    });
  } catch (error) {
    console.error('Error adding car:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

//Update the Car (Admin)
const updateCar = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!req.body) {
      return res.status(400).json({ error: 'Request body is undefined.' });
    }

    const { Title, Description, Price, Tag } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'Car ID is required.' });
    }

    // Fetch the existing car data
    const existingCar = await getCarByIdQuery(userId);
    console.log("Existing Car", existingCar);

    if (!existingCar) {
      return res.status(404).json({ error: 'Car not found.' });
    }

    // Update only the fields that are provided
    const updatedCar = {
      Title: Title || existingCar.Title,
      Description: Description || existingCar.Description,
      Price: Price || existingCar.Price,
      Tag: Tag || existingCar.Tag,
    };
    console.log("Update Car", updatedCar)
    // If a new image is provided, update the image as well
    if (req.file) {
      const localImagePath = req.file.path;
      const cloudinaryUploadResult = await cloudinary.uploader.upload(localImagePath);
      fs.unlinkSync(localImagePath);
      updatedCar.ImageUrl = cloudinaryUploadResult.secure_url;
    } else {
      // Keep the existing image if no new image is provided
      updatedCar.ImageUrl = existingCar.ImageUrl;
    }

    // Replace 'updateCar' with your actual function for updating a car
    const updatedCarResult = await updateCarQuery(userId, updatedCar);
    const cars = await getAllCarsQuery();

    res.status(200).json({
      success: true,
      message: 'Car updated successfully',
      updatedCar: updatedCarResult,
      data: cars,
    });
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};










//Delete a Car
const deleteCar = async (req, res) => {
  const carId = req.params.id;
  try {
    console.log('Deleting car with ID:', carId);

    const car = await getCarByIdQuery(carId);
    if (!car) {
      console.log('Car not found');
      return res.status(404).json({
        status: false,
        error: 'Car not found',
      });
    }

    // Delete the car's image from Cloudinary if an ImageUrl is present
    if (car.ImageUrl) {
      const publicId = cloudinary.url(car.ImageUrl, { secure: true }).split('/').pop().replace(/\..+$/, '');
      console.log('Deleting image from Cloudinary with public ID:', publicId);

      try {
        await cloudinary.uploader.destroy(publicId);
        console.log('Image deleted from Cloudinary successfully');
      } catch (cloudinaryError) {
        console.error('Error deleting image from Cloudinary:', cloudinaryError);

      }
    }


    // Delete the car from the database
    await deleteCarQuery(carId);
    console.log('Car deleted from the database successfully');

    res.status(200).json({
      status: true,
      message: 'Car deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({
      status: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};


module.exports = {
  getAllCars,
  getCarById,
  addCar,
  updateCar,
  deleteCar
};
