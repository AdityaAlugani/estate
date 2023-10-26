import errorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken=(req,res,next)=>{
    console.log(req.cookies);
    const token=req.cookies.access_token;
    if(!token)
    {
        return next(errorHandler(401,"Not authorized!!"));
    }
    console.log(token);
    jwt.verify(token,'SERECT_KEY',(error,user)=>{
        if(error)
        {
            return next(errorHandler(403,error.message));
        }
        //console.log(user);
        req.user=user;
        //console.log(user);
        next(); 
    });
};