const mongoose = require("mongoose")

  const UserScehma = mongoose.Schema({
       email:{type:String,require:true},
       password:{type:String,require:true},
       confirmPassword:{type:String,require:true},
  })


  UserModel = mongoose.model("User",UserScehma)
  module.exports = UserModel;

