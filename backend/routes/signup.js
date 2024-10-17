const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require('../models/User');

router.post("/signup",async(req,res)=>{
    const {name,age,gender,email,password,phone} = req.body;
    try{
        const user = await User.findOne({email:email});
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password,salt);
        if(user){
            res.json("login");
        }else{
            const creation = await User.create({name:name,age:age,gender:gender,email:email,password:hashPass,mobile:phone});
            res.json("success");
        }
    }catch(e){
        console.log(e);
    }
})

module.exports = router;