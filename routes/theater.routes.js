
const TheaterController = require("../controllers/theater.controller")
const router = (app)=>{
 app.post("/mba/api/v1/theater",TheaterController.create)
}

module.exports = router
