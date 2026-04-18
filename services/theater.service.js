const Theater = require("../models/theatre.model")

const createTheater = async(data)=>{
 try{
 const result = await Theater.create(data);
 return result;
 }catch(error){
  if(error.name == 'ValidationError'){

   let err = {}
   Object.keys(error.errors).forEach((key)=>{
    err[key] = error.errors[key].message;
   })

   return {err:err,code:422}
  }
  console.log("error",error)
  throw error
 }
}

module.exports = {
createTheater
}
