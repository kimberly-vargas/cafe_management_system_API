const pool = require("../connection")

module.exports = class Bill {
    static createBill(name, uuid, email, contactNumber, paymentMethod, total, productDetails, createdBy) {
        return pool.query(
            "insert into bill (name, uuid, email, contactNumber, paymentMethod, total, productDetails, createdBy) values (?,?,?,?,?,?,?,?)",
            [name, uuid, email, contactNumber, paymentMethod, total, productDetails, createdBy]
        )
    }

    static getBills() {
        return pool.query("select * from bill order by id desc")
    }

    static deleteBill(billId) {
        return pool.query(
            "delete from bill where id = ?",
            [billId]
        )
    }
}