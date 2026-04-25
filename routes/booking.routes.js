
const authMiddlerware = require("../middlewares/auth.middlewares")
const bookingController = require("../controllers/booking.controller")
const bookingMiddlerware = require("../middlewares/booking.middlewares")
const routes = (app) =>
{
 app.post("/mba/api/v1/bookings",authMiddlerware.isAuthenticated,bookingMiddlerware.validateBookingRequest, bookingController.create)
}
module.exports = routes
