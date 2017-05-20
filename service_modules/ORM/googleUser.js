"use strict"
let Session = require('express-session');
let google = require('googleapis');
let OAuth2 = google.auth.OAuth2;
let plus = google.plus('v1');
let app = require('../index');

let con = require('./connection')

const OAUTH2_CLIENT_ID = "449019875476-n054hpa8dgtpn1dg56b6rktlecvvbdh6.apps.googleusercontent.com"
const OAUTH2_CLIENT_SECRET = "uc6IM_OkmXInImJZxo9UWh-n"
const OAUTH2_CALLBACK = "http://localhost:3000/trippinceylon/v1/auth/google/callback"
const MEMCACHE_URL = "memcached-17225.c11.us-east-1-2.ec2.cloud.redislabs.com:17225"

app.use(Session({
	secret : OAUTH2_CLIENT_SECRET,
	resave : true,
	saveUninitialized : true
}))


let googleUser = con.connection.define('google_users', {
    user_id: {
        type: con.datatypes.STRING,
        allowNull: false
    },
    email: {
        type: con.datatypes.STRING
    },
    first_name: {
        type: con.datatypes.STRING
    },
    last_name: {
        type: con.datatypes.STRING
    }
}, {
    getterMethods : {
        user_id : function () {
            return this.user_id
        },
        email : function () {
            return this.email
        },
        first_name : function () {
            return this.first_name
        },
        last_name : function () {
            return this.last_name
        }        
    },
    setterMethods : {
        user_id : function (value) {
            this.setDataValue('user_id', value)
        },
        email : function (value) {
            this.setDataValue('email', value)
        },
        first_name : function (value) {
            this.setDataValue('first_name', value)
        },
        last_name : function (value) {
            this.setDataValue('last_name', value)
        }
    }
});

module.exports = {    
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
    },
    googleUser : googleUser
}

// googleUser.sync();

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