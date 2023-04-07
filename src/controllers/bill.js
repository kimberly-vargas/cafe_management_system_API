require("dotenv").config()
const ejs = require("ejs")
const pdf = require("html-pdf")
const path = require("path")
const fs = require("fs")
const uuid = require("uuid")
const Bill = require("../models/bill")

const generateReport = async(req, res) => {
    const generatedUuid = uuid.v1()
    const orderDetails = req.body
    const productDetailsReport = JSON.parse(orderDetails.productDetails)
    try {
        await Bill.createBill(orderDetails.name, generatedUuid, orderDetails.email, orderDetails.contactNumber, orderDetails.paymentMethod, orderDetails.totalAmount, orderDetails.productDetails, res.locals.email)
        ejs.renderFile(path.join(__dirname, '', 'report.ejs'), {
            productDetails: productDetailsReport,
            name: orderDetails.name,
            email: orderDetails.email,
            contactNumber: orderDetails.contactNumber,
            paymentMethod: orderDetails.paymentMethod,
            totalAmount: orderDetails.totalAmount
        }, (error, results) => {
            if (error){
                return res.status(500).json(error)
            } else {
                pdf.create(results).toFile('./generated_pdf/' + generatedUuid + '.pdf', (error, result) => {
                    if(error) {
                        return res.status(500).json(error)
                    }
                    return res.status(200).json({
                        uuid: generatedUuid
                    })
                })
            }
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getPdf = async(req, res) => {
    const orderDetails = req.body
    const pdfPath = './generated_pdf/' + orderDetails.uuid + '.pdf'
    if(fs.existsSync(pdfPath)) {
        res.contentType("application/pdf")
        fs.createReadStream(pdfPath).pipe(res)
    } else {
        const productDetailsReport = JSON.parse(orderDetails.productDetails)
        ejs.renderFile(path.join(__dirname, '', 'report.ejs'), {
            productDetails: productDetailsReport,
            name: orderDetails.name,
            email: orderDetails.email,
            contactNumber: orderDetails.contactNumber,
            paymentMethod: orderDetails.paymentMethod,
            totalAmount: orderDetails.totalAmount
        }, (error, results) => {
            if (error){
                return res.status(500).json(error)
            } else {
                pdf.create(results).toFile('./generated_pdf/' + orderDetails.uuid + '.pdf', (error, result) => {
                    if(error) {
                        return res.status(500).json(error)
                    }
                    res.contentType("application/pdf")
                    fs.createReadStream(pdfPath).pipe(res)
                })
            }
        })
    }
}

const getBills = async(req, res) => {
    try {
        const bills = await Bill.getBills()
        return res.status(200).json({
            message: bills[0]
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const deleteBill = async(req, res) => {
    const id = req.params.id
    try {
        const result = await Bill.deleteBill(id)
        if(result.affectedRows == 0) {
            return res.status(500).json({
                message: 'Bill id was not found'
            })
        }
        return res.status(200).json({
            message: 'Bill deleted succesfully'
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {
    generateReport,
    getPdf,
    getBills,
    deleteBill
}