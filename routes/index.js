var express = require('express');
var router = express.Router();

const database = require('../databaseMySQLPromises');
const weatherModule = require('../weatherModule');
const path = require(`path`);

router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/table', function (req, res, next) {
    // res.sendFile("ships.html", {root: "../views"}); // Didn't work when app was deployed
    res.sendFile(path.join(__dirname, '../views/ships.html'));
});

router.get('/ships', async function (req, res, next) {
    try {
        let shipData = await database.read("skibsdata");
        let sensorData = await database.read("sensordata");
        res.render('table', {shipData: shipData, sensorData: sensorData});
    } catch (e) {
        next(e);
    }
});

router.get('/module', function (req, res, next) {
    res.render('module');
});

router.post('/module', async function (req, res, next) {
    let weatherJson = await weatherModule.getTemp(req.body.location);
    res.send(weatherJson);
});

router.post('/login', function (req, res, next) {
    let user = req.body.user;
    let pass = req.body.pass;
    res.send(`You have logged in. User: ${user}. Pass: ${pass}.`)
});

module.exports = router;
