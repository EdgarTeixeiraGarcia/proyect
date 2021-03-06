const { database } = require('../infrastructure');

async function filterByClub (req, res) {
    try {

        const club_name = req.query.club;

        const [ clubs ] = await database.pool.query('SELECT id FROM clubs WHERE club_name = ?', club_name);

        const [ players ] = await database.pool.query(`
        SELECT DISTINCT u.*,c.country,TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) as age 
        FROM users u 
        LEFT JOIN countries c ON u.country = c.id
        LEFT JOIN players p ON u.id = p.id_user
        LEFT JOIN clubs cb ON cb.id = p.actual_team
        LEFT JOIN players_skills ps ON p.id = ps.id_player
        LEFT JOIN skills s ON ps.id_skill = s.id
        WHERE cb.id = ?`, [clubs[0].id])

        // const [ users ] = await database.pool.query(`
        // SELECT DISTINCT u.*,c.country,TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) as age 
        // FROM users u 
        // LEFT JOIN countries c ON u.country = c.id
        // LEFT JOIN players p ON u.id = p.id_user
        // LEFT JOIN clubs cb ON cb.id = p.actual_team
        // LEFT JOIN players_skills ps ON p.id = ps.id_player
        // LEFT JOIN skills s ON ps.id_skill = s.id
        // WHERE u.id = ?`, [players.id_user])

        // const [players] = await database.pool.query(`
        // SELECT DISTINCT u.*,c.country,TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) as age 
        // FROM users u 
        // LEFT JOIN countries c ON u.country = c.id
        // LEFT JOIN players p ON u.id = p.id_user
        // LEFT JOIN clubs cb ON cb.id = p.actual_team
        // LEFT JOIN players_skills ps ON p.id = ps.id_player
        // LEFT JOIN skills s ON ps.id_skill = s.id
        // WHERE cb.club_name = ?`, club_name)

        res.status(200);
        res.send(players);

    } catch (err) {

        res.status(500);
        res.send({ error: err.message})
    }
}

async function filterBySkill (req, res) {
    try {

        const skill = req.query.skill;

        const [players] = await database.pool.query(`
        SELECT DISTINCT u.*,c.country,TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) as age 
        FROM users u 
        LEFT JOIN countries c ON u.country = c.id
        LEFT JOIN players p ON u.id = p.id_user
        LEFT JOIN players_skills ps ON p.id = ps.id_player
        LEFT JOIN skills s ON ps.id_skill = s.id
        WHERE skill = ?`, skill)

        // const [ skills ] = await database.pool.query('SELECT id FROM skills WHERE skill = ?', skill);

        // const [ players ] = await database.pool.query('SELECT id_user FROM players_skills WHERE id_skill = ?', [skills[0].id])

        // const [ users ] = await database.pool.query(`SELECT u.*, c.country 
        // FROM users u 
        // LEFT JOIN countries c ON u.country = c.id 
        // LEFT JOIN players p ON u.id = p.id_user WHERE u.id = ?`, [players[0].id_user])

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

        const  position  = req.query.position;

        console.log(position)

        if (position === 'Portero') {
            
            // const [ players ] = await database.pool.query('SELECT * FROM players WHERE main_position = "portero"')

            const [ players ] = await database.pool.query(`
            SELECT u.*,c.country,TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) as age 
            FROM users u 
            LEFT JOIN countries c ON u.country = c.id
            LEFT JOIN players p On u.id = p.id_user
            WHERE main_position = "portero"`)

            res.status(200);
            res.send(players);
        } 

        if (position === 'Defensa') {
            
            const [ players ] = await database.pool.query(`
            SELECT u.*,c.country,TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) as age 
            FROM users u 
            LEFT JOIN countries c ON u.country = c.id
            LEFT JOIN players p On u.id = p.id_user
            WHERE main_position = "Lateral derecho" OR main_position = "Defensa central" OR main_position = "Lateral izquierdo"`)

            res.status(200);
            res.send(players);
        } 
        
        if (position === 'Centrocampista') {
            
            const [ players ] = await database.pool.query(`
            SELECT u.*,c.country,TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) as age 
            FROM users u 
            LEFT JOIN countries c ON u.country = c.id
            LEFT JOIN players p On u.id = p.id_user
            WHERE main_position = "Centrocampista defensivo" OR main_position = "Medio izquierdo" OR main_position = "Medio derecho" OR main_position = "Centrocampista ofensivo"`)

            res.status(200);
            res.send(players);
        } 
        
        if (position === 'Delantero') {
            
            const [ players ] = await database.pool.query(`
            SELECT u.*,c.country,TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) as age 
            FROM users u 
            LEFT JOIN countries c ON u.country = c.id
            LEFT JOIN players p On u.id = p.id_user
            WHERE main_position = "Extremo izquierdo" OR main_position = "Extremo derecho" OR main_position = "Segundo delantero" OR main_position = "Delantero centro"`)

            res.status(200);
            res.send(players);
        }  
 

    } catch (err) {

        res.status(500);
        res.send({ error: err.message})
    }
}

async function filterByAge(req, res) {
    try {

        const  age = req.query.age;

        const [ players ] = await database.pool.query(`
        SELECT u.*,c.country,TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) as age 
        FROM users u 
        LEFT JOIN countries c ON u.country = c.id
        WHERE TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) = ?`, age)
 
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
    filterByAge,
}