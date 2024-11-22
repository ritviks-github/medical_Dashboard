const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const secretKey = 'mySecretKey';
const Report = require('../models/Report');

router.post("/adminlogin",async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await Admin.findOne({email:email});
        if(!user){
            res.json("signup");
        }else{
            const passwordVerify = password == user.password;
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
router.get('/reports/pending', async (req, res) => {
    try {
      const pendingReports = await Report.find({ status: 'pending' });
      res.json(pendingReports);
    } catch (error) {
      console.error('Error fetching reports:', error);
      res.status(500).send('Server error');
    }
  });
  
  // Endpoint to update the status of a report
  router.patch('/reports/:id', async (req, res) => {
    const { status } = req.body;
    try {
      const report = await Report.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );
      res.json(report);
    } catch (error) {
      console.error('Error updating report:', error);
      res.status(500).send('Server error');
    }
  });


module.exports = router;