const express = require('express');
const app = express();
const cors = require('cors');
const queryAsync = require('./src/Config/dbConnection');
const dbSetup = require('./src/utils/dbSetup');
const carRoutes = require('./src/Routes/carRoutes');
const tourRoutes = require('./src/Routes/tourRoutes')
const contactUsRoutes = require('./src/Routes/contactUsRoutes')
const adminRoutes = require('./src/Routes/adminRoutes')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Conncection Testing Hello Mic Testing same like 
(async () => {
  try {
    await queryAsync('SELECT 1'); //Query to check connection
    console.log('Connected to MySQL database!');
    await dbSetup.createDatabaseAndTables();
  } catch (err) {
    console.error('Error connecting to MySQL:', err);
  }
})();
//For Cars
app.use('/api/car', carRoutes);

//For Tours

app.use('/api/tour', tourRoutes)

//For Contact Us Form
app.use('/api/feedback',contactUsRoutes)

//For Admin
app.use('/api/admin',adminRoutes)

//Listening 
app.listen(process.env.PORT || 8888, () => {
  console.log(`Server is running on port ${process.env.PORT || 8888}`);
});
