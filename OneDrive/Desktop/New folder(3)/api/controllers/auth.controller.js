import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const signup= async (req,res)=>
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
        res.status(500).json(error.message);
    }
} 