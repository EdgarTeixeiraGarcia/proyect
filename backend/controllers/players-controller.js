const Joi = require('joi');

const { database } = require('../infrastructure');



async function getTecnicalDataPlayer(req, res) {
    
    try {

        const { id } = req.auth;

        const [ player ] = await database.pool.query('SELECT * FROM players WHERE id_user = ?', id);

        if (!player || ! player.length) {
            const err = new Error('No existe el jugador');
            err.code = 404;
            throw err;
        }
        
        res.status(200);
        res.send(player[0]);
    }
    
    
    
    catch (err) {
        res.status(err.httpCode || 500);
        res.send({ error: err.message});
    }
}

async function updatePlayer(req, res) {
    
    try {

        const {
            height,
            dominant_leg,
            main_position,
            secundary_position,
            actual_team,
            property_of,

        } = req.body;

        console.log(height, dominant_leg, main_position, secundary_position, actual_team, property_of)

        const { id } = req.auth;

        const [ player ] = await database.pool.query('SELECT * FROM players WHERE id_user = ?', id);

        // const [ actual_team ] = await database.pool.query('SELECT id FROM clubs WHERE club_name = ?', actual_team);
        // const [ property_of ] = await database.pool.query('SELECT id FROM clubs WHERE club_name = ?', property_of);

        const updateUserQuery = `
        UPDATE players 
        SET height = ?, dominant_leg = ?, main_position = ?, secundary_position= ?, actual_team = ?, property_of = ? WHERE id_user= ? `
        await database.pool.query(updateUserQuery, [height, dominant_leg, main_position, secundary_position, actual_team, property_of, id])
        

        res.status(200);
        res.send(player[0]);
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

        console.log(skill)

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

async function updateActualClub (req, res) {
    try {

        const { id } = req.auth;
        const { club } = req.body;

        const [ player ] = await database.pool.query('SELECT id FROM players WHERE id_user = ?', id);

        if (!player || ! player.length) {
            const err = new Error('No existe el jugador');
            err.code = 404;
            throw err;
        }

        const [ clubs ] = await database.pool.query('SELECT id FROM clubs WHERE club_name = ?', club);

        console.log(player[0].id, clubs[0].id)

        await database.pool.query('UPDATE players SET actual_team = ? WHERE id = ?', [ clubs[0].id, player[0].id ])

        res.status(200);
        res.send();

    } catch (err) {
        res.status(err.httpCode || 500);
        res.send({ error: err.message});
    }
}


async function updatePropertyClub (req, res) {
    try {

        const { id } = req.auth;
        const { club } = req.body;

        const [ player ] = await database.pool.query('SELECT id FROM players WHERE id_user = ?', id);

        if (!player || ! player.length) {
            const err = new Error('No existe el jugador');
            err.code = 404;
            throw err;
        }

        const [ clubs ] = await database.pool.query('SELECT id FROM clubs WHERE club_name = ?', club);

        console.log(player[0].id, clubs[0].id)

        await database.pool.query('UPDATE players SET property_of = ? WHERE id = ?', [ clubs[0].id, player[0].id ])

        res.status(200);
        res.send();

    } catch (err) {
        res.status(err.httpCode || 500);
        res.send({ error: err.message});
    }
}

async function getMeSkills(req, res) {
    try {

        const { id } = req.auth;

        const [ player ] = await database.pool.query('SELECT id FROM players WHERE id_user = ?', id);

        if (!player || ! player.length) {
            const err = new Error('No existe el jugador');
            err.code = 404;
            throw err;
        }

        const [ skills ]  = await database.pool.query(`
        SELECT DISTINCT s.* 
        FROM players_skills ps
        JOIN skills s on s.id = ps.id_skill
        WHERE id_player = ?`, player[0].id)
        
        res.status(200);
        res.send(skills)


    }catch(err) {

        res.status(err.httpCode || 500);
        res.send({ error: err.message});
    }
}


module.exports = {
    updatePlayer,
    insertPlayerSkill,
    updateActualClub,
    updatePropertyClub,
    getTecnicalDataPlayer,
    getMeSkills,
}