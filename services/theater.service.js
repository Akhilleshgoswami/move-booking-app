const Theater = require("../models/theatre.model")
const Movie = require("../models/movie.model")
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

const updateMoviesInTheaters =async (theaterId,movieIds,insert) =>{
 const theater = await Theater.findById(theaterId)
  if(!theater){
   return {
    err:"No such theater found with the giving Theater Id",
    code : 404
   }
  }
if(insert){
   movieIds.forEach((movieId)=>{
   if(!theater.movies.some(ids => ids !== movieId)){
   theater.movies.push(movieId);
   }
  })
 }
 else {
  const updatedMovies = movieIds.filter(id =>
  !theater.movies.includes(id)
);
  theater.movies = updatedMovies;    
 }
 await theater.save();
 return theater
  
}
const getAllTheaters = async (data)=>{
 try{
  let query = {};
  let pagination = {}
  if(data && data.city){
   query.city = data.city
  }
  if( data && data.pincode){
   query.pinCode = data.pincode;
  }
  if(data && data.movieId){
  const movie = await Movie.findById(data.movieId); 
   query.movies = {$all:movie}

  }
  if(data && data.limit){
   pagination.limit = data.limit
  }
  if(data && data.skip){
   const perPage = (data.limit) ? data.limit : 5
   pagination.skip = data.skip * perPage
  }
  const result = await Theater.find(query,{},pagination);
  return result
 }catch(error){
  console.log("error",error);
  throw error

 }
}
module.exports = {
createTheater,
getDocById,
 deleteTheaterd,fetchTheater,updateMoviesInTheaters,getAllTheaters
}
