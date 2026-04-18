
const TheaterController = require("../controllers/theater.controller")
const TheaterMiddlerWare = require("../middlewares/theater.middlewares")
const router = (app)=>{
 app.post("/mba/api/v1/theater",TheaterMiddlerWare.validateTheaterCreateRequest, TheaterController.create)
}

module.exports = router
