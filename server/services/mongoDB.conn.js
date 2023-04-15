const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const connected = await mongoose.connect(process.env.MONGO_DB_URI, {
            dbName: 'e-commerce',
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`Connected to DB: host: ${connected.connections[0].host}, DB: ${connected.connections[0].name}`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB