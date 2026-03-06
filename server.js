const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/taskduty")

const Task = mongoose.model("Task",{
title:String,
description:String,
tag:String
})

app.get("/tasks",async(req,res)=>{
const tasks = await Task.find()
res.json(tasks)
})

app.get("/tasks/:id",async(req,res)=>{
const task = await Task.findById(req.params.id)
res.json(task)
})

app.post("/tasks",async(req,res)=>{
const task = new Task(req.body)
await task.save()
res.json(task)
})

app.put("/tasks/:id",async(req,res)=>{
await Task.findByIdAndUpdate(req.params.id,req.body)
res.json("updated")
})

app.delete("/tasks/:id",async(req,res)=>{
await Task.findByIdAndDelete(req.params.id)
res.json("deleted")
})

app.listen(5000,()=>{
console.log("Server running on port 5000")
})