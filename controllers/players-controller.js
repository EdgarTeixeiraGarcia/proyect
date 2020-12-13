const Joi = require('joi');

const { database } = require('../infrastructure');


async function updatePlayer(req, res) {
    
    try {

        const {
            height,
            weight,
            dominant_leg,
            main_position,
            secundary_position,

        } = req.body;

        const { id } = req.auth;

        const [ player ] = await database.pool.query('SELECT * FROM players WHERE id_user = ?', id);

        if (!player || ! player.length) {
            const err = new Error('No existe el jugador');
            err.code = 404;
            throw err;
        }

        const updateUserQuery = 'UPDATE players SET height = ?, weight = ?, dominant_leg = ?, main_position = ?, secundary_position= ? WHERE id_user= ?'
        await database.pool.query(updateUserQuery, [height, weight, dominant_leg, main_position, secundary_position, id])
        

        res.status(200);
        res.send();
    }
    
    
    
    catch (err) {
        res.status(err.httpCode || 500);
        res.send({ error: err.message});
    }
}

async function insertPlayerSkill (req, res) {
    
    try {

        const { id } = req.auth;
        const { skill } = req.body;

        const [ player ] = await database.pool.query('SELECT id FROM players WHERE id_user = ?', id);

        if (!player || ! player.length) {
            const err = new Error('No existe el jugador');
            err.code = 404;
            throw err;
        }

        const [ skills ] = await database.pool.query('SELECT id FROM skills WHERE skill = ?', skill);

        console.log(player[0].id, skills[0].id)

        await database.pool.query('INSERT INTO players_skills (id_player, id_skill) VALUES ( ?, ? )', [player[0].id, skills[0].id] )

        res.status(200);
        res.send();
    }

    catch (err) {
        res.status(err.httpCode || 500);
        res.send({ error: err.message});
    }
}

module.exports = {
    updatePlayer,
    insertPlayerSkill,
}