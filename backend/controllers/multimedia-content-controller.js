const { database } = require('../infrastructure');


async function uploadVideo(req, res) {
    try {

        const { id } = req.auth;

        const {
          tittle,
          description,
          content,
        } = req.body;

        const type = 'video';

        const [ player ] = await database.pool.query('SELECT id FROM players WHERE id_user = ?', id);

        if (!player || ! player.length) {
            const err = new Error('No existe el usuario');
            err.code = 404;
            throw err;
        }

        const uploadVideo = 'INSERT INTO multimedia_contents (tittle, description, content, type, id_player) VALUES(?, ?, ?, ?, ?)';
        await database.pool.query(uploadVideo, [tittle, description, content, type, player[0].id]);

        const [ videoUploaded ] = await database.pool.query('SELECT * FROM multimedia_contents WHERE id_player = ?', player[0].id)

        res.status(200);
        res.send(videoUploaded[0])

    } catch(err) {

        res.status(err.httpCode || 500);
        res.send({ error: err.message});
    }
}

async function getMeVideos(req, res) {
    try {

        const { id } = req.auth;

        const [ player ] = await database.pool.query('SELECT id FROM players WHERE id_user = ?', id);

        if (!player || ! player.length) {
            const err = new Error('No existe el jugador');
            err.code = 404;
            throw err;
        }

        const [ videos ]  = await database.pool.query( 'SELECT * FROM multimedia_contents WHERE id_player = ?', player[0].id)
        
        res.status(200);
        res.send(videos)


    }catch(err) {

        res.status(err.httpCode || 500);
        res.send({ error: err.message});
    }
}

async function getPlayerVideosById(req, res) {
    try {

        const { playerId } = req.params;

        const [ player ] = await database.pool.query('SELECT id FROM players WHERE id_user = ?', playerId);

        if (!player || ! player.length) {
            const err = new Error('No existe el jugador');
            err.code = 404;
            throw err;
        }

        console.log(playerId,player[0].id)

        const [ videos ]  = await database.pool.query( 'SELECT * FROM multimedia_contents WHERE id_player = ?', player[0].id)
        
        res.status(200);
        res.send(videos)

    } catch(err) {

        res.status(err.httpCode || 500);
        res.send({ error: err.message});
    }
};

module.exports = {
    getPlayerVideosById,
    uploadVideo,
    getMeVideos,
};