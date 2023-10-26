import express from "express";
import mongoose from "mongoose";
const app=express();
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cors from 'cors';
import cookieParser from "cookie-parser";

mongoose.connect("mongodb+srv://marvelsuniverse1967:Ngit%40123%24@mern-estate.02f7f0i.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("Connected to mongodb server");
}).catch((error)=>console.log(error.message));

app.use(cookieParser());
app.use(cors());
app.use(express.json());



app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);


//middleware error handling
app.use((error,req,res,next)=>{ 
    const statusCode=error.statusCode || 500;
    const message=error.message || "Internal server error";
    return res.status(statusCode).json({message,statusCode,success:false});
});

app.listen(3000,()=>{
    console.log("Server is running at port 3000!");
});

