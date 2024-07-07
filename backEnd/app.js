const express = require('express')
const app = express()
const cors = require('cors')
const userRouter = require('./src/routes/auth/authRouter')
const errorHandler = require('./src/middlewares/errorHandler')
const postRouter = require('./src/routes/post/postRouter')


app.use(cors())
app.use(express.json())

app.use("/api/user",userRouter)
app.use("/api/user",postRouter)

app.use(errorHandler)

module.exports = app