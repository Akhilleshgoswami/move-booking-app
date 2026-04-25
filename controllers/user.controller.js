
const userService = require("../services/user.service");
const { STATUS } = require("../utils/constants");
const { successResponseBody, errorResponseBody } = require("../utils/responseBody");
const jwt = require("jsonwebtoken")
const createUser = async (req, res) => {
 try {

  const user = await userService.createUser(req.body);
  successResponseBody.data = user;
  successResponseBody.message = "user create successfull"
  return res.status(STATUS.CREATED).json(successResponseBody)

 } catch (error) {
  errorResponseBody.error = error;
  return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
 }
}
const signIn = async (req, res) => {
 try {
  const user = await userService.getUserByEmail(req.body.email);
  const isValidPassowrd = await user.isValidPassword(req.body.password)
  if (!isValidPassowrd) {
   errorResponseBody.error = "Passowrd is not correct"
   return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
  }
  if (user.err) {
   errorResponseBody.error = user.err
   return res.status(user.status).json(errorResponseBody)
  }
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.AUTH_KEY, { expiresIn: "1 hour" })
  successResponseBody.data = {
   token: token,
   email: user.email,
   role: user.userType
  };

  successResponseBody.message = "user fetch successful";
  return res.status(STATUS.CREATED).json(successResponseBody)
 } catch (error) {
  console.log("eroor", error)

  errorResponseBody.error = error;
  return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
 }
}

const resetPassword = async (req, res) => {
 try {
  const user = await userService.getUserById(req.user)
  const isOldPasswordCorrect = await user.isValidPassword(req.body.oldPassword)
  if (!isOldPasswordCorrect) {
   throw { err: "Invalid old passowrd, Please write the correct password" }
  }
  user.password = req.body.newPassword
  await user.save()
  successResponseBody.data = {
   user,
   role: user.userType,
  }
  successResponseBody.message = "Password updated successfull"
  return res.status(STATUS.OK).json(successResponseBody)
 }
 catch (error) {

  console.log("eroor", error)
  errorResponseBody.error = error;
  return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
 }
}
const update = async (req, res) => {
 try {
  const result = await userService.updateUserRoleAndStatus(req.body, req.params.id)
  successResponseBody.data = result
  successResponseBody.message = "SuccessFully update the user"
  return res.status(STATUS.OK).json(successResponseBody)
 } catch (error) {

  console.log("eroor", error)
  errorResponseBody.error = error;
  return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)

 }
}


module.exports = { createUser, signIn, resetPassword, update }
