const express = require("express")
const {mongoose } = require("mongoose")
const userRouter = require("./routes/userRouter")
const employeeRouter = require("./routes/EmployeeRouter")
require('dotenv').config()
  const app = express()

   app.use(express.json())

 const connections = async()=>{
      try {
            await mongoose.connect(process.env.MONGO_URL)
               console.log("connected")
      } catch (error) {
          console.log(error)
      }
 }
 app.use("/user",userRouter)
app.use("/employee",employeeRouter)
  app.get("/",(req,res)=>{
     res.send("welcome to Homepage")
  })
  app.listen(8080,()=>{
      connections()
      console.log("server runnig..")
  })