const Joi = require('joi');
const sgMail = require('@sendgrid/mail');

const { database } = require('../infrastructure');

async function getAgencyManager(req, res) {
    
    try {

        const { id } = req.auth;

        const [ manager ] = await database.pool.query('SELECT * FROM managers WHERE id_user = ?', id);

        res.status(200);
        res.send(manager[0]);
    }
    
    
    
    catch (err) {
        res.status(err.httpCode || 500);
        res.send({ error: err.message});
    }
}

async function updateManager(req, res) {
    
    try {

        const {
           agency,
        } = req.body;

        const { id } = req.auth;

        const [ manager ] = await database.pool.query('SELECT * FROM managers WHERE id_user = ?', id);

        const updateUserQuery = `
        UPDATE managers 
        SET agency = ? WHERE id_user= ? `
        await database.pool.query(updateUserQuery, [agency, id])
        

        res.status(200);
        res.send(manager[0]);
    }
    
    
    
    catch (err) {
        res.status(err.httpCode || 500);
        res.send({ error: err.message});
    }
}

async function contractManager(req, res) {
    
    try {

        const { id } = req.auth;
        const {
            id_player
        } = req.body;

        console.log(id, id_player)

        const [ managerId ] = await database.pool.query('SELECT * FROM managers WHERE id_user = ?', id);
        //recuperar datos de jugador comom usuario
        const [ playerId ] = await database.pool.query('SELECT * FROM players WHERE id_user = ?', id_player);

        const [ manager ] = await database.pool.query('SELECT * FROM users WHERE id = ?', managerId[0].id);

        const [ player ] = await database.pool.query('SELECT * FROM users WHERE id = ?', playerId[0].id);
        

        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
          to: player[0].email, // Change to your recipient
          from: 'edgar_wiman5@hotmail.com', // Change to your verified sender
          subject: 'Oferta de Contratacion',
          text: 'Hola, buenos dias',
          html: `<strong>Nuestro manager ${manager[0].name} con email: ${manager[0].email}
          se ha fijado en usted y se pondrá en contacto con usted al email que nos ha facilitado en la 
          web de Golden Boy para enviarle una oferta de contrato.
          
          Un saludo.</strong>`,
        }
        sgMail
          .send(msg)
          .then(() => {
            console.log('Email sent')
          })
          .catch((error) => {
            console.error(error)
          })

        res.status(200);
        res.send();
    }

    
    
    
    
    catch (err) {
        res.status(err.httpCode || 500);
        res.send({ error: err.message});
    }
}

module.exports = {
   updateManager,
   getAgencyManager,
   contractManager,
};