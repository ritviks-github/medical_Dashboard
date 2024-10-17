const mongoose = require("mongoose");
const patientSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    medical_history:{
        type:[String],
        required:true
    },
    treatment_plan:{
        type:String,
        required:true
    }
})
const Patient = mongoose.model("Patient",patientSchema);
module.exports = Patient;