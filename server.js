require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors")
const mongoose = require("mongoose")
const taskRoutes = require("./routes/taskRoutes")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/user");

app.use(express.json())
app.use(cors({
  origin: ["https://task-manager-phi-kohl-54.vercel.app", "http://localhost:5173"],
  methods : ["GET", "POST", "PUT", "DELETE"],
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

//register api
app.post("/api/register", async (req, res) => {
  const { email, username, password } = req.body;

  try {

    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User with email or username already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      username,
      password: hashedPassword
    });

    await newUser.save();

    res.json({
      message: "User registered successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
});

//login api
app.post("/api/login", async (req, res) => {
  const { identifier, password } = req.body;

 console.log("Identifier received:", identifier);
  
 try {

    const user = await User.findOne({
      $or: [
     { username: new RegExp(`^${identifier}$`, "i") },
     { email: new RegExp(`^${identifier}$`, "i") }
      ]
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      username: user.username
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
});

app.use((req,res)=>{
  res.status(404).json({
    success:false,
    message:"Route not found"
  })
})