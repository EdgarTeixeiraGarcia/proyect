require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const {
    usersController,
    playersController,
    skillsController,
    countriesController,
    clubsController,
    multimediaController,
    managersController,
} = require('./controllers');

const { validateAuthorization } = require ('./middlewares');
const filtersController = require('./controllers/filters-controller');
const { valid } = require('joi');
// const { updateUser } = require('./controllers/users-controller');

const upload = multer()

const { HTTP_PORT } = process.env;

const app = express();

app.use('/static', express.static('uploads'));
app.use(cors());
app.use(bodyParser.json());

// ENDPOINTS

// Users
app.get('/api/users', usersController.getUsers);
app.get('/api/users/me', validateAuthorization, usersController.getMe);
app.post('/api/users/register', usersController.register);
app.post('/api/users/login', usersController.login);
// app.put('/api/user/update', validateAuthorization, usersController.updateUser);
app.put('/api/users/insertCountry', validateAuthorization, usersController.insertCountry)
app.put('/api/user/update', validateAuthorization, upload.single('image'), usersController.updateUser);
app.delete('/api/users/delete', validateAuthorization, usersController.deleteUser);
app.get('/api/users/playerProfile', usersController.getUserData);

// Players

app.get('/api/player/tecnicalData', validateAuthorization, playersController.getTecnicalDataPlayer)
app.put('/api/player/update', validateAuthorization, playersController.updatePlayer)
app.put('/api/player/updateActualClub', validateAuthorization, playersController.updateActualClub)
app.put('/api/player/updatePropertyClub', validateAuthorization, playersController.updatePropertyClub)
app.get('/api/player/meSkills', validateAuthorization, playersController.getMeSkills)

// Managers

app.get('/api/manager/agency', validateAuthorization, managersController.getAgencyManager)
app.put('/api/manager/update', validateAuthorization, managersController.updateManager)
app.post('/api/manager/contract', validateAuthorization, managersController.contractManager)

// Skills
app.get('/api/skills', skillsController.getSkills)
app.post('/api/player/insertskill', validateAuthorization, playersController.insertPlayerSkill)

// Countries
app.get('/api/countries', countriesController.getCountries)

// Clubs
app.get('/api/clubs', clubsController.getClubs)

// Multimedia Content
app.get('/api/multimedia/meVideos', validateAuthorization, multimediaController.getMeVideos)
app.get('/api/multimedia/videos/:playerId', multimediaController.getPlayerVideosById)
app.put('/api/videos/upload', validateAuthorization, multimediaController.uploadVideo)

// Filtros
app.get('/api/players/filterByClub', filtersController.filterByClub)
app.get('/api/players/filterBySkill', filtersController.filterBySkill)
app.get('/api/players/filterByPosition', filtersController.filterByPosition)
app.get('/api/players/filterByAge', filtersController.filterByAge)

//Ficheros estáticos de la carpeta uploads
app.use('/static', express.static('uploads'))


// ESCUCHAR UN PUERTO
app.listen(HTTP_PORT, () => console.log(`Listening at port ${HTTP_PORT}`));