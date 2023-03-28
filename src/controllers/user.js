const User = require("../models/user")

const createUser = async (req, res) => {
    let user = req.body
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

module.exports = {createUser}