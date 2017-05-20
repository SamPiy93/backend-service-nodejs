"use strict"
let con = require('./connection')

let latlong = con.connection.define('latlong_details_tables', {
    lat: {
        type: con.datatypes.DOUBLE,
        allowNull: false
    },
    lon: {
        type: con.datatypes.DOUBLE
    },
    location: {
        type: con.datatypes.STRING
    }
}, {
    getterMethods : {
        lat : function () {
            return this.lat
        },
        lon : function () {
            return this.lon
        },
        location : function () {
            return this.location
        }
    },
    setterMethods : {
        lat : function (value) {
            this.setDataValue('lat', value)
        },
        lon : function (value) {
            this.setDataValue('lon', value)
        },
        location : function (value) {
            this.setDataValue('location', value)
        }
    }
});

// exports.latlong_var = latlong

module.exports = {
    fetchAllLocations : function (req, res) {
        latlong.findAll().then(function(data){
            console.log()
            let arr = []
            for (let records in data){
                arr.push(data[records].dataValues)

            }
            res.json(arr)
        })
    },
    addLocations : function (req, res) {
        latlong.build({
            lat: req.params.lattitude,
            lon: req.params.longitude,
            location: req.params.loc
        }).save().then(function(response){
            console.log(response)
            res.redirect('/trippinceylon')
        })
    }
}