const mongoose = require('mongoose')

const connectDb = async () =>  {

    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING )
        console.log('MongoDB Connected to database', connect.connection.host);

    } catch (error) {
        console.error(`Error connecting to Mongodb  ${error.message}`)  
    }
} 
module.exports = connectDb;