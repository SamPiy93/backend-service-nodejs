"use strict"
let express = require('express')
let controller = require('./Controller')
let latlong = require('./ORM/latLong')
let router = express.Router()


/*------------Routes----------------*/
router.route('/').get(function(req, res){
    res.send('TRIPPIN-CEYLON');
})
router.route('/v1/auth/google').get(controller.googleAuth)
router.route('/v1/auth/google/callback').get(controller.googleCallback)
router.route('/v1/fetch/user').get(controller.getUserDetails)

router.route('v1/auth/provider/:id').get(controller.getUserDetails)

// router.route('/v1/login/:username/:password').post(controller.login)
// router.route('/v1/fetch/locations').get(latlong.fetchAllLocations)
router.get('/v1/fetch/locations', latlong.fetchAllLocations)
router.get('/v1/add/locations/:lattitude/:longitude/:loc', latlong.addLocations)
module.exports = router