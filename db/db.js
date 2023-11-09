const mongoose = require('mongoose')

const connectDB = async (uri) => {
    const conn = await mongoose.connect(uri,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
        )
    console.log(`MongoDB connected on  host: ${conn.connection.host}`)
}

module.exports = connectDB