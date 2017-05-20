"use strict"
let con = require('./connection')

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
    image: {
        type: con.datatypes.BLOB
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
        image : function () {
            return this.image
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
        image : function (value) {
            this.setDataValue('image', value)
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
            password: req.body.password
        }).save().then(function(response){
            res.json(response.dataValues)
            // let arr = []
            // for (let records in response){
            //     arr.push(response[records].dataValues)
            // }
            // res.json(arr)
        })
    },
    user : user
}