
const express = require("express")
const dotenv = require("dotenv")
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const MoiveRoutes = require("./routes/movie.routes")
const TheaterRouter = require("./routes/theater.routes")
const app = express()
dotenv.config()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
MoiveRoutes(app) //invoking movie
TheaterRouter(app) // invoking theater
app.listen(process.env.PORT, async () => {
 console.log("app runing on the port ", process.env.PORT)
 try {
  await mongoose.connect(process.env.DB_URL)
  console.log("connected to mongo db")
 } catch (error) {
  console.log("error while connecting db")
 }

})
