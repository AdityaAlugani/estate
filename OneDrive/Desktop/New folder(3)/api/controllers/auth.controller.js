import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import errorHandler from "../utils/error.js";

export const signup= async (req,res,next)=>
{
    const {username,gmail,password}=req.body;
    const hashedpassword=await bcryptjs.hashSync(password,10);
    const newUser=new User({username,gmail,password:hashedpassword});
    try
    {
        await newUser.save();
        res.status(201).json({"message":"user created successfully"});
    }
    catch(error)
    {
        next(errorHandler(error.status,error.message)); 
    }
}   