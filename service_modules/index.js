let express = require('express')
let app = express()
let routes = require('./routes.js')
let User = require('./User')

let Session = require('express-session');
let google = require('googleapis');
let OAuth2 = google.auth.OAuth2;
let plus = google.plus('v1');

const OAUTH2_CLIENT_ID = "449019875476-n054hpa8dgtpn1dg56b6rktlecvvbdh6.apps.googleusercontent.com"
const OAUTH2_CLIENT_SECRET = "uc6IM_OkmXInImJZxo9UWh-n"
const OAUTH2_CALLBACK = "http://localhost:3000/trippinceylon/v1/auth/google/callback"
const MEMCACHE_URL = "memcached-17225.c11.us-east-1-2.ec2.cloud.redislabs.com:17225"

app.use('/trippinceylon', routes)
app.use(Session({
	secret : OAUTH2_CLIENT_SECRET,
	resave : true,
	saveUninitialized : true
}))

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

app.use("/auth", function (req, res) {
	var url = getAuthURL();
	res.send(`
        <h1>Authentication using google oAuth</h1> <a href="https://accounts.google.com/o/oauth2/auth?access_type=offline&scope=https://www.googleapis.com/auth/plus.me&response_type=code&client_id=449019875476-n054hpa8dgtpn1dg56b6rktlecvvbdh6.apps.googleusercontent.com&redirect_uri=http://localhost:3000/trippinceylon/v1/auth/google/callback">Login</a>
    `)
});
app.use("/trippinceylon/v1/test", function (req, res) {
	console.log("login")
});
app.use("/trippinceylon/v1/auth/google/callback", function (req, res) {
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
});

/*------------server--------------*/
var server = app.listen(3000, function(){
	var host = server.address().address
	var port = server.address().port
	console.log("Server listening at http://%s:%s", host, port)
})