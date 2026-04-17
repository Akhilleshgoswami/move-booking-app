
const mongoose = require('mongoose')

/**
 * Define the schema of movie resource to be stored in the db 
 *
 */
const movieSchema = new mongoose.Schema({

 name: {
  type: String,
  required: true,
  unique: true,
 },
 description: {
  type: String,
  required: true
 },
 casts: {
  type: [String],
  required: true
 },
 trailerUrl: {
  type: String,
  required: true,
 },
 langage: {
  type: String,
  required: true,
  default: "English"
 },
 releaseDate: {
  type: String,
  required: true
 },
 director: {
  type: String,
  required: true
 },
 releaseStatus: {
  type: String,
  required: true,
  default: "RELEASED"
 }
}, { timestamps: true })

const movie = mongoose.model("Movie", movieSchema)// create a new model
module.exports = movie // returning model
