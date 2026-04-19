
const TheaterController = require("../controllers/theater.controller")
const TheaterMiddlerWare = require("../middlewares/theater.middlewares")
const router = (app)=>{
 app.post("/mba/api/v1/theater",TheaterMiddlerWare.validateTheaterCreateRequest, TheaterController.create)
 app.get("/mba/api/v1/theater/:id",TheaterController.getTheater)
 app.delete("/mba/api/v1/theater/:id",TheaterController.deleteTheater)
 app.put("/mba/api/v1/theater/:id/movies",TheaterController.updateMovies)
 app.get("/mba/api/v1/theater/:id/movies",TheaterController.getMovies)
 app.get("/mba/api/v1/theater",TheaterController.fetchAllTheater)
}

module.exports = router
