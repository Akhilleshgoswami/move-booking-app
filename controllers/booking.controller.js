
const { errorResponseBody, successResponseBody } = require("../utils/responseBody");
const bookingService = require("../services/booking.service");
const { STATUS } = require("../utils/constants");
const create = async (req, res) => {
 try {
  let userId = req.user;
  const result = await bookingService.createBooking({ ...req.body, userId: userId });
  successResponseBody.message = "successfully create boooking"
  successResponseBody.data = result;
  return res.status(STATUS.CREATED).json(successResponseBody)
 } catch (error) {
  errorResponseBody.error = error
  return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
 }
}
const update = async (req, res) => {
 try {
  const result = await bookingService.updateBooking(req.body, req.params.id)
  successResponseBody.data = result;
  successResponseBody.message = "successfully update the movies"
  return res.status(STATUS.OK).json(successResponseBody)
 } catch (error) {
  if (error.err) {
   errorResponseBody.error = error.err
   return res.status(error.code).json(errorResponseBody)
  }
  errorResponseBody.error = error
  return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
 }
}
module.exports = { create, update }
