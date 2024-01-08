const queryAsync  = require('../Config/dbConnection')
const { createTableIfNotExists, createDatabaseAndTables } = require('../utils/dbSetup');

// Defining the table name and fields for the feedback table
const feedbackTableName = 'feedback';
const feedbackTableFields = [
  'id INT AUTO_INCREMENT PRIMARY KEY',
  'userName VARCHAR(255)',
  'Email VARCHAR(255)',
  'Phone VARCHAR(20)',
  'Message TEXT',
];

// Initialize the database and create the "feedback" table
createDatabaseAndTables()
  .then(() => createTableIfNotExists(feedbackTableName, feedbackTableFields))
  .catch((error) => {
    console.error('Error initializing the database:', error);
  });
  // Function to get a feedback by ID
  const getFeedbackByIdQuery = async (feedbackId) => {
    const rows = await queryAsync('SELECT * FROM feedback WHERE id = ?', [feedbackId]);
    // Extract the first element from the result array
    const feedbackData = rows.length > 0 ? rows[0] : null;
    return feedbackData;
  };  

// Function to add a new feedback
const addFeedbackQuery = async (feedback) => {
  const { userName, Email, Phone, Message } = feedback;

  const result = await queryAsync(
    'INSERT INTO feedback (userName, Email, Phone, Message) VALUES (?, ?, ?, ?)',
    [userName, Email, Phone, Message]
  );

  return getFeedbackByIdQuery(result.insertId);
};

module.exports = {
  addFeedbackQuery
};
