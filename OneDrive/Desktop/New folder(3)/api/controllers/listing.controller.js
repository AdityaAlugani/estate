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
};

export const deleteListing=async (req,res,next)=>{
    try{
        const getUserListingValue=await Listing.findById(req.params.id);
        console.log(req.params.id,getUserListingValue);
        if(getUserListingValue && req.user.id===getUserListingValue.userRef)
        {
            await Listing.findByIdAndDelete(req.params.id);
            return res.status(200).json("deleted successfully!");
        }
        else
        {
            return next(errorHandler(401,"Error:either only the owner of the listing can delete the listing or the listing doesn't exists!"));
        }
    }
    catch(error)
    {
        next(errorHandler(error.status,error.message));
    }
    
};

export const updateListing=async (req,res,next)=>{
    try{
        const listing=await Listing.findById(req.params.id);
        if(!listing)
        {
            return next(errorHandler(404,"Listing not found!"));
        }
        console.log(listing);
        if(req.user.id !== listing.userRef)
        {
            return next(errorHandler(401,"You can only update your own listing!"));
        }
        const updatedListing=await Listing.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json(updatedListing);
    }
    catch(error)
    {
        next(error);
    }
}