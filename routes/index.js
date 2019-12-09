var express = require('express');
var router = express.Router();

const database = require('../databaseMySQLPromises');
const weatherModule = require('../weatherModule');
const path = require(`path`);

router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/table', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../views/ships.html'));
    // res.sendFile("ships.html", {root: "../views"});
});

router.get('/ships', async function (req, res, next) {
    let shipData = await database.read("skibsdata");
    let sensorData = await database.read("sensordata");

    res.render('table', {shipData: shipData, sensorData: sensorData});
});

router.get('/module', function (req, res, next) {
    res.render('module');
});

router.post('/module', async function (req, res, next) {
    let weatherJson = await weatherModule.getTemp(req.body.location);
    res.send(weatherJson);
});

router.post('/create', async function (req, res, next) {
    let val = await database.setupDatabase();
    res.send("Done");
});

module.exports = router;
