const mysql = require('mysql')
const co = require('co-mysql')
const conf = require('../config')

let conn = mysql.createPool({
    host: conf.DB_HOST,
    user: conf.DB_USER,
    password: conf.DB_PASS,
    database: conf.DN_NAME
})

let db = co(conn)

module.exports = db