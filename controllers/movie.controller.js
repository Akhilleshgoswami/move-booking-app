const Moive = require("../models/movie.model")
/**
 * Controller Function to create new movie
 */
const createMovie = async (req, res) => {
 try {
  const result = await Moive.create(req.body)
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
module.exports = { createMovie }
