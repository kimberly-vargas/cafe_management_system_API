const pool = require('../connection')

module.exports = class Category {

    static createCategory(name){
        return pool.query(
            "insert into category (name) values (?)",
            [name]
        )
    }

    static getCategories(){
        return pool.query("select * from category order by name")
    }

    static updateName(name, id){
        return pool.query(
            "update category set name = ? where id = ?",
            [name, id]
        )
    }
}