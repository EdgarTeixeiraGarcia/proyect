const { database } = require('../infrastructure');

async function filterByClub (req, res) {
    try {

        const club = req.query;

        const [ players ] = await database.pool.query('SELECT * FROM players WHERE actual_team = (SELECT id FROM clubs WHERE club_name = ?)', club);

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