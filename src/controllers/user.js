require('dotenv').config()
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const nodeMailer = require("nodemailer")

const createUser = async (req, res) => {
    const user = req.body
    try {
        const userObj = await User.getUser(user.email)
        if (userObj[0].length <= 0) {
            try {
                await User.createUser(user.name, user.contactNumber, user.email, user.password)
                res.status(400).json({
                    message: 'Succesfully registered'
                })
            } catch (error) {
                res.status(500).json(error)
            }
        } else {
            return res.status(400).json({
                message: 'Email already exists'
            })
        }
    } catch (error){
        return res.status(500).json(error)
    }
}

const loginUser = async (req, res) => {
    const user = req.body
    try {
        const userObj = await User.getUser(user.email)
        if (userObj[0].length <= 0 || userObj[0][0].password != user.password){
            return res.status(401).json({
                message: 'Incorrect username or password'
            })
        } else if (userObj[0][0].status == 'false'){
            return res.status(401).json({
                message: 'Wait for admin approval'
            })
        } else if (userObj[0][0].password == user.password){
            const response = {
                email: userObj[0][0].email,
                role: userObj[0][0].role
            }
            const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, {expiresIn: '4h'})
            return res.status(200).json({
                token: accessToken
            })
        } else {
            return res.status(400).json({
                message: 'Something went wrong. Please try again later'
            })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

const forgotPassword = async(req, res) => {
    const user = req.body
    try{
        const userObj = await User.getUser(user.email)
        if (userObj[0].length <= 0){
            return res.status(200).json({
                message: 'Password sent succesfully to your email'
            })
        } else {
            const mailOptions = {
                from: process.env.EMAIL,
                to: userObj[0][0].email,
                subject: 'Password by Cafe Management System',
                html: '<p><b>Your login details for Cafe Management System</b><br><b>Email: </b>'+userObj[0][0].email+'<br><b>Password: </b>'+userObj[0][0].password+'<br><a href="http://localhost:4200/">Click here to login</a></p>'
            }
            transporter.sendMail(mailOptions, (error, info) => {
                if(error){
                    console.log(error)
                } else {
                    console.log('Email sent: ' + info.response)
                }
            })
            return res.status(200).json({
                message: 'Password sent succesfully to your email'
            })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getAllUsers = async(req, res) => {
    try {
        const users = await User.getAllUsers()
        return res.status(200).json({
            message: users[0]
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const updateStatus = async (req, res) => {
    const user = req.body
    try {
        const result = await User.updateStatus(user.status, user.id)
        if (result.affectedRows == 0){
            return res.status(404).json({
                message: "User id does noy exists"
            })
        } 
        return res.status(200).json({
            message: "User status updated succesfully"
        })
    } catch (error) {
        return res.status(500).json(error)
    }

}

const checkToken = async(req, res) => {
    return res.status(200).json({
        message: "true"
    })
}

const changePassword = async(req, res) => {
    const user = req.body
    const email = res.locals.email
    try {
        const userObj = await User.getUserByPassword(email, user.oldPassword)
        if (userObj[0] <= 0){
            return res.status(400).json({
                message: "Incorrect old password"
            })
        } else if (userObj[0][0].password == user.oldPassword){
            try {
                await User.updatePassword(user.newPassword, email)
                return res.status(200).json({
                    message: "User password updated succesfully"
                })
            } catch (error) {
                return res.status(500).json(error)
            }
        } else{
            return res.status(400).json({
                message: "Something went wrong. Please try again later"
            })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {
    createUser, 
    loginUser, 
    forgotPassword, 
    getAllUsers, 
    updateStatus, 
    checkToken,
    changePassword
}