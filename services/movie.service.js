
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
module.exports = { updateMovie,getMovieById }
