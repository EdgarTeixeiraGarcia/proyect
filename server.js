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
app.post('/api/users/register', usersController.register);
app.post('/api/users/login', usersController.login);

// Players

// Managers

// Multimedia Content


// ESCUCHAR UN PUERTO
app.listen(HTTP_PORT, () => console.log(`Listening at port ${HTTP_PORT}`));