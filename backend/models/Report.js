const mongoose = require('mongoose');
const reportSchema = new mongoose.Schema({
    patientId:{
        type:String,
        required:true
    },
    treatmentType:{
        type:String,
        required:true
    },
    insurancePlan:{
        type:String,
        required:true
    },
    dateOfService:{
        type:Date,
        required:true
    },
    diagnosisCode:{
        type:String,
        required:true
    }
})

const Report = mongoose.model("Report",reportSchema);
module.exports = Report;