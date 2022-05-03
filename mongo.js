const mongoose = require('mongoose')
require('dotenv').config()
const mongoPath = "mongodb+srv://Zero:UIyJVkUJk4E7hozM@cluster0.rft44.mongodb.net/userDb?retryWrites=true&w=majority"

module.exports = async() =>{
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    return mongoose
}
