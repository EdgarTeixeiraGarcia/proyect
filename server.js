require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const {
    usersController,
} = require('./controllers');

const { HTTP_PORT } = process.env;

const app = express();

app.use(bodyParser.json());

// ENDPOINTS

// Users
app.get('/api/users', usersController.getUsers);


// ESCUCHAR UN PUERTO
app.listen(HTTP_PORT, () => console.log(`Listening at port ${HTTP_PORT}`));