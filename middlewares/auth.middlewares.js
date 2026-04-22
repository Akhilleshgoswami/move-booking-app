const { badRequest } = require("../utils/responseBody");

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

module.exports = {
  validateUserCreateRequest
};
