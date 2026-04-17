const MovieController = require("../controllers/movie.controller");
const MovieMiddlerWare = require("../middlewares/movies.middlewares")

const routes = (app) => {
 // routes function takes express app object as parameter
 app.post("/mba/api/v1/movies",MovieMiddlerWare.validateMovieCreateRequest, MovieController.createMovie);

 app.get("/mba/api/v1/movies/:id", MovieController.getMoive);

 app.delete("/mba/api/v1/movies/:id", MovieController.deleteMovie);

 app.put("/mba/api/v1/movies/:id", MovieController.updateMoive);
}
module.exports = routes
