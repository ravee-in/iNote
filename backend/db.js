const mongoose = require("mongoose");
const mongoURI = "MongoDB URI";

const connectToMongo = () =>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to MongoDB");
    })
}

module.exports = connectToMongo;
