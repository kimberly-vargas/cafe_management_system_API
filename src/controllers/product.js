require('dotenv')
const Product = require('../models/product')

const createProduct = async(req, res) => {
    const product = req.body
    try {
        await Product.createProduct(product.name, product.categoryId, product.description, product.price)
        return res.status(200).json({
            message: "Product added succesfully"
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getAllProducts = async(req, res) => {
    try {
        const products = await Product.getAllProducts()
        return res.status(200).json({
            message: products[0]
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getByCategory = async(req, res) => {
    const categoryId = req.params.id
    try {
        const products = await Product.getByCategory(categoryId)
        return res.status(200).json({
            message: products[0]
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getById = async(req, res) => {
    const productId = req.params.id
    try {
        const products = await Product.getById(productId)
        return res.status(200).json({
            message: products[0]
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const updateProduct = async(req, res) => {
    const product = req.body
    try {
        const results = await Product.updateProduct(product.name, product.categoryId, product.description, product.price, product.id)
        if (results[0].affectedRows == 0){
            return res.status(404).json({
                message: 'Product id was not found'
            })
        }
        return res.status(200).json({
            message: 'Product updated succesfully'
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const deleteProduct = async(req, res) => {
    const productId = req.params.id
    try {
        const results = await Product.deleteProduct(productId)
        if (results[0].affectedRows == 0){
            return res.status(404).json({
                message: 'Product id was not found'
            })
        }
        return res.status(200).json({
            message: 'Product deleted succesfully'
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const updateStatus = async(req, res) => {
    const { status, id } = req.body
    try {
        const results = await Product.updateStatus(status, id)
        if (results[0].affectedRows == 0){
            return res.status(404).json({
                message: 'Product id was not found'
            })
        }
        return res.status(200).json({
            message: 'Product status was updated succesfully'
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getByCategory,
    getById,
    updateProduct,
    deleteProduct,
    updateStatus
}