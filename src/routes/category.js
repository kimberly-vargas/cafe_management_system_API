const express = require("express");
const auth = require("../services/authentication")
const checkrole = require("../services/checkRole")
const {
    createCategory,
    getCategories,
    updateName
} = require("../controllers/category")
const router = express.Router();

router.post('/createCategory', auth.authenticateToken, checkrole.checkrole, createCategory)
router.get('/getAllCategories', auth.authenticateToken, getCategories)
router.patch('/updateName', auth.authenticateToken, updateName)

module.exports = router;