const Joi = require('joi');

const { database } = require('../infrastructure');

async function getAgencyManager(req, res) {
    
    try {

        const { id } = req.auth;

        const [ manager ] = await database.pool.query('SELECT * FROM managers WHERE id_user = ?', id);

        res.status(200);
        res.send(manager[0]);
    }
    
    
    
    catch (err) {
        res.status(err.httpCode || 500);
        res.send({ error: err.message});
    }
}

async function updateManager(req, res) {
    
    try {

        const {
           agency,
        } = req.body;

        const { id } = req.auth;

        const [ manager ] = await database.pool.query('SELECT * FROM managers WHERE id_user = ?', id);

        const updateUserQuery = `
        UPDATE managers 
        SET agency = ? WHERE id_user= ? `
        await database.pool.query(updateUserQuery, [agency, id])
        

        res.status(200);
        res.send(manager[0]);
    }
    
    
    
    catch (err) {
        res.status(err.httpCode || 500);
        res.send({ error: err.message});
    }
}

module.exports = {
   updateManager,
   getAgencyManager,
};