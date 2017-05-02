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

module.exports = {
    findOrCreate : function (profileId) {
        console.log(profileId)
        findUsers(profileId.googleId, connection, function (err, user) {
            console.log(err, user)
        })
    }
}

function findUsers(usercode, conn, callback) {
    conn.query('SELECT * FROM _USERS u WHERE u._google_id = "'+usercode+'"', function (err, rows) {
        if (!err){
            callback(null, rows)
        } else {
            callback(err, null)
        }
    })
}