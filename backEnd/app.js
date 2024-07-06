const express = require('express')
const app = express()
const cors = require('cors')
const userRouter = require('./src/routes/authRouter')
const errorHandler = require('./src/middlewares/errorHandler')


app.use(cors())
app.use(express.json())

app.use("/api/user",userRouter)

app.use(errorHandler)

module.exports = app