const {badRequest} = require("../utils/responseBody")
const validateTheaterCreateRequest = (req, res, next) => {
  const { name, description, city, pinCode, address } = req.body;

  if (!name || typeof name !== "string") {
    return badRequest(res, "Theater name is required and must be a string");
  }

  if (description && typeof description !== "string") {
    return badRequest(res, "Description must be a string");
  }

  if (!city || typeof city !== "string") {
    return badRequest(res, "City is required and must be a string");
  }

  if (!pinCode || typeof pinCode !== "number") {
    return badRequest(res, "PinCode is required and must be a number");
  }

  if (address && typeof address !== "string") {
    return badRequest(res, "Address must be a string");
  }

  next();
};

module.exports = {
validateTheaterCreateRequest
}
