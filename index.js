const express = require("express")
const app = express()
const productRoutes = require('./route/product')
const authRoutes = require('./route/auth')
const loginRoutes = require('./route/auth')
const handleServerError = require("./middleware/handleServerError")
require('./config/database')
require('./middleware/handleServerError')
app.use(express.json())
app.use("/api/product", productRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/login", loginRoutes)
app.use(handleServerError)
app.use((err, req, res, next) => {
  res.status(500).send()
});



app.listen(8000, () => {
  console.log("server started.");
})