const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
require('dotenv').config();


app.use(cors());
app.use(bodyparser.json());


app.get('/', (req, res) => {
    res.send('API is working!');
});


app.use((req, res, next) => {
    res.status(404).send('404: Page not found');
});


app.listen(process.env.PORT || 8888, () => {
    console.log(`Server is running on port ${process.env.PORT || 8888}`);
});
