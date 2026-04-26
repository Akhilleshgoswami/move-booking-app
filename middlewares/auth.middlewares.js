const { getUserById } = require("../services/user.service");
const { ROLE } = require("../utils/constants");
const { badRequest, errorResponseBody } = require("../utils/responseBody");
const jwt = require("jsonwebtoken")
const validateUserCreateRequest = (req, res, next) => {
 const { name, email, password, userType, userStatus } = req.body;

 // name validation
 if (!name || typeof name !== "string" || name.trim().length === 0) {
  return badRequest(res, "Name is required and must be a valid string");
 }

 // email validation
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 if (!email || typeof email !== "string" || !emailRegex.test(email)) {
  return badRequest(res, "Valid email is required");
 }

 // password validation
 if (!password || typeof password !== "string" || password.length < 6) {
  return badRequest(res, "Password must be at least 6 characters long");
 }

 // userType validation (optional but controlled)
 const allowedUserTypes = ["CUSTOMER", "ADMIN"];
 if (userType && !allowedUserTypes.includes(userType)) {
  return badRequest(res, `userType must be one of ${allowedUserTypes.join(", ")}`);
 }

 // userStatus validation
 const allowedUserStatus = ["APPROVED", "PENDING", "REJECTED"];
 if (userStatus && !allowedUserStatus.includes(userStatus)) {
  return badRequest(res, `userStatus must be one of ${allowedUserStatus.join(", ")}`);
 }

 next();
};

const validateSignInRequest = (req, res, next) => {

 const { email, password } = req.body;
 // email validation
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 if (!email || typeof email !== "string" || !emailRegex.test(email)) {
  return badRequest(res, "Valid email is required");
 }

 // password validation
 if (!password || typeof password !== "string" || password.length < 6) {
  return badRequest(res, "Password must be at least 6 characters long");
 }
 next()

}
const isAuthenticated = async (req, res, next) => {
 try {


  const token = req.headers['x-access-token']
  if (!token) {
   errorResponseBody.error = "authenticated token is not provied"
   return res.status(403).json(errorResponseBody)
  }
  const result = jwt.verify(token, process.env.AUTH_KEY)
  if (!token) {
   errorResponseBody.error = "Token is not varifyed"
   return res.status(401).json(errorResponseBody)
  }
  const user = await getUserById(result.id)
  req.user = user.id
  next()
 } catch (error) {
  if (error.code == 404) {
   errorResponseBody.error = "User not found"
   return res.status(error.status).json(errorResponseBody);
  }
  console.log("eroor", error)
  errorResponseBody.error = error;
  return res.status(500).json(errorResponseBody);
 }
}
const isAdmin = async (req, res, next) => {
 const result = await getUserById(req.user)
 if (result && result.userType != ROLE.ADMIN) {
  errorResponseBody.error = "User is not admin can't procced with request"
  return res.status(401).json(errorResponseBody)
 }
 next()
}
const isClient = async (req, res, next) => {
 const result = await getUserById(req.user)
 if (result && result.userType != ROLE.CLIENT) {
  errorResponseBody.error = "User is not client  can't procced with request"
  return res.status(401).json(errorResponseBody)
 }
 next()
}
const isClientOrAdmin = async (req, res, next) => {
 const result = await getUserById(req.user)
 if (result && result.userType != ROLE.CLIENT || result.userType != ROLE.ADMIN) {
  errorResponseBody.error = "User is not client or admin  can't procced with request"
  return res.status(401).json(errorResponseBody)
 }
 next()
}
const canChangeStatus = async(req,res,next)=>{
const user = await getUserById(req.user)
 if(user.userType  == "")
}
module.exports = {
 validateUserCreateRequest, validateSignInRequest, isAuthenticated, isAdmin, isClient, isClientOrAdmin
};
