"use strict"
let con = require('./connection')

let facebookUser = con.connection.define('facebook_users', {
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
// user.sync();
// exports.latlong_var = latlong

module.exports = {
    fetchAllUsers : function (req, res) {
        facebookUser.findAll().then(function(data){
            let arr = []
            for (let records in data){
                arr.push(data[records].dataValues)
            }
            res.json(arr)
        })
    },
    addUsers : function (req, res) {

    },
    facebookUser : facebookUser
}