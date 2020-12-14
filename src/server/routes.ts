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
    if(!!id) {
       chirpsStore.DeleteChirp(id);
       res.status(200).send(`Chirp ${id} deleted succesfully`);
    }
});

router.put('/chirps/edit/:id?', (req, res) => {
    let id = req.params.id;
    if(!!id) {
        chirpsStore.UpdateChirp(id, req.body);
        res.status(200).send(`Chirp ${id} updated succesfully`);
    }
});


export default router;