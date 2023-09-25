const mongoose = require("mongoose")

  const EmployeeScehma = mongoose.Schema({
       first_name:{type:String,require:true},
       last_name:{type:String,require:true},
       email:{type:String,require:true},
       department:{type:String,require:true},
       salary:{type:Number,require:true},
  })


  EmployeeModel = mongoose.model("Employee",EmployeeScehma)
  module.exports = EmployeeModel;
