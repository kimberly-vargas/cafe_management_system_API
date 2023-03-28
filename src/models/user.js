const pool = require("../connection")

module.exports = class User {
    static getUser(email){
        return pool.query(
            "select * from user where email = ?", 
            [email]
            )
    }

    static createUser(name, contactNumber, email, password){
        return pool.query(
            "INSERT INTO user(name, contactNumber, email, password, status, role) values(?,?,?,?,'false','user')", 
            [name, contactNumber, email, password])
    }
}