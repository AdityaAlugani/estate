import User from "../models/user.model.js";
import errorHandler from "../utils/error.js";
import bcryptjs from "bcryptjs";


export const test= (req,res)=>{
    res.send("Test");
};

export const updateUser=async (req,res,next)=>{
    if(req.user.id !== req.params.id)
    {
        return next(errorHandler(403),"Forbidden user");
    }
    try{
        if(req.body.password)
        {
            req.body.password=bcryptjs.hashSync(req.body.password,10);
        }
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username:req.body.username,
                password:req.body.password,
                avatar:req.body.avatar,
                gmail:req.body.gmail,
            }
        },{new:true});
        const {password,...others}=updatedUser._doc;
        const rest={...others,password:"hidden"};
        return res.status(200).json(rest);
    }
    catch(error)
    {
        next(error);
    }
    
};

export const deleteUser=async (req,res,next)=>{
    if(req.user.id !== req.params.id)
    {
        return next(errorHandler(403),"Forbidden delete");
    }
    try{
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json("User has been deleted");
    }
    catch(error)
    {
        next(errorHandler(error.message));
    }
};