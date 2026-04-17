
const Movie = require("../models/movie.model")

const getMovieById = async (id) => {

 const movie = await Movie.findById({ _id: id });
 if (!movie) {
  return {
   code: 404,
   err: "No movie found for the corresponding id"
  }
 }
 return movie
}
const updateMovie = async(id,data)=>{
 const updateData =  await Movie.findByIdAndUpdate(id,data,{new:true})
 return updateData
}
const fetchMovies = async(filter) =>{
 let query  = {}
 if(filter.name){
  query.name = filter.name;
 }
 let movies = await Movie.find(query)
 if(!movies)return {
  err:"Not able to find the query movies",
  code:404
 }
 return movies
}
module.exports = { updateMovie,getMovieById,fetchMovies }
