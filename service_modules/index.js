let express = require('express')
let app = express()
let routes = require('./routes.js')
let passport = require('passport')
let googleStrategy = require('passport-google-oauth').OAuth2Strategy
let User = require('./User')

app.use('/trippinceylon', routes)

/*------------Google Auth----------*/

let OAUTH2_CLIENT_ID = "449019875476-n054hpa8dgtpn1dg56b6rktlecvvbdh6.apps.googleusercontent.com"
let OAUTH2_CLIENT_SECRET = "uc6IM_OkmXInImJZxo9UWh-n"
let OAUTH2_CALLBACK = "http://localhost:3000/trippinceylon/v1/auth/google/callback"
let MEMCACHE_URL = "memcached-17225.c11.us-east-1-2.ec2.cloud.redislabs.com:17225"

passport.use(new googleStrategy({
		clientID : OAUTH2_CLIENT_ID,
		clientSecret : OAUTH2_CLIENT_SECRET,
		callbackURL : OAUTH2_CALLBACK
	},
	function (accessToken, refreshToken, profile, done) {
		console.log(accessToken)
		User.findOrCreate({googleId: profile.id}), function (err, user) {
			return done(err, user)
		}
		// User.findOrCreate({ googleId: profile.id }, function (err, user) {
		// 	return done(err, user);
		// });
	}
))

app.get('/trippinceylon/v1/auth/google',
	passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

app.get('/trippinceylon/v1/auth/google/callback',
	passport.authenticate('google', { failureRedirect: '/' }),
	function(req, res) {
		res.redirect('/trippinceylon/vi/users');
	});
/*------------server--------------*/
var server = app.listen(3000, function(){
	var host = server.address().address
	var port = server.address().port
	console.log("Server listening at http://%s:%s", host, port)
})