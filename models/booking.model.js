
const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({

 theaterId:{
  type:mongoose.Schema.Types.ObjectId,
  required:true,
  ref:"Theater"
 },
 movieId:{
  type:mongoose.Schema.Types.ObjectId,
  required:true,
  ref:"Movie"
 },
 userId:{
  type:mongoose.Schema.Types.ObjectId,
  required:true,
  ref:"User"
},
 timing:{
  type:String,
  required:true,

 },
 noOfSeat:{
  type:Number,
  required:true
 },
 totalCost:{
  type:Number,
},
 status:{
  type:String,
  required:true,
  enum:{
   values:["IN_PROCESS","CANCLED","SUCCESSFULL"],
   message:"Invalid booking status"
  },
  default:"IN_PROCESS"
 }

},{timestamps:true})


const Booking = mongoose.model("Booking",bookingSchema)
module.exports = Booking
