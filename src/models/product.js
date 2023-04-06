const pool = require('../connection')

module.exports = class Product{

    static createProduct(name, categoryId, description, price){
        return pool.query(
            "insert into product (name, categoryId, description, price, status) values (?,?,?,?,'true')",
            [name, categoryId, description, price]
        )
    }

    static getAllProducts(){
        return pool.query(
            "select p.id, p.name, p.description, p.price, p.status, c.id as categoryId, c.name as categoryName from product as p inner join category as c where p.categoryId = c.id"
        )
    }

    static getByCategory(categoryId){
        return pool.query(
            "select id, name from product where categoryId = ? and status = 'true'",
            [categoryId]
        )
    }

    static getById(productId){
        return pool.query(
            "select * from product where id = ?",
            [productId]
        )
    }

    static updateProduct(name, categoryId, description, price, productId){
        return pool.query(
            "update product set name = ?, categoryId = ?, description = ?, price = ? where id = ?",
            [name, categoryId, description, price, productId]
        )
    }

    static updateStatus(status, productId){
        return pool.query(
            "update product set status = ? where id = ?",
            [status, productId]
        )
    }

    static deleteProduct(productId){
        return pool.query(
            "delete from product where id = ?",
            [productId]
        )
    }
}