const queryAsync = require('../Config/dbConnection');
const { createTableIfNotExists, createDatabaseAndTables } = require('../utils/dbSetup');

// Define the table name and fields for the "cars" table
const tableName = 'cars';
const tableFields = [
  'id INT AUTO_INCREMENT PRIMARY KEY',
  'Title VARCHAR(255)',
  'Description TEXT',
  'Price DECIMAL(10, 2)',
  'Tag VARCHAR(50)',
  'ImageUrl VARCHAR(255)',
];

// Initialize the database and create the "cars" table
createDatabaseAndTables()
  .then(() => createTableIfNotExists(tableName, tableFields))
  .catch((error) => {
    console.error('Error initializing the database:', error);
  });

// Function to get all cars
const getAllCarsQuery = async () => {
  const rows = await queryAsync('SELECT * FROM cars');
  console.log("rows",rows)
  return rows;
};

// Function to get a car by ID
const getCarByIdQuery = async (carId) => {
  const rows = await queryAsync('SELECT * FROM cars WHERE id = ?', [carId]);
  // Extract the first element from the result array
  const carData = rows.length > 0 ? rows[0] : null;
  return carData;
};


// Function to add a new car
const addCarQuery = async (car) => {
  const { Title, Description, Price, Tag, ImageUrl } = car;
  console.log("car",car)
  const result = await queryAsync(
    'INSERT INTO cars (Title, Description, Price, Tag, ImageUrl) VALUES (?, ?, ?, ?, ?)',
    [Title, Description, Price, Tag, ImageUrl]
  );

  return getCarByIdQuery(result.insertId);
};

// Function to update a car by ID
const updateCarQuery = async (carId, updatedCar) => {
  const { Title, Description, Price, Tag, ImageUrl } = updatedCar;
  await queryAsync(
    'UPDATE cars SET Title = ?, Description = ?, Price = ?, Tag = ?, ImageUrl = ? WHERE id = ?',
    [Title, Description, Price, Tag, ImageUrl, carId]
  );

  return getCarByIdQuery(carId);
};

// Function to delete a car by ID
const deleteCarQuery = async (carId) => {
  await queryAsync('DELETE FROM cars WHERE id = ?', [carId]);
  
};


module.exports = {
  getAllCarsQuery,
  getCarByIdQuery,
  addCarQuery,
  updateCarQuery,
  deleteCarQuery
};
