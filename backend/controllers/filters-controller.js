const { database } = require('../infrastructure');

async function filterByClub (req, res) {
    try {

        const { club_name } = req.body;

        const [ clubs ] = await database.pool.query('SELECT id FROM clubs WHERE club_name = ?', club_name);

        const [ players ] = await database.pool.query('SELECT * FROM players WHERE actual_team = ?', [clubs[0].id])

        const [ users ] = await database.pool.query('SELECT u.*, c.country FROM users u LEFT JOIN countries c ON u.country = c.id WHERE u.id = ?', [players[0].id_user])

        console.log(club_name)
 
        res.status(200);
        res.send(users);

    } catch (err) {

        res.status(500);
        res.send({ error: err.message})
    }
}

async function filterBySkill (req, res) {
    try {

        const { skill } = req.body;

        const [ skills ] = await database.pool.query('SELECT id FROM skills WHERE skill = ?', skill);

        const [ players ] = await database.pool.query('SELECT * FROM players_skills WHERE id_skill = ?', [skills[0].id])

        console.log(skill)
 
        res.status(200);
        res.send(players);

    } catch (err) {

        res.status(500);
        res.send({ error: err.message})
    }
}

async function filterByPosition (req, res) {
    try {

        const { position } = req.body;

        console.log(position)

        if (position === 'portero') {
            
            const [ players ] = await database.pool.query('SELECT * FROM players WHERE main_position = "portero"')

            res.status(200);
            res.send(players);
        } 

        if (position === 'defensa') {
            
            const [ players ] = await database.pool.query(`
            SELECT * 
            FROM players 
            WHERE main_position = "lateral_derecho" OR main_position = "defensa_central" OR main_position = "lateral_izquierdo"`)

            res.status(200);
            res.send(players);
        } 
        
        if (position === 'centrocampista') {
            
            const [ players ] = await database.pool.query(`
            SELECT * 
            FROM players 
            WHERE main_position = "centrocampista_defensivo" OR main_position = "medio_izquierdo" OR main_position = "medio_derecho" OR main_position = "centrocampista_ofensivo"`)

            res.status(200);
            res.send(players);
        } 
        
        if (position === 'delantero') {
            
            const [ players ] = await database.pool.query(`
            SELECT * 
            FROM players 
            WHERE main_position = "extremo_izquierdo" OR main_position = "extremo_derecho" OR main_position = "segundo_delantero" OR main_position = "delantero_centro"`)

            res.status(200);
            res.send(players);
        }  
 
        // res.status(200);
        // res.send(players);

    } catch (err) {

        res.status(500);
        res.send({ error: err.message})
    }
}


async function filterByAge(req, res) {
    try {

        const { age } = req.body;

        const [ ages ] = await database.pool.query('SELECT id FROM clubs WHERE club_name = ?', club_name);

        const [ players ] = await database.pool.query('SELECT * FROM players WHERE actual_team = ?', [clubs[0].id])

        console.log(club_name)
 
        res.status(200);
        res.send(players);

    } catch (err) {

        res.status(500);
        res.send({ error: err.message})
    }
}

module.exports = {
    filterByClub,
    filterBySkill,
    filterByPosition,
}