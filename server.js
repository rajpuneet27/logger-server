const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
var cors = require('cors')
const CartItems = require("./models/logs")


const app = express();
const PORT = process.env.PORT || 3000;

const routes = require('./routes/api')


const MONGODB_URL = "mongodb+srv://randomuser:randomuser@playheadphone01.u8d0y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

//Mongoose Connection
mongoose.connect(MONGODB_URL || 'mongodb://localhost/project', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
    console.log("Connected to Mongoose")
})


// Sequelize (SQL database) setup
const sequelize = new Sequelize('your_database', 'your_user', 'your_password', {
    host: 'localhost',
    dialect: 'mysql', // Use the appropriate dialect for your database
});

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//HTTP request logger
app.use(morgan('tiny'));

app.use('/api', routes);


app.listen(PORT, console.log(`Server is running at ${PORT}`))