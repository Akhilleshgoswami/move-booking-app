const TheaterService = require("../services/theater.service")
const {successResponseBody,errorResponseBody} = require("../utils/responseBody")
const create = async(req,res)=>{
 try {
  const result = await TheaterService.createTheater(req.body);
  successResponseBody.data = result;
  return res.status(201).json(successResponseBody)
 }catch(error){
  console.log("error while createing theater",error)
  errorResponseBody.error = error;
  return res.status(500).json(errorResponseBody)

 }
}
module.exports = {
 create
}
