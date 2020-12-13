const { database } = require('../infrastructure');

// CREAMOS LA FUNCION GETCOUNTRIES

async function getCountries (req, res) {
    try {

        const [ countries ] = await database.pool.query('SELECT * FROM countries');
        res.send(countries);

    }catch (err) {

        res.status(500);
        res.send({ error: err.message})
    }
}

module.exports = {
    getCountries,
}