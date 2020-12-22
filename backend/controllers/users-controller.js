const Joi = require ('joi');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');

const { database } = require('../infrastructure');

// CREAMOS LA FUNCIÓN PARA OBTENER LOS USUARIOS DE LA BBDD

async function getUsers(req, res) {
    try {

        const [ users ] = await database.pool.query('SELECT * FROM users');
        res.send(users);

    } catch (err) {

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

        res.status(201);
        res.send();

    } catch (err) {
        res.status(err.code || 500);
        res.send({ error: err.message});
    }
};

// CREAMOS LA FUNCIÓN DE LOGIN

async function login(req, res) {
    try {

        const { email, password } = req.body;

        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        });

        await loginSchema.validateAsync({ email, password });

        const [ rows ] = await database.pool.query('SELECT * FROM users WHERE email = ?', email);

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

        res.send ( { token });

    } catch (err) {
        res.status(err.code || 500);
        res.send({ error: err.message});
    }
}

// CREAMOS LA FUNCION DE ACTUALIZAR USUARIO

async function updateUser(req, res) {
    
    try {

        const {
            name,
            last_name,
            nif,
            email,
            password,
            birthdate,
            phone,
            perfil_photo,
            rol
        } = req.body;

        const { id } = req.auth;

        const [ user ] = await database.pool.query('SELECT * FROM users WHERE id = ?', id);

        if (!user || ! user.length) {
            const err = new Error('No existe el usuario');
            err.code = 404;
            throw err;
        }

        const updateUserQuery = 'UPDATE users SET name = ? , last_name = ?, nif = ?, email = ?,password = ?, birthdate = ?, phone = ?, perfil_photo = ?, rol = ? WHERE id= ?'
        await database.pool.query(updateUserQuery, [name, last_name, nif, email, password, birthdate, phone, perfil_photo, rol, id])
        

        res.status(200);
        res.send();
    }
    
    
    
    catch (err) {
        res.status(err.httpCode || 500);
        res.send({ error: err.message});
    }
}

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

// EXPORTAMOS LAS FUNCIONES

module.exports = {
    getUsers,
    register,
    login,
    updateUser,
    deleteUser,
};