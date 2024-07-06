const dotenv = require('dotenv')
const path = require('path')
const mongoose = require('mongoose')
dotenv.config({path:path.join(__dirname,'../../.env')})

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.CON_DB,{dbName:'blog'})
        console.log('connection successfull');
    } catch (error) {
        console.log(error);
    }
}
module.exports = connectDB