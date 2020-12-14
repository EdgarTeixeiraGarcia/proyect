const { database } = require('../infrastructure');

async function filterByClub (req, res) {
    try {

        const { club_name } = req.body;

        const [ clubs ] = await database.pool.query('SELECT id FROM clubs WHERE club_name = ?', club_name);

        const [ players ] = await database.pool.query('SELECT * FROM players WHERE actual_team = ?', [clubs[0].id])

        console.log(club_name)
 
        res.status(200);
        res.send(players);

    } catch (err) {

        res.status(500);
        res.send({ error: err.message})
    }
}

async function filterBySkill (req, res) {
    try {

        const { club_name } = req.body;

        const [ clubs ] = await database.pool.query('SELECT id FROM clubs WHERE club_name = ?', club_name);

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
}