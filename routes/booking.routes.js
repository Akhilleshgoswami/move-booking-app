
const authMiddlerware = require("../middlewares/auth.middlewares")
const bookingController = require("../controllers/booking.controller")
const bookingMiddlerware = require("../middlewares/booking.middlewares")
const routes = (app) => {
 app.post("/mba/api/v1/bookings", authMiddlerware.isAuthenticated, bookingMiddlerware.validateBookingRequest, bookingController.create)
 app.patch("/mba/api/v1/bookings/:id", authMiddlerware.isAuthenticated,bookingMiddlerware.canChangeStatus, bookingController.update)

}
module.exports = routes
