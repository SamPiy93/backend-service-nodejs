"use strict"
let con = require('./connection')

let user = con.connection.define('users', {
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
    },
    username: {
        type: con.datatypes.STRING
    },
    password: {
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
        },
        username : function () {
            return this.username
        },
        password : function () {
            return this.password
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
        },
        username : function (value) {
            this.setDataValue('username', value)
        },
        password : function (value) {
            this.setDataValue('password', value)
        }
    }
});
// user.sync();
// exports.latlong_var = latlong

module.exports = {
    login : function (req, res) {
        user.findAll({
            where : {
                username : req.body.username, 
                password : req.body.password
            }
        }).then(function(data){
            let arr = []
            for (let records in data){
                arr.push(data[records].dataValues)
            }
            res.json(arr)
        })
    },
    fetchAllUsers : function (req, res) {
        user.findAll().then(function(data){
            let arr = []
            for (let records in data){
                arr.push(data[records].dataValues)
            }
            res.json(arr)
        })
    },
    addUsers : function (req, res) {
        user.build({
            user_id: req.body.user_id,
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            password: req.body.password
        }).save().then(function(response){
            console.log(response)
            res.redirect('/trippinceylon')
        })
    },
    user : user
}