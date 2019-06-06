const mysql = require('mysql')
const co = require('co-mysql')

let conn = mysql.createPool({
    host: 'localhost',
    user: 'admin',
    password: 'root',
    database: 'node'
})
let db = co(conn)

module.exports = db