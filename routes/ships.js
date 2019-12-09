var express = require('express');
var router = express.Router();

const database = require('../databaseMySQLPromises');

router.get('/:id?', function (req, res, next) {
    database.read("skibsdata", "MMSI_nummer", (req.params.id ? req.params.id : null))
        .then(value => res.send(value))
        .catch(reason => next(reason));
});

router.post('/', (req, res, next) => {
    console.log(req.body);

    database.create(req.body.navn, req.body.hjemhavn, req.body.kaldesignal, req.body.MMSI_nummer, req.body.anvendelse, req.body.BRT_BT, req.body.laengde, req.body.max_antal_om_bord)
        .then(value => res.redirect("/api/ships/" + value))
        .catch(reason => next(reason));
});

router.put('/:id', (req, res, next) => {
    console.log(req.body);

    database.update(req.body.navn, req.body.hjemhavn, req.body.kaldesignal, req.body.MMSI_nummer, req.body.anvendelse, req.body.BRT_BT, req.body.laengde, req.body.max_antal_om_bord)
        .then(value => res.redirect("/api/ships/" + req.params.id))
        .catch(reason => next(reason));
});

router.delete('/:id', (req, res, next) => {
    database.deleteSomething(req.params.id)
        .then(value => res.send(`Skibet med MMSI-nummer ${req.params.id} er slettet`))
        .catch(reason => next(reason));
});

module.exports = router;
