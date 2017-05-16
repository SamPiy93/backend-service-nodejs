"use strict"
let Sequelize = require('sequelize')
let DataTypes = require('sequelize/lib/data-types')
// let connection = new Sequelize('mysql://root:sameera@localhost/TEST_DB');

let connection = new Sequelize("TEST_DB", "root", "sameera", {
    host: "10.101.5.49",
    dialect: "mysql",
    logging: function () {},
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    dialectOptions: {
        socketPath: "/var/mysql/mysql.sock"
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

exports.latlong_var = latlong

// module.exports = {
//     fetchAllLocations : function (req, res) {
//         latlong.findAll({}).then(function (response) {
//            res.json(response)
//         });
//     }
// }

// let newRecord = latlong.build({
//     lat: 79.906340,
//     lon: 6.820257,
//     location: 'Colombo'
// });
// connection.sync()
// newRecord.save().then(function (err) {
//     console.log(err)
// })


//
// function getAllLocationDetails() {
//     latlong.findAll({limit:100}).then(function (data) {
//         console.log(data)
//     })
// }