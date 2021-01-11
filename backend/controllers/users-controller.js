const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const sgMail = require('@sendgrid/mail');

const { database } = require('../infrastructure');

// CREAMOS LA FUNCIÓN PARA OBTENER LOS USUARIOS DE LA BBDD

// async function sendEmail ({ email, title, content}) {

//     sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
//     try {

//         sgMail.send({
//             to: email,
//             from: 'edgar_wiman5@hotmail.com',
//             subject: title,
//             text: content,
//             html: `<div>
//                 <h1>Bienvenido a Nombre pagina</h1>
//                 <p>${content}</p>
//             </div>`
//         });

//     } catch(err) {
        
//         res.status(500);
//         res.send({ error: err.message});
//     }
    
// }

async function getUsers(req, res) {
    try {

        const [ users ] = await database.pool.query('SELECT * FROM users');
        res.send(users);

    } catch (err) {

        res.status(500);
        res.send({ error: err.message});
    }
};


async function getMe(req, res) {
    try {

        const { id } = req.auth;

        const [ me ] = await database.pool.query('SELECT * FROM users where id = ?', id);

        if (!me || ! me.length) {
            const err = new Error('No existe el usuario');
            err.code = 404;
            throw err;
        }

        // sendEmail({
        //     email: 'edgar_wiman5@hotmail.com',
        //     title: 'Bienvenido a Nombre de la pagina',
        //     content: 'Gracias por confiar en nosotros'
        // });

        res.send(me);

    } catch (err) {
        console.log(err)
        res.status(500);
        res.send({ error: err.message});
    }
};

// CREAMOS LA FUNCION PARA REGISTRARNOS EN LA PAGINA

async function register(req, res) {
    try {

        const { 
            name,
            last_name,
            nif,
            email,
            birthdate,
            password,
            repeatedPassword,
            rol,
            country,
        } = req.body;

        const registerSchema = Joi.object ({
            name: Joi.string().required(),
            last_name: Joi.string().required(),
            nif: Joi.string().required().max(20),
            email: Joi.string().email().required(),
            birthdate: Joi.date().required(),
            password: Joi.string().min(6).required(),
            repeatedPassword: Joi.string().min(6).required(),
            rol: Joi.string().required(),
            country: Joi.string().required(),
        });

        // console.log(name,last_name,nif,email,birthdate,password,repeatedPassword,rol);
        await registerSchema.validateAsync(req.body);

        if (password !== repeatedPassword) {
            const err = new Error('Las contraseñas no coinciden');
            err.code = 400;
            throw err;
        }

        const queryEmail = 'SELECT * FROM users WHERE email = ?';
        const [ usersEmail ] = await database.pool.query(queryEmail, email);

        if (usersEmail.length){
            const err = new Error('Ya existe un usuario con ese email');
            err.code = 409;
            throw err;
        }

        const queryNIF = 'SELECT * FROM users WHERE nif = ?';
        const [ usersNIF ] = await database.pool.query(queryNIF, nif);

        if (usersNIF.length){
            const err = new Error('Ya existe un usuario con ese NIF');
            err.code = 409;
            throw err;
        }

        // if (rol !=='player' || rol !== 'manager') {
        //     const err = new Error('El rol elegido no es correcto');
        //     err.code = 400;
        //     throw err;
        // }

        const passwordHash = await bcrypt.hash(password, 10);
        const insertQuery = 'INSERT INTO users (name, last_name, nif, email, password, birthdate, rol) VALUES (?, ?, ?, ?, ?, ?, ?)';

        await database.pool.query(insertQuery, [name, last_name, nif, email, passwordHash, birthdate, rol]);

        const  [ userId ] = await database.pool.query( 'SELECT id FROM users WHERE email = ?', email);

        await database.pool.query('UPDATE users SET country = ? WHERE id = ?', [ country, userId[0].id ] )

        if(rol === 'player') {

            const selectNewPlayerId = 'SELECT id FROM users WHERE email = ?';
            
            const playerId  = await database.pool.query(selectNewPlayerId, email);

            if (!playerId.length){
                err = new Error (' No existe el usuario con ese email')
                err.code = 400
                throw err
            }

            const id = playerId[0][0].id

            const insertPlayer = 'INSERT INTO players (id_user) VALUES (?)';
            await database.pool.query(insertPlayer,id)

            // console.log(playerId[0][0].id);
            
        }

        if(rol === 'manager') {

            const selectNewManagerId = 'SELECT id FROM users WHERE email = ?';
            
            const managerId  = await database.pool.query(selectNewManagerId, email);

            if (!managerId.length){
                err = new Error (' No existe el usuario con ese email')
                err.code = 400
                throw err
            }

            const id = managerId[0][0].id

            const insertManager = 'INSERT INTO managers (id_user) VALUES (?)';
            await database.pool.query(insertManager,id)

            // console.log(managerId[0][0].id);
            
        }

        const [ user ] = await database.pool.query('SELECT u.*,c.country FROM users u JOIN countries c ON u.country = c.id WHERE u.email = ?', email)

        // sendEmail({
        //     email: email,
        //     title: 'Bienvenido a Nombre de la pagina',
        //     content: 'Gracias por confiar en nosotros'
        // });

        const tokenPayload = { id: user.id, rol: user.rol};

        const token = jwt.sign(
            tokenPayload,
            process.env.JWT_SECRET,
            { expiresIn: '14d'},
        );

        res.status(201);
        res.send ({ 
            token,
            user: { ...user[0]}
         });

    } catch (err) {
        res.status(err.code || 500);
        res.send({ error: err.message});
    }
};

// CREAMOS LA FUNCIÓN DE LOGIN

async function login(req, res) {
    try {

        console.log('Hubo un intento de login')

        const { email, password } = req.body;

        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        });

        await loginSchema.validateAsync({ email, password });

        // const [ rows ] = await database.pool.query('SELECT u.*,c.country FROM users u JOIN countries c ON u.country = c.id WHERE u.email = ?', email);

        const [ rows ] = await database.pool.query(`
        SELECT u.*,c.country,TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) as age 
        FROM users u JOIN countries c ON u.country = c.id 
        WHERE u.email = ?`, email);

        if (!rows || ! rows.length) {
            const err = new Error('No existe un usuario con ese email');
            err.code = 404;
            throw err;
        }

        const user = rows [0];

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            const err = new Error('La contraseña no es correcta');
            err.code = 401;
            throw err;
        }

        // CREAMOS EL TOKEN

        const tokenPayload = { id: user.id, rol: user.rol};

        const token = jwt.sign(
            tokenPayload,
            process.env.JWT_SECRET,
            { expiresIn: '14d'},
        );


        res.send ({ 
            token,
            user: { ...user}
         });
        

    } catch (err) {
        res.status(err.code || 500);
        res.send({ error: err.message});
    }
}

// CREAMOS LA FUNCION DE ACTUALIZAR USUARIO

async function updateUser(req, res) {
    
    try {

        const {
            phone,
            perfil_photo,
        } = req.body;

        const { id } = req.auth;

        const [ user ] = await database.pool.query('SELECT * FROM users WHERE id = ?', id);

        if (!user || ! user.length) {
            const err = new Error('No existe el usuario');
            err.code = 404;
            throw err;
        }

        const updateUserQuery = 'UPDATE users SET phone = ?, perfil_photo = ? WHERE id= ?'
        await database.pool.query(updateUserQuery, [phone, perfil_photo, id])

        const [ userUpdated ] =  await database.pool.query('SELECT * FROM users WHERE id = ?', id)
        
        // if (req.file) {
        //     fs.writeFileSync(path.join('uploads', 'user-' + id + '.jpg'), req.file.buffer)
        //     user.perfil_photo = 'http://localhost:8080/static/user' + id + '.jpg'
        // }

        res.status(200);
        res.send(userUpdated[0]);
    }
    
    
    
    catch (err) {
        res.status(err.httpCode || 500);
        res.send({ error: err.message});
    }
}

async function insertCountry (req, res) {
    try {

        const { id } = req.auth;
        const { country } = req.body;

        const [ user ] = await database.pool.query('SELECT * FROM users WHERE id = ?', id);

        if (!user || ! user.length) {
            const err = new Error('No existe el usuario');
            err.code = 404;
            throw err;
        }

        const [ countryId ] = await database.pool.query('SELECT id FROM countries WHERE country = ?', country);

        await database.pool.query('UPDATE users SET country = ? WHERE id = ?', [ countryId[0].id, user[0].id ])

        const [ usuario ] = await database.pool.query('SELECT u.*,c.country FROM users u JOIN countries c ON u.country = c.id WHERE u.id = ?', id)

        res.status(200);
        res.send(usuario);

    } catch (err) {
        res.status(err.httpCode || 500);
        res.send({ error: err.message });
    }
}

// CREAMOS LA FUNCIÓN BORRAR USUARIO

async function deleteUser(req, res) {

    try {

        const { id } = req.auth;

        const [ user ] = await database.pool.query('SELECT * FROM users WHERE id = ?', id);

        if (!user || ! user.length) {
            const err = new Error('No existe el usuario');
            err.code = 404;
            throw err;
        }

        const deleteQuery = 'DELETE FROM users WHERE id = ?';
        await database.pool.query(deleteQuery, id);

        res.status(200);
        res.send('Usuario eliminado correctamente')

    } catch(err) {

        res.status(err.httpCode || 500);
        res.send({ error: err.message});
    }
}

// CREAMOS LA FUNCION PARA OBTENER LOS DATOS DEL USUARIO

async function getUserData (req, res) {
    try {
        
        const { userId } = req.params;

        const [ userClub ] = await database.pool.query(`
        SELECT u.*,c.country,cl_actual.club_name,cl_propiedad.club_name
        FROM users u 
        LEFT JOIN countries c ON u.country = c.id 
        JOIN players p ON u.id = p.id_user
        LEFT JOIN clubs cl_actual ON cl_actual.id = p.actual_team
        LEFT JOIN clubs cl_propiedad ON cl_propiedad.id = p.property_of
        WHERE u.id = ? `, userId);

        const [ userSkills ] = await database.pool.query(`
        SELECT u.*,s.skill
        FROM users u 
        JOIN players p ON u.id = p.id_user
        JOIN players_skills ps ON p.id = ps.id_player
        JOIN skills s ON s.id = ps.id_skill
        WHERE u.id = ?;`, userId)

        const [ userMultimedia ] = await database.pool.query(`
        SELECT u.*,mc.*
        FROM users u 
        JOIN players p ON u.id = p.id_user
        JOIN multimedia_contents mc ON p.id = mc.id_player
        WHERE u.id = ?;`, userId)

        res.status(200);
        res.send(userMultimedia);

    }catch(err) {

        res.status(err.httpCode || 500);
        res.send({ error: err.message});
    }
}

// EXPORTAMOS LAS FUNCIONES

module.exports = {
    getUsers,
    getMe,
    register,
    login,
    updateUser,
    deleteUser,
    insertCountry,
    getUserData,
};