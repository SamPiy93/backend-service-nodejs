"use strict"
let express = require('express')
var passport = require('passport')
let controller = require('./Controller')
let latlong = require('./ORM/latLong')
let user = require('./ORM/User')
let facebook = require('./facebookAuth/facebookAuth')
let router = express.Router()


/*------------Routes----------------*/
router.route('/').get(function(req, res){
    res.send('TRIPPIN-CEYLON');
})
router.route('/v1/auth/google').get(controller.googleAuth)
router.route('/v1/auth/google/callback').get(controller.googleCallback)
router.route('/v1/fetch/user').get(controller.getUserDetails)

router.route('v1/auth/provider/:id').get(controller.getUserDetails)

router.route('/v1/auth/local').post(user.login)
router.route('/v1/fetch/users').get(user.fetchAllUsers)
router.route('/v1/add/users').post(user.addUsers)

router.get('/v1/fetch/locations', latlong.fetchAllLocations)
router.get('/v1/add/locations/:lattitude/:longitude/:loc', latlong.addLocations)

router.get('/v1/auth/facebook', passport.authenticate('facebook', { scope: ['user_friends', 'manage_pages'] }))
// router.get('/v1/auth/facebook/callback', passport.authenticate('facebook', { successRedirect : '/v1', failureRedirect : '/v1/fetch/locations' }))
// router.get('/v1/auth/facebook/callback', facebook.facebookAuth)
router.get('/v1/auth/facebook/callback',
  passport.authenticate('facebook', { 
       successRedirect : '/trippinceylon/', 
       failureRedirect: 'https://www.facebook.com' 
  }),
  function(req, res) {
    res.redirect('/');
  }
);

module.exports = router