

const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({

 name: {
  type: String,
  required: true,
  unique: true
 },
 email: {
  type: String,
  unique: true,
  required: true,
  lowercase: true,
  trim: true
 },
 password: {
  type: String,
  required: true,
  minLength:6 
 },

 userType: {
  type: String,
  required: true,
  default: "CUSTOMER"
 },

 userStatus: {
  type: String,
  required: true,
  default: "APPORVED"
 },
}, { timestamps: true })

const User = mongoose.model("Users", UserSchema)
module.exports = User
