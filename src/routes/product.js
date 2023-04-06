const express = require('express')
const router = express.Router()
const auth = require('../services/authentication')
const checkRole = require('../services/checkRole')
const {
    createProduct,
    getAllProducts,
    getByCategory,
    getById,
    updateProduct,
    deleteProduct,
    updateStatus
} = require('../controllers/product')

router.post('/create', auth.authenticateToken, checkRole.checkrole, createProduct)
router.get('/getAll', auth.authenticateToken, getAllProducts)
router.get('/getByCategory/:id', auth.authenticateToken, getByCategory)
router.get('/getById/:id', auth.authenticateToken, getById)
router.patch('/update', auth.authenticateToken, checkRole.checkrole, updateProduct)
router.patch('/updateStatus', auth.authenticateToken, checkRole.checkrole, updateStatus)
router.delete('/delete/:id', auth.authenticateToken, checkRole.checkrole, deleteProduct)

module.exports = router