const errorResponseBody = {
 success: false,
 error: {},
 data: {},
 message: "Something went wrong"

}

const successResponseBody = {
 success: true,
 error: {},
 data: {},
 message: "Success"

}


const badRequest = (res, errorMessage) => {
  return res.status(400).json({
    success: false,
    error: errorMessage,
    data: {},
    message: "Malformed request | Bad Request"
  });
};
module.exports = {
badRequest,
 errorResponseBody,
 successResponseBody
}
