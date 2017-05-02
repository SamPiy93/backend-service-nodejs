let mysql = require('mysql')


let connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'sameera',
    database : 'TEST_DB'
})

connection.connect(function (err) {
    if (err){
        console.log("MySql not connected!")
        return
    } else {
        console.log("Database Connection Established Successfully!")
    }
})

function closeConnection(connection) {
    connection.end(function (err) {
        if (err){
            console.log("Cannot close the connection")
            return
        } else{
            console.log("Connection closed successfully!")
        }
    })
}

module.exports = {
    home : function(req, res){
        console.log("Server running")
        res.send("Server is up!")
    },
    users : function (req, res) {
        getUsers(connection, function (err, content) {
            if (err){
                console.log("error occurred in response :",err)
                res.send(err)
            } else {
                console.log("response sent!", content)
                res.send(content)
            }
        })
        console.log("Details retrieved successfully!")
    },
    login : function (req, res) {
        authenticate(connection, req, res, function (err, content) {
            if(err){
                console.log("Invalid user!")
                res.send(err)
            } else {
                console.log("User authenticated successfully!")
                res.send(content)
            }
        })
    }
}

function getUsers(connection, callback) {
    connection.query('SELECT * FROM _USERS u WHERE u._username = "sameera"', function (err, rows) {
        if (!err){
            callback(null, rows)
        } else {
            callback(err, null)
        }
    })
}

function authenticate(connection, req, res, callback) {
    username = mysql.escape(req.params.username)
    password = mysql.escape(req.params.password)

    connection.query('SELECT * FROM _USERS u WHERE u._username = '+username+' and u._pass = '+password, function (err, rows) {
        if (!err){
            if (rows != "") {
                callback(null, rows)
            } else {
                callback("{'error':'user invalid'}", null)
            }
        } else {
            callback(err, null)
        }
    })
}