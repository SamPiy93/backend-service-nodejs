"use strict"
let express = require('express')
let controller = require('./Controller')
let latlong = require('./ORM/latLong').latlong_var
let router = express.Router()


/*------------Routes----------------*/
router.route('/v1/auth/google').get(controller.googleAuth)
router.route('/v1/auth/google/callback').get(controller.googleCallback)
router.route('/v1/fetch/user').get(controller.getUserDetails)
// router.route('/v1/login/:username/:password').post(controller.login)
// router.route('/v1/fetch/locations').get(latlong.fetchAllLocations)
router.get('/v1/fetch/locations', function(req, res) {
    latlong.findAll({}).then(function(todos) {
        res.json(todos);
    });
});

module.exports = router