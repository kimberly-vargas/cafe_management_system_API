const express = require("express")
const router = express.Router()
const auth = require("../services/authentication")
const {
    generateReport,
    getPdf,
    getBills,
    deleteBill
} = require("../controllers/bill")

router.post('/generateReport', auth.authenticateToken, generateReport)
router.post('/getPdf', auth.authenticateToken, getPdf)
router.get('/getBills', auth.authenticateToken, getBills)
router.delete('/delete/:id', auth.authenticateToken, deleteBill)

module.exports = router