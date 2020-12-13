require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const {
    usersController,
    playersController,
    skillsController,
    countriesController,
    clubsController,
} = require('./controllers');

const { validateAuthorization } = require ('./middlewares');
// const { updateUser } = require('./controllers/users-controller');

const { HTTP_PORT } = process.env;

const app = express();

app.use(bodyParser.json());

// ENDPOINTS

// Users
app.get('/api/users', usersController.getUsers);
app.post('/api/users/register', usersController.register);
app.post('/api/users/login', usersController.login);
app.put('/api/user/update', validateAuthorization, usersController.updateUser)

// Players

app.put('/api/player/update', validateAuthorization, playersController.updatePlayer)
app.get('/api/playerskills',  validateAuthorization, playersController.insertPlayerSkill)

// Managers

// Skills
app.get('/api/skills', skillsController.getSkills)

// Countries
app.get('/api/countries', countriesController.getCountries)

// Clubs
app.get('/api/clubs', clubsController.getClubs)

// Multimedia Content

// ESCUCHAR UN PUERTO
app.listen(HTTP_PORT, () => console.log(`Listening at port ${HTTP_PORT}`));