require("dotenv").config()
const express = require("express");
var cors = require("cors")
const http = require("http");
const userRouter = require("./routes/user")
const categoryRouter = require("./routes/category")
const productRouter = require('./routes/product')
const billRouter = require("./routes/bill")

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/user', userRouter)
app.use('/category', categoryRouter)
app.use('/product', productRouter)
app.use('/bill', billRouter)

const server = http.createServer(app);
server.listen(process.env.PORT, () => {
    console.log('Server listening on port: ', process.env.PORT)
})