const { database } = require('../infrastructure');

// CREAMOS LA FUNCION GETSKILLS

async function getSkills (req, res) {
    try {

        const [ skills ] = await database.pool.query('SELECT * FROM skills');
        res.send(skills);

    }catch (err) {

        res.status(500);
        res.send({ error: err.message})
    }
}

module.exports = {
    getSkills,
}