
const TheaterController = require("../controllers/theater.controller")
const TheaterMiddlerWare = require("../middlewares/theater.middlewares")
const router = (app)=>{
 app.post("/mba/api/v1/theater",TheaterMiddlerWare.validateTheaterCreateRequest, TheaterController.create)
 app.get("/mba/api/v1/theater/:id",TheaterController.getTheater)
 app.delete("/mba/api/v1/theater/:id",TheaterController.deleteTheater)
 app.get("/mba/api/v1/theater",TheaterController.fetchTheater)
}

module.exports = router
