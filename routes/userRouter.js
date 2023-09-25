const express = require("express")
const userRouter = express.Router()
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const UserModel = require("../model/UserModel")
userRouter.post("/signup",async(req,res)=>{
        const{email,password,confirmPassword} = req.body;
try {
       const user = await  UserModel.findOne({email})
         if(user){
           return res.status(400).send({"msg":"User is Already exist"})
         }else{
            bcrypt.hash(password, 5, async(err, hash)=> {
                  if(err){
                    return res.status(400).send({"error":err})
                  }else{
                    const users=  new UserModel({email,password:hash,confirmPassword:hash})
                    await users.save()
                    res.status(200).send({msg:"User is Registered is Successfully.",users})
                  }
            });
         }        
} catch (error) {
      res.status(400).send(error.message)
}
})

userRouter.post("/login",async(req,res)=>{
      const {email,password} =req.body;
    try {
           const user= await  UserModel.findOne({email})
              if(user){
                    bcrypt.compare(password, user.password, function(err, result) {
                        if(result){
                            var token = jwt.sign({ userId: user._id }, "itachi");
                            res.status(200).send({"msg":"Logged in Successfully.",token})   
                        }else{
                            res.status(200).send({"msg":"Invalid Credentials"})   
                        }
                    });
              }else{
                res.status(400).send({"msg":"please Provide Valid Credentails"})  
              }
             
    } catch (error) {
          res.status(400).send(error.message)
    }
    })

module.exports = userRouter