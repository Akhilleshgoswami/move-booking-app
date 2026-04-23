
const userController = require("../controllers/user.controller")
const authMiddelware = require("../middlewares/auth.middlewares")
const router = (app) => {
 app.post("/mba/api/v1/auth/signup", authMiddelware.validateUserCreateRequest, userController.createUser)
 app.post("/mba/api/v1/auth/signin", authMiddelware.validateSignInRequest, userController.signIn)
 app.post("/mba/api/v1/auth/reset", authMiddelware.isAuthenticated, userController.resetPassword)
 app.post("/mba/api/v1/user/update/:id", authMiddelware.isAuthenticated, userController.update)
}

module.exports = router
