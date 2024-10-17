const express = require('express');
const Report = require('../models/Report');
const router = express.Router();


router.get("/allReports",async (req,res)=>{
    try{
        const reports = await Report.find();
        res.json(reports);
    }catch(e){
        console.log(e);
    }
})

module.exports = router;