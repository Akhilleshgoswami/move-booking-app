
const userController = require("../controllers/user.controller")
const authMiddelware = require("../middlewares/auth.middlewares")
const router = (app)=>{
 app.post("/mba/api/v1/auth/signup",authMiddelware.validateUserCreateRequest,userController.createUser)
 app.post("/mba/api/v1/auth/signin",userController.signIn)
}

module.exports = router
