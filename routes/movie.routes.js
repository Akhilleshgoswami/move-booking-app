const MovieController = require("../controllers/movie.controller");

const routes = (app) => {
 // routes function takes express app object as parameter
 app.post("/mba/api/v1/movies", MovieController.createMovie);

 app.get("/mba/api/v1/movies/:id", MovieController.getMoive);

 app.delete("/mba/api/v1/movies/:id", MovieController.deleteMovie);
}
module.exports = routes
