const express = require("express")
const employeeRouter = express.Router()
const EmployeeModel = require('../model/EmployesModel')
employeeRouter.post("/employees", async (req, res) => {
  try {
    const employee = new EmployeeModel(req.body);
    await employee.save()
    res.status(200).send({ "msg": "Employee Added Suceefully.", employee })
  } catch (error) {
    res.status(400).send(error.message)
  }
})



employeeRouter.get("/", async (req, res) => {
  const { first_name, department, sortBy } = req.query;
  try {
    const page = parseInt(req.query.page) || 1
    const perPage = 5
    const query = {}
    if (first_name) {
      query.first_name = first_name;
    }
    if (department) {
      query.department = department;

    }
    const sortOption = {};
    if (sortBy) {
      sortOption.salary = sortBy === "asc" ? 1 : -1;
    }
       const employees = await EmployeeModel.find(query).sort(sortOption).skip((page-1)*perPage).limit(perPage)
       res.status(200).send(employees)
  } catch (error) {
    res.status(400).send(error.message)
  }
})


employeeRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await EmployeeModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).send({ "msg": "Employees Details has been Updated.", employee })

  } catch (error) {
    res.status(400).send(error.message)
  }
})

employeeRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await EmployeeModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ "msg": "Employees Details has been Deleted.", employee })

  } catch (error) {
    res.status(400).send(error.message)
  }
})




module.exports = employeeRouter