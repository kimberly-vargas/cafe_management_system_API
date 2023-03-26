require("dotenv").config()
const mysql = require("mysql2")

const connection = mysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

dbConnection = () => {
    connection.connect((err) => {
        if(!err){
            console.log("DB connection established")
        } else {
            console.log(err)
        }
    })
}


module.exports = dbConnection