const Theater = require("../models/theatre.model");
const TheaterService = require("../services/theater.service")
const {successResponseBody,errorResponseBody} = require("../utils/responseBody")
const create = async(req,res)=>{
 try {
  const result = await TheaterService.createTheater(req.body);
  if(result.err){
   errorResponseBody.error =  result.err
   errorResponseBody.message = "Validation failed on few parameters of the request body"
   return res.status(result.code).json(errorResponseBody)
  }
  successResponseBody.data = result;
  return res.status(201).json(successResponseBody)
 }catch(error){
  console.log("error while createing theater",error)
  errorResponseBody.error = error;
  return res.status(500).json(errorResponseBody)

 }
}
const getTheater = async(req,res)=>{
 try{
 const result = await TheaterService.getDocById(req.params.id);
 if(result.err){
   errorResponseBody.error =  result.err
   return res.status(result.code).json(errorResponseBody)
 }
  successResponseBody.data = result;
  return res.status(200).json(successResponseBody)
 }catch(error){
  errorResponseBody.error = error;
  return res.status(500).json(errorResponseBody)
 }
}

const deleteTheater = async(req,res)=>{
 try{
 const result = await TheaterService.deleteTheaterd(req.params.id);
  successResponseBody.data = result;
  return res.status(200).json(successResponseBody)
 }catch(error){
  errorResponseBody.error = error;
  return res.status(500).json(errorResponseBody)
 }
}

const fetchTheater= async(req,res) =>{
 try{
const result = await TheaterService.fetchTheater(req.query)
  if(result.err){
   errorResponseBody.error = result.err;
   return res.status(result.code).json(errorResponseBody);
  }
  successResponseBody.data = result;
  return res.status(200).json(successResponseBody);

 }catch(error){
  console.log("error",error)
  errorResponseBody.error = error
  return res.status(500).json(
   errorResponseBody
  )
 }
}
const updateMovies = async(req,res)=>{
 try{
const result =  await TheaterService.updateMoviesInTheaters(req.params.id,req.body.movieIds,req.body.insert)
if(result.err){
   errorResponseBody.error = result.err;
   return res.status(result.code).json(errorResponseBody);
  }
  successResponseBody.data = result;
  return res.status(200).json(successResponseBody);

 }catch(error){
  console.log("error",error)
  errorResponseBody.error = error
  return res.status(500).json(
   errorResponseBody
  )
 }
}

const fetchAllTheater = async(req,res) =>{
 try{
const result = await TheaterService.getAllTheaters(req.query)
  successResponseBody.data = result;
  return res.status(200).json(successResponseBody);

 }catch(error){
  errorResponseBody.error = error
  return res.status(500).json(
   errorResponseBody
  )
 }
}


const getMovies = async(req,res) =>{
 try{
 const result = await TheaterService.getMoviesInATheater(req.params.id)
 if(result.err){
   errorResponseBody.error =  result.err
   errorResponseBody.message = "Validation failed on few parameters of the request body"
   return res.status(result.code).json(errorResponseBody)
  }
  successResponseBody.data = result;
  return res.status(200).json(successResponseBody);

 }catch(error){
  errorResponseBody.error = error
  return res.status(500).json(
   errorResponseBody
  )
 }
}
module.exports = {
 create,
 getTheater,deleteTheater,fetchTheater,updateMovies,fetchAllTheater,getMovies
}
