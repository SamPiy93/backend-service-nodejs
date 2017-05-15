"use strict"
let cors = require('cors')
let express = require('express')
let app = module.exports = express()
let routes = require('./routes.js')

app.use(cors())
app.use('/trippinceylon', routes)

/*------------server--------------*/
var server = app.listen(3000, function(){
	var host = server.address().address
	var port = server.address().port
	console.log("Server listening at http://%s:%s", host, port)
})