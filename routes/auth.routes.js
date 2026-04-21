
const userController = require("../controllers/user.controller")

const router = (app)=>{
 app.post("/mba/api/v1/auth/signup",userController.createUser)
}

module.exports = router
