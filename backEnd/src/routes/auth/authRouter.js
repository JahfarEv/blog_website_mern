const express = require('express')
const userController = require('../../controllers/auth/userController')

const userRouter = express.Router();

userRouter.post('/signup',userController.signup)
.post('/login',userController.login)
.post('/verify-email',userController.verifyEmail)

module.exports = userRouter