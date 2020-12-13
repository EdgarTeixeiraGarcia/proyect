const { database } = require('../infrastructure');

// CREAMOS LA FUNCION GETCLUBS

async function getClubs (req, res) {
    try {

        const [ clubs ] = await database.pool.query('SELECT * FROM clubs');
        res.send(clubs);

    }catch (err) {

        res.status(500);
        res.send({ error: err.message})
    }
}

module.exports = {
    getClubs,
}