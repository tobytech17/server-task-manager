require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors")
const mongoose = require("mongoose")
const taskRoutes = require("./routes/taskRoutes")


app.use(express.json())
app.use(cors({
  origin: ["https://task-manager-phi-kohl-54.vercel.app", "http://localhost:5173"],
  credentials: true,
}));


//test route
app.get("/", (req,res)=>{
    res.status(200).json({success : true, message:"APPservername"})
});
app.use("/api/tasks", taskRoutes)

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
        app.listen(process.env.PORT, ()=>{
            console.log(`Server running on port : ${process.env.PORT}`);      
        })
    } catch (error) {
      console.log(error);
        
    }
}
startServer()

//error route
app.use((req,res)=>{
    res.status(401).json({success: false, message: "ROUTE NOT FOUND" })
})