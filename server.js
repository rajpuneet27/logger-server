const express = require("express");
const morgan = require("morgan");
const path = require("path");
var cors = require('cors')
const logs = require("./models/logs")
const config = require("./config/config")


const app = express();
const PORT = process.env.PORT || 3000;

const routes = require('./routes/api')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//HTTP request logger
app.use(morgan('tiny'));

app.use('/api', routes);


app.listen(PORT, console.log(`Server is running at ${PORT}`))