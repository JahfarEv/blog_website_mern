const dotenv = require('dotenv')
dotenv.config({path:'.src/config/.env'})
const connectDB = require('./src/config/connectDB')
const app = require('./app')

connectDB()

const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})