const express = require('express');
const router = express.Router();
const Report = require('../models/Report')

router.post("/submitReport",async(req,res)=>{
    const {treatmentType,insurancePlan,dateOfService,diagnosisCode,patientId} = req.body;
    try{
        const report = await Report.create({treatmentType:treatmentType,insurancePlan:insurancePlan,dateOfService:dateOfService,diagnosisCode:diagnosisCode,patientId:patientId});
        res.json("success");
    }catch(e){
        console.log(e);
    }
})

module.exports = router;