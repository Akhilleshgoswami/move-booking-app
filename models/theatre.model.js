
const mongoose = require("mongoose")
/**
 * Define the schema of the theater resource to be stored in the db
 */
const TheaterSchema = new mongoose.Schema({

 name:{
  type:String,
  required:true
 },
 description:String,
 city:{
  type:String,
  required:true,
 }
,
 pinCode:{
 type:Number,
 required:true
},
 address:String
},{timestamps:true})


const Theater = mongoose.model("Theater",TheaterSchema)

module.exports = Theater

