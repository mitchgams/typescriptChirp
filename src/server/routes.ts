import * as express from 'express';
const chirpsStore = require('./chirpstore');

const router = express.Router();


router.get('/chirps/:id?', (req, res) => {
    let id = req.params.id;
    if(id) {
        res.json(chirpsStore.GetChirp(id))
    } else {
        res.json(chirpsStore.GetChirps());
    }
});

router.post('/chirps/', (req, res) => {
    chirpsStore.CreateChirp(req.body);
    res.sendStatus(200);
});

router.delete('/chirps/delete/:id?', (req, res) => {
    let id = req.params.id;
    if(id !== undefined) {
       chirpsStore.DeleteChirp(id);
       console.log(`Deleting Chirp id: ${id}`);
       res.sendStatus(200);
    }
});

router.put('/chirps/edit/:id?', (req, res) => {
    let id = req.params.id;
    if(id !== undefined) {
        chirpsStore.UpdateChirp(id, req.body);
        console.log(`Editing chirp id: ${id}`);
        res.sendStatus(200);
    }
});


export default router;