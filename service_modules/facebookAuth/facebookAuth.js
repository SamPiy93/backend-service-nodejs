var passport = require('passport')
var FacebookStrategy = require('passport-facebook')

var express = require('express')
var router = express.Router()
var app = require('../index')

var User = require('../ORM/User')

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({  
    clientID        : "1494752173909362",
    clientSecret    : "28d07dac448ed4f72d95a344911818e0",
    callbackURL     : "http://localhost:3000/trippinceylon/v1/auth/facebook/callback",
    profileFields   : ['id', 'email', 'first_name', 'last_name'],
    enableProof     : false,
    passReqToCallBack: true
  },
  function(token, refreshToken, profile, done) {
    process.nextTick(function () {
        console.log(profile)
        User.user.findOrCreate({where : {
            user_id : profile.id,
            first_name : profile.name.givenName,
            last_name : profile.name.familyName,
            email : profile.emails[0].value
        }}).then(function(callback){
            return done(null, profile.id)
        })

        // User.user.findOne({ 'user_id' : profile.id }, function(err, user) {
        //     if (err){
        //         console.log("inside err");
        //         return done(err);
        //     }
        //     if (user) {
        //         console.log("inside user")
        //         return done(null, user); // user found, return that user
        //     } else {
        //         console.log("inside else")
        //         var newUser            = new User();

        //         newUser.user.user_id    = profile.id; // set the users facebook id                   
        //         // newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
        //         newUser.user.first_name  = profile.name.givenName; // look at the passport user profile to see how names are returned
        //         newUser.user.last_name = profile.name.familyName;
        //         newUser.user.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

        //         newUser.save(function(err) {
        //             if (err)
        //                 throw err;
        //             return done(null, newUser);
        //         });
        //     }

        // });
        console.log("inside")
        //Check whether the User exists or not using profile.id
        //Further DB code.
        return done(null, profile);
    });
  }));