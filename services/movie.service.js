
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
module.exports = { getMovieById }
