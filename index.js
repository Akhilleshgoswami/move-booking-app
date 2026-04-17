
const express = require("express")
const dotenv = require("dotenv")
const bodyParser = require('body-parser')
const app = express()

const mongoose = require("mongoose")
dotenv.config()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.get("/home", (req, res) => {


 return res.json({ "success": true })
})
app.listen(process.env.PORT, async () => {
 console.log("app runing on the port ", process.env.PORT)
 try {
  await mongoose.connect(process.env.DB_URL)
  console.log("connected to mongo db")
 } catch (error) {
  console.log("error while connecting db")
 }

})
