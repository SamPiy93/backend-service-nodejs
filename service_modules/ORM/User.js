"use strict"
let con = require('./connection')
let fs = require('fs')

let user = con.connection.define('users', {
    // user_id: {
    //     type: con.datatypes.STRING,
    //     allowNull: false
    // },
    email: {
        type: con.datatypes.STRING
    },
    full_name: {
        type: con.datatypes.STRING
    },
    password: {
        type: con.datatypes.STRING
    },
    user_image: {
        type: con.datatypes.TEXT
    }
}, {
    getterMethods : {
        // user_id : function () {
        //     return this.user_id
        // },
        email : function () {
            return this.email
        },
        full_name : function () {
            return this.full_name
        },
        password : function () {
            return this.password
        },
        user_image : function () {
            return this.user_image
        }        
    },
    setterMethods : {
        // user_id : function (value) {
        //     this.setDataValue('user_id', value)
        // },
        email : function (value) {
            this.setDataValue('email', value)
        },
        full_name : function (value) {
            this.setDataValue('full_name', value)
        },
        password : function (value) {
            this.setDataValue('password', value)
        },
        user_image : function (value) {
            this.setDataValue('user_image', value)
        }
    }
});
// user.sync({force:true, logging:console.log});
// exports.latlong_var = latlong

module.exports = {
    login : function (req, res) {
        user.findAll({
            where : {
                email : req.body.email, 
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
            email: req.body.email,
            full_name: req.body.full_name,
            password: req.body.password,
            user_image: req.body.user_image
        }).save().then(function(response){
            res.json(response.dataValues)
        })
    },
    user : user
}