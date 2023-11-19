const mongoose = require("mongoose");

const MONGODB_URL = "mongodb+srv://rajpuneetjob:Puneet@155@logger-app.9wsmqtl.mongodb.net/?retryWrites=true&w=majority"

//Mongoose Connection
mongoose.connect(MONGODB_URL || 'mongodb://localhost/project', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
    console.log("Connected to Mongoose")
})