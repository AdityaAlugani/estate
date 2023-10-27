import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import errorHandler from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup= async (req,res,next)=>
{
    const {username,gmail,password}=req.body;
    console.log(req.body);
    try
    {
        const hashedpassword=await bcryptjs.hashSync(password,10);
        const newUser=new User({username,gmail,password:hashedpassword});
        await newUser.save();
        res.status(201).json({"message":"user created successfully"});
    }
    catch(error)
    {
        next(error);
    }
};

export const signin=async (req,res,next)=>{
    const {gmail,password}=req.body;
    try
    {
        const validUser=await User.findOne({gmail});
        if(!validUser)
        {
            return next(errorHandler(404,"user not found!!"));
        }
        
        const validPassword=bcryptjs.compareSync(password,validUser.password);
        if(!validPassword)
        {
            return next(errorHandler(401,"Invalid username or password!!"));
        }
        const token=jwt.sign({id:validUser._id},'SERECT_KEY');
        const validUserReturned={...validUser}._doc;
        validUserReturned.password="hidden";
        return res.cookie('access_token',token,{httpOnly:true}).status(200).json(validUserReturned); 
    }
    catch(error)
    {
        next(error);
    }
}

export const google=async (req,res,next)=>{
    try{
        const validUser=await User.findOne({gmail:req.body.gmail});
        if(validUser)
        {
            const token=jwt.sign({id:validUser._id},'SERECT_KEY');
            const validUserReturned={...validUser}._doc;
            validUserReturned.password="hidden";
            return res.cookie('access_token',token,{httpOnly:true}).status(200).json(validUserReturned); 
        }
        else
        {
            const passwordgenerated=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
            const hashedpassword=await bcryptjs.hashSync(passwordgenerated,10);
            const newUser=new User({username:req.body.name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-4),gmail:req.body.gmail,password:hashedpassword,
            avatar:req.body.photo,
        });
            await newUser.save();
            const token=jwt.sign({id:newUser._id},'SERECT_KEY');
            const validUserReturned={...newUser}._doc;
            validUserReturned.password="hidden";
            return res.cookie('access_token',token,{httpOnly:true}).status(200).json(validUserReturned);    
        }
    }
    catch(error)
    {
        next(error);
    }
};

export const signout=(req,res,next)=>{
    try{
        res.clearCookie('access_token');
        res.status(200).json("signed out successfully!");
    }
    catch(error)
    {
        next(error.message);
    }
};