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

module.exports = {
    connection : connection,
    sequelize : Sequelize,
    datatypes : DataTypes
}