require("dotenv").config()
const mysql = require("mysql2")

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    connectionLimit:10
})

module.exports = pool.promise()