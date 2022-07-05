// required dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
// modules
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;
const MongoUtil = require("./MongoUtil");

// initialize express
const app = express();

// routes 
app.use('/posts', require("./routes/posts"));

// enable us to send post request
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
// enable cross site origin resources sharing 
app.use(cors());


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})