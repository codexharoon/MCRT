const queryAsync = require('../Config/dbConnection');
const { createTableIfNotExists, createDatabaseAndTables } = require('../utils/dbSetup');

// Defining the table name and fields
const tableName = 'tours';
const tableFields = [
    'id INT AUTO_INCREMENT PRIMARY KEY',
    'Title VARCHAR(255)',
    'Description TEXT',
    'Duration VARCHAR(255)',
    'Location VARCHAR(255)',
    'Price FLOAT',
    'Schedule TEXT',
    'GroupSize INT',
    'Availability VARCHAR(255)',
    'Tag VARCHAR(50)',
    'ImageUrl VARCHAR(255)',
  ];

// Initialize the database and create the "cars" table
createDatabaseAndTables()
  .then(() => createTableIfNotExists(tableName, tableFields))
  .catch((error) => {
    console.error('Error initializing the database:', error);
  });

// Function to get all tours
const getAllToursQuery = async () => {
  const rows = await queryAsync('SELECT * FROM tours');
  return rows;
};

// Function to get a tour by ID
const getTourByIdQuery = async (tourId) => {
  const rows = await queryAsync('SELECT * FROM tours WHERE id = ?', [tourId]);
  // Extract the first element from the result array
  const tourData = rows.length > 0 ? rows[0] : null;
  return tourData;
};


// Function to add a new tour
const addTourQuery = async (tour) => {
    const {
      Title,
      Description,
      Duration,
      Location,
      Price,
      Schedule,
      GroupSize,
      Availability,
      Tag,
      ImageUrl,
    } = tour;
  
    const result = await queryAsync(
      'INSERT INTO tours (Title, Description, Duration, Location, Price, Schedule, GroupSize, Availability, Tag, ImageUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [Title, Description, Duration, Location, Price, Schedule, GroupSize, Availability, Tag, ImageUrl]
    );
  
    return getTourByIdQuery(result.insertId);
  };
  

// Function to update a tour by ID
const updateTourQuery = async (tourId, updatedTour) => {
    const {
      Title,
      Description,
      Duration,
      Location,
      Price,
      Schedule,
      GroupSize,
      Availability,
      Tag,
      ImageUrl,
    } = updatedTour;
  
    await queryAsync(
      'UPDATE tours SET Title = ?, Description = ?, Duration = ?, Location = ?, Price = ?, Schedule = ?, GroupSize = ?, Availability = ?, Tag = ?, ImageUrl = ? WHERE id = ?',
      [Title, Description, Duration, Location, Price, Schedule, GroupSize, Availability, Tag, ImageUrl, tourId]
    );
  
    return getTourByIdQuery(tourId);
  };
  

// Function to delete a Tour by ID
const deleteTourQuery = async (tourId) => {
  await queryAsync('DELETE FROM tours WHERE id = ?', [tourId]);
  
};


module.exports = {
  getAllToursQuery,
  getTourByIdQuery,
  addTourQuery,
  updateTourQuery,
  deleteTourQuery
};
