"use strict"
let Sequelize = require('sequelize')
let DataTypes = require('sequelize/lib/data-types')

let connection = new Sequelize("test_db", "root", "sameera", {
    host: "localhost",
    dialect: "mysql",
    logging: function () {},
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    dialectOptions: {
        socketPath: "/var/run/mysqld/mysqld.sock"
        // socketPath: "/var/mysql/mysql.sock"
    },
    define: {
        paranoid: true
    }
});

let latlong = connection.define('latlong_details_tables', {
    lat: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    lon: {
        type: DataTypes.DOUBLE
    },
    location: {
        type: DataTypes.STRING
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