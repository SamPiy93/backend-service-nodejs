"use strict"
let express = require('express')
let controller = require('./Controller')

let router = express.Router()


/*------------Routes----------------*/
router.route('/v1/auth/google').get(controller.googleAuth)
router.route('/v1/auth/google/callback').get(controller.googleCallback)
router.route('/v1/fetch/user').get(controller.getUserDetails)
router.route('/v1/login/:username/:password').post(controller.login)

module.exports = router