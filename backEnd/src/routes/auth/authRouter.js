const express = require('express')
const userController = require('../../controllers/auth/userController')

const userRouter = express.Router();

userRouter.post('/signup',userController.register)
.post('/login',userController.login)

module.exports = userRouter