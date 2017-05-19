"use strict"
let mysql = require('./ORM/latLong')
let Session = require('express-session');
let google = require('googleapis');
let OAuth2 = google.auth.OAuth2;
let plus = google.plus('v1');
let app = require('./index');

const OAUTH2_CLIENT_ID = "449019875476-n054hpa8dgtpn1dg56b6rktlecvvbdh6.apps.googleusercontent.com"
const OAUTH2_CLIENT_SECRET = "uc6IM_OkmXInImJZxo9UWh-n"
const OAUTH2_CALLBACK = "http://localhost:3000/trippinceylon/v1/auth/google/callback"
const MEMCACHE_URL = "memcached-17225.c11.us-east-1-2.ec2.cloud.redislabs.com:17225"

app.use(Session({
	secret : OAUTH2_CLIENT_SECRET,
	resave : true,
	saveUninitialized : true
}))


module.exports = {
    login : function (req, res) {
        // authenticate(connection, req, res, function (err, content) {
        //     if(err){
        //         console.log("Invalid user!")
        //         res.send(err)
        //     } else {
        //         console.log("User authenticated successfully!")
        //         res.send(content)
        //     }
        // })
    },
    googleAuth : function(req, res){
        var url = getAuthURL();
        res.redirect(url);
    },
    googleCallback : function (req, res){
        let oauth2Client = getOAuthClient()
        let session = req.session
        let authCode = req.query.code
        oauth2Client.getToken(authCode, function (err, tokens) {
            if (!err){
                oauth2Client.setCredentials(tokens)
                session["token"] = tokens
                res.send(session["token"])
            }else{
                res.send(err);
            }
        })
    },
    getUserDetails : function (req, res){
        var oauth2Client = getOAuthClient();
        oauth2Client.setCredentials(req.session["token"]);
        
        var p = new Promise(function (resolve, reject) {
            plus.people.get({ userId: 'me', auth: oauth2Client }, function(err, response) {
                resolve(response || err);
            });
        }).then(function (data) {
            res.send(data);
        })
    }
}




function getOAuthClient() {
	return new OAuth2(OAUTH2_CLIENT_ID, OAUTH2_CLIENT_SECRET, OAUTH2_CALLBACK)
}

function getAuthURL() {
	let oauth2Client = getOAuthClient()
	let scopes = [
		'https://www.googleapis.com/auth/plus.me'
	]
	let url = oauth2Client.generateAuthUrl({
		access_type : 'offline',
		scope : scopes
	})

	return url
}
function getUsers(connection, callback) {
    // connection.query('SELECT * FROM _USERS u WHERE u._username = "sameera"', function (err, rows) {
    //     if (!err){
    //         callback(null, rows)
    //     } else {
    //         callback(err, null)
    //     }
    // })
}

function authenticate(connection, req, res, callback) {
    // let username = mysql.escape(req.params.username)
    // let password = mysql.escape(req.params.password)
    //
    // connection.query('SELECT * FROM _USERS u WHERE u._username = '+username+' and u._pass = '+password, function (err, rows) {
    //     if (!err){
    //         if (rows != "") {
    //             callback(null, rows)
    //         } else {
    //             callback("{'error':'user invalid'}", null)
    //         }
    //     } else {
    //         callback(err, null)
    //     }
    // })
}






// googleCallback : function (req, res){
//         let oauth2Client = getOAuthClient()
//         let session = req.session
//         let authCode = req.query.code
//         oauth2Client.getToken(authCode, function (err, tokens) {
//             if (!err){
//                 oauth2Client.setCredentials(tokens)
//                 session["token"] = tokens
//                 res.send(session["token"])
//             }else{
//                 res.send(err);
//             }
//         })
//     },