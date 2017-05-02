let express = require('express')
let controller = require('./Controller')

let router = express.Router()


/*------------Routes----------------*/

router.route('/').get(controller.home)

router.route('/v1/users').get(controller.users)

router.route('/v1/login/:username/:password').post(controller.login)

module.exports = router