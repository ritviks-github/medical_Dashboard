const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const secretKey = 'mySecretKey'


router.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email:email});
        if(!user){
            res.json("signup");
        }else{
            const passwordVerify = await bcrypt.compare(password,user.password);
            if(!passwordVerify){
                res.json("invalid");
            }
            else{
                const token = await jwt.sign({id:user._id},secretKey);
                res.json({success:true,authToken:token});
            }
        }

    }catch(e){
        console.log(e);
    }

})


module.exports = router;