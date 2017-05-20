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
    location_image: {
        type: con.datatypes.TEXT
    },
    location_name: {
        type: con.datatypes.STRING
    },
    location_district: {
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
        location_image : function () {
            return this.location_image
        },
        location_name : function () {
            return this.location_name
        },
        location_district : function () {
            return this.location_district
        }
    },
    setterMethods : {
        lat : function (value) {
            this.setDataValue('lat', value)
        },
        lon : function (value) {
            this.setDataValue('lon', value)
        },
        location_image : function (value) {
            this.setDataValue('location_image', value)
        },
        location_name : function (value) {
            this.setDataValue('location_name', value)
        },
        location_district : function (value) {
            this.setDataValue('location_district', value)
        }
    }
});
// latlong.sync({force:true,logging:console.log})
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
    fetchLocationById : function(req, res){
        latlong.findAll({
            where : {
                id : req.params.id,
                lat : req.params.lat,
                lon : req.params.lon 
            }
        }).then(function(data){
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
            location_image: req.params.loc_image,
            location_name: req.params.loc_name,
            location_district: req.params.loc_district,
        }).save().then(function(response){
            res.json(response.dataValues)
        })
    }
}