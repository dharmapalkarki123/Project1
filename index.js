const fileUpload=require('express-fileupload');

const express = require("express")
const app = express()
const productRoutes = require('./route/product')
const authRoutes = require('./route/auth')
const handleServerError = require("./middleware/handleServerError")
const orderRoutes =require("./route/order")
// const fs = require("fs")
// const path = require("path")
require('./config/database')
require('./middleware/handleServerError')
app.use(express.json())
 
app.use('/uploads', express.static('uploads'))

app.use(fileUpload()); //handles form-data
   
app.use("/api/product", productRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/order", orderRoutes)
app.use(handleServerError)
//fs.writeFileSync(path.join(path.resolve(),"custom.txt"),"our text")
//fs.unlinkSync(path.join(path.resolve(),"custom.txt"))
app.use((err, req, res, next) => {
  res.status(500).send()
});



app.listen(8000, () => {
  console.log("server started.");
})