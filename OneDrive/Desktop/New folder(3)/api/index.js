import express from "express";
import mongoose from "mongoose";
const app=express();
import userRouter from "./routes/user.route.js";

mongoose.connect("mongodb+srv://marvelsuniverse1967:Ngit%40123%24@mern-estate.02f7f0i.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("Connected to mongodb server");
}).catch((error)=>console.log(error.message));

app.listen(4001,()=>{
    console.log("Server is running at port 4001!");
});

app.use('/',userRouter);