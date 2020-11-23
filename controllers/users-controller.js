const Joi = require ('joi');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');

const { database } = require('../infrastructure');

// CREAMOS LA FUNCIÓN PARA OBTENER LOS USUARIOS DE LA BBDD

async function getUsers(req, res) {
    try {

        const [ users ] = await database.pool.query('SELECT * FROM users');
        res.send(users);

    } catch (err) {

        res.status(500);
        res.send({ error: err.message});
    }
};

// EXPORTAMOS LAS FUNCIONES

module.exports = {
    getUsers,
};