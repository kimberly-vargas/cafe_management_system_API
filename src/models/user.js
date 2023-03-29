const pool = require("../connection")

module.exports = class User {
    static createUser(name, contactNumber, email, password){
        return pool.query(
            "INSERT INTO user(name, contactNumber, email, password, status, role) values(?,?,?,?,'false','user')", 
            [name, contactNumber, email, password])
    }

    static getUser(email){
        return pool.query(
            "select * from user where email = ?", 
            [email]
            )
    }

    static getUserByPassword(email, oldPassword){
        return pool.query(
            "select * from user where email = ? and password = ?", 
            [email, oldPassword]
            )
    }

    static getAllUsers(){
        return pool.query("select * from user where role = 'user'")
    }

    static updateStatus(status, userid){
        return pool.query("update user set status = ? where id = ?", 
        [status, userid])
    }

    static updatePassword(newPassword, email){
        return pool.query("update user set password = ? where email = ?", 
        [newPassword, email])
    }
}