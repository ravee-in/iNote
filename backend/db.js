const mongoose = require("mongoose");
// const mongoURI = "mongodb+srv://ravee_in:raveee1234@inote001.6yapf.mongodb.net/test";
const mongoURI = "mongodb://localhost:27017/inote?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connectToMongo = () =>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to MongoDB");
    })
}

module.exports = connectToMongo;