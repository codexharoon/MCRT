// index.js
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConnection = require('./utils/dbConnection');
const dbSetup = require('./utils/dbSetup');

app.use(cors());
app.use(bodyParser.json());

// Test MySQL connection
dbConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database!');
    // Check if the database and users table exist
    dbSetup.createDatabaseAndTables();
  }
});

app.get('/', (req, res) => {
  res.send('API is working!');
});

app.use((req, res, next) => {
  res.status(404).send('404: Page not found');
});

app.listen(process.env.PORT || 8888, () => {
  console.log(`Server is running on port ${process.env.PORT || 8888}`);
});
