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

const getDocById = async(id)=>{
 
 try{
 const result = await Theater.findById(id);
 if(!result)return {
  err:"Not able to find the theater",
  code:404
 }
 return result
 }catch(error){

  console.log("error while fechting theater",error)
  errorResponseBody.error = error;
  return res.status(500).json(errorResponseBody)

 }

}
const deleteTheaterd = async(id) =>{
 try{
 const result = await Theater.deleteOne({_id:id});
 return result
 }catch(error){
  console.log("error while deleting theater",error)
  errorResponseBody.error = error;
  return res.status(500).json(errorResponseBody)

 }

}
 
const fetchTheater= async(filter) =>{
 let query  = {}
 if(filter.name){
  query.name = filter.name;
 }
 let theater = await Theater.find(query)
 if(!theater)return {
  err:"Not able to find the query theater",
  code:404
 }
 return theater
}
module.exports = {
createTheater,
getDocById,
 deleteTheaterd,fetchTheater
}
