var express = require('express');
var router = express.Router();

const enrollAdminCtrler = require('../controllers/car/enrollAdmin');
const invokeCtrler = require('../controllers/car/invoke');
const queryCtrler = require('../controllers/car/query');
const registerCtrler = require('../controllers/car/registerUser');


router.get('/enrolladmin', async function (req, res) {
    try {
        // console.log("Enter enrolladmin");
        enrollAdminCtrler.enrollAdmin(req, res);
    } catch( error ) {
        console.log(error);
        res.send('Error');
    }
});

router.get('/invoke', async function (req, res) {
    try {
        // console.log("Enter invoke");
        invokeCtrler.invoke(req, res);
    } catch( error ) {
        console.log(error);
        res.send('Error');
    }
});

router.post('/registercar', async function (req, res) {
    try {
        // console.log("Enter invoke");
        invokeCtrler.registerCar(req, res);
    } catch( error ) {
        console.log(error);
        res.send('Error');
    }
});

router.post('/updatecar', async function (req, res) {
    try {
        // console.log("Enter update car");
        invokeCtrler.updateCar(req, res);
    } catch( error ) {
        console.log(error);
        res.send('Error');
    }
});

router.post('/changecarowner', async function (req, res) {
    try {
        // console.log("Enter update car");
        invokeCtrler.changeCarOwner(req, res);
    } catch( error ) {
        console.log(error);
        res.send('Error');
    }
});

router.get('/query', function (req, res) {
    try {
        // console.log("Enter query");
        queryCtrler.query(req, res);
    } catch( error ) {
        console.log(error);
        res.send('Error');
    }
});

router.get('/query/:id', function (req, res) {
    try {
        // console.log("Enter query", req.params.id);
        queryCtrler.query(req, res);
    } catch( error ) {
        console.log(error);
        res.send('Error');
    }
});

router.post('/registeruser', function (req, res) {
    try {
        // console.log("Enter registeruser", req.body);
        registerCtrler.registerUser(req, res);
    } catch( error ) {
        console.log(error);
        res.send('Error');
    }
});

module.exports = router;