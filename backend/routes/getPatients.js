const express = require('express');
const Patient = require('../models/Patients');
const router = express.Router();

router.get('/patients',async(req,res)=>{
    try{
        const patients = await Patient.find();
        res.json(patients);
    }catch(e){
        console.log(e);
    }
})

module.exports = router;