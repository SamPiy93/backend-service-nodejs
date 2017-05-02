let passport = require('passport')
let googleStrategy = require('passport-google-oauth').OAuth2Strategy

let OAUTH2_CLIENT_ID = "449019875476-n054hpa8dgtpn1dg56b6rktlecvvbdh6.apps.googleusercontent.com"
let OAUTH2_CLIENT_SECRET = "uc6IM_OkmXInImJZxo9UWh-n"
let OAUTH2_CALLBACK = "http://localhost:8080/auth/google/callback"
let MEMCACHE_URL = "memcached-17225.c11.us-east-1-2.ec2.cloud.redislabs.com:17225"

passport.use(new googleStrategy({
        clientID : OAUTH2_CLIENT_ID,
        clientSecret : OAUTH2_CLIENT_SECRET,
        callbackUrl : OAUTH2_CALLBACK
    },
    function (accessToken, refreshToken, profile, done) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return done(err, user);
        });
    }
))

