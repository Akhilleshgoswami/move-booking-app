const mongoose = require("mongoose");
const { errorResponseBody } = require("../utils/responseBody");
const { STATUS } = require("../utils/constants");
const userService = require("../services/user.service")
const validateBookingRequest = (req, res, next) => {
 const {
  theaterId,
  movieId,

  timing,
  noOfSeat,
  totalCost,
 } = req.body;

 console.log("req.body", req)
 // Validate theaterId
 if (!theaterId || !mongoose.Types.ObjectId.isValid(theaterId)) {
  errorResponseBody.error = "Valid theaterId is required";
  errorResponseBody.message = "Malformed request | Bad Request";

  return res
   .status(STATUS.BAD_REQUEST)
   .json(errorResponseBody);
 }

 // Validate movieId
 if (!movieId || !mongoose.Types.ObjectId.isValid(movieId)) {
  errorResponseBody.error = "Valid movieId is required";
  errorResponseBody.message = "Malformed request | Bad Request";

  return res
   .status(STATUS.BAD_REQUEST)
   .json(errorResponseBody);
 }

 // Validate userId
 if (!req.user || !mongoose.Types.ObjectId.isValid(req.hser)) {
  errorResponseBody.error = "Valid userId is required";
  errorResponseBody.message = "Malformed request | Bad Request";

  return res
   .status(STATUS.BAD_REQUEST)
   .json(errorResponseBody);
 }

 // Validate timing
 if (!timing || typeof timing !== "string") {
  errorResponseBody.error = "Timing is required and must be a string";
  errorResponseBody.message = "Malformed request | Bad Request";

  return res
   .status(STATUS.BAD_REQUEST)
   .json(errorResponseBody);
 }

 // Validate noOfSeat
 if (
  noOfSeat === undefined ||
  typeof noOfSeat !== "number" ||
  noOfSeat <= 0
 ) {
  errorResponseBody.error =
   "noOfSeat is required and must be greater than 0";
  errorResponseBody.message = "Malformed request | Bad Request";

  return res
   .status(STATUS.BAD_REQUEST)
   .json(errorResponseBody);
 }

 // Validate totalCost (optional)
 if (
  totalCost !== undefined &&
  (typeof totalCost !== "number" || totalCost < 0)
 ) {
  errorResponseBody.error =
   "totalCost must be a valid positive number";
  errorResponseBody.message = "Malformed request | Bad Request";

  return res
   .status(STATUS.BAD_REQUEST)
   .json(errorResponseBody);
 }
 next();
};
const canChangeStatus = async (req, res, next) => {

 const user = await userService.getUserById(req.user)
 if (user.userType == "CUSTOMER" && req.body.status && req.body.status != "CANCLED") {
  errorResponseBody.error = "You are allowed to change the booking status"
  return res.status(STATUS.UNAUTHORISED).json(errorResponseBody)
 }
 next()

}

module.exports = { validateBookingRequest, canChangeStatus };
