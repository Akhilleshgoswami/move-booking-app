
const userService = require("../services/user.service");
const { successResponseBody, errorResponseBody } = require("../utils/responseBody");

const createUser = async(req,res)=>{
try{

  const user = await userService.createUser(req.body);
  successResponseBody.data = user;
  successResponseBody.message = "user create successfull"
  return res.status(201).json(successResponseBody)

 }catch(error){
errorResponseBody.error = error;
return res.status(500).json(errorResponseBody)
}
}
module.exports = { createUser }
