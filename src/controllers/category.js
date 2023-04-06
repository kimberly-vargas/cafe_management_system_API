require('dotenv').config()
const Category = require('../models/category')

const createCategory = async(req, res) => {
    const category = req.body
    try {
        await Category.createCategory(category.name)
        return res.status(200).json({
            message: 'Category added successfully'
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getCategories = async(req, res) => {
    const category = req.body
    try {
        const categories = await Category.getCategories()
        return res.status(200).json({
            message: categories[0]
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const updateName = async(req, res) => {
    const product = req.body
    try {
        const result = await Category.updateName(product.name, product.id)
        if(result.affectedRows == 0){
            return res.status(404).json({
                message: "Category id does noy exists"
            })
        } 
        return res.status(200).json({
            message: "Category updated succesfully"
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {
    createCategory,
    getCategories,
    updateName
}