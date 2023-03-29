require('dotenv').config()
const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(!token){
        return res.sendStatus(401)
    }
    try {
        const response = jwt.verify(token, process.env.ACCESS_TOKEN)
        res.locals = response
        next()
    } catch (error) {
        return res.sendStatus(403)
    }
}

module.exports = {authenticateToken}