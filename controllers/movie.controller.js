const { response } = require("express")
const Movie = require("../models/movie.model")
const MovieService = require("../services/movie.service")
/**
 * Controller Function to create new movie
 */
const errorResponseBody = {
 success: false,
 error: {},
 data: {},
 message: "Something went wrong"

}

const successResponseBody = {
 success: true,
 error: {},
 data: {},
 message: "Success"

}
const createMovie = async (req, res) => {
 try {
  const result = await Movie.create(req.body)
  res.status(201).json({
   success: true,
   error: {},
   data: result,
   message: "SuccessFully Created a new moive "
  })
 }
 catch (error) {
  console.log("Error while creating  moive ")
  return res.status(500).json({
   success: false,
   error: error,
   data: {},
   message: "Something went wrong"
  })
 }



}

const deleteMovie = async (req, res) => {
 try {
  const result = await Movie.deleteOne({_id:req.params.id})
  successResponseBody.data = result;
  successResponseBody.message = "successFully delete the movie"
  res.status(200).json(
   successResponseBody
  )
 }
 catch (error) {
  console.log("error",error)
  errorResponseBody.error = error
  return res.status(500).json(
   errorResponseBody
  )
 }
}
const getMoive = async (req, res) => {
 try {
  const result = await MovieService.getMovieById(req.params.id)
  if (result.err) {
   errorResponseBody.error = result.err
   return res.status(result.code).json(errorResponseBody)
  }
  successResponseBody.data = result;
  res.status(200).json(
   successResponseBody
  )
 }
 catch (error) {
  errorResponseBody.error = error
  return res.status(500).json(
   errorResponseBody
  )
 }
}

const updateMoive = async (req, res) => {
 try {
  const result = await MovieService.updateMovie(req.params.id,req.body)
  successResponseBody.data = result;
  successResponseBody.message = "successfully update the movie"
  res.status(200).json(
   successResponseBody
  )
 }
 catch (error) {
  errorResponseBody.error = error
  return res.status(500).json(
   errorResponseBody
  )
 }
}
const getMovies = async(req,res)=>{
 try{
const result = await MovieService.fetchMovies(req.query)
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
module.exports = { createMovie, getMoive,deleteMovie,updateMoive,getMovies }
