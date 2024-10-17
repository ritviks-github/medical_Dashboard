const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/medicalDash").then(()=>{
    console.log("Connected to database")
}).catch(()=>{
    console.log("Could not connect to database")
})