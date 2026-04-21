

const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
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
  minLength: 6
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
// before saving the user in db 
UserSchema.pre('save', async function(next) {
 //a trigger to encrypt a plain password in db before saving the user
 bcrypt.hash(password)
const hash  = await bcrypt.hash(this.password,10)
 this.password = hash
 next()
})
const User = mongoose.model("Users", UserSchema)
module.exports = User
