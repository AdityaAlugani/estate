import Listing from "../models/listing.model.js";
import errorHandler from "../utils/error.js";

export const createListing=async (req,res,next)=>{
    try{
        const listing=await Listing.create(req.body);
        return res.status(201).json(listing);
    }
    catch(error)
    {
        next(error);
    }
};

export const getUserListings=async (req,res,next)=>{
    try{
        if(req.user.id===req.params.userid)
        {   
            const listings=await Listing.find({userRef:req.user.id});
            res.status(200).json(listings);
        }
        else
        {
            next(errorHandler(403,"You can only view your own listing!"))
        }
    }
    catch(error)
    {
        next(errorHandler(error.status,error.message));
    }
}