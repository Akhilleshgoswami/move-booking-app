const Theater = require("../models/theatre.model")

const createTheater = async(data)=>{
 try{
 const result = await Theater.create(data);
 return result;
 }catch(error){
  console.log("error",error)
  throw error
 }
}

module.exports = {
createTheater
}
