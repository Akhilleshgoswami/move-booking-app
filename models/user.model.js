

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
UserSchema.pre('save', async function () {
  console.log("🔥 Pre-save triggered", this.password);
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
  console.log("✅ Hashed password", this.password);
});
/**
 * plainPassowrd - input password giving by user 
 */
UserSchema.methods.isValidPassword = async function (plainPassword) {
 console.log("plainPassword",plainPassword)
  return await bcrypt.compare(plainPassword, this.password);
};
const User = mongoose.model("Users", UserSchema)
module.exports = User
