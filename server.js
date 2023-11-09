const express = require('express')
const dotenv = require('dotenv')
const todo = require('./models/todo')
const connectDB = require('./db/db')
const todos = require('./routes/todo')
const path = require('path');
const errorHandler = require('./util/errorHandler')

dotenv.config({path: './config/config.env'})

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 5001
const environment = process.env.NODE_ENV || 'development';
const dbURI = environment === 'testing' ? process.env.MONGO_DB_TEST_URI : process.env.MONGO_DB_URI;

const server = app.listen(PORT, console.log(`server started on port ${PORT}`))

connectDB(dbURI)
app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.use('/api/v1',todos)

app.use(errorHandler);

const closeConnection = ()=>{
    server.close(()=>process.exit(0));
}

module.exports = {app,closeConnection}