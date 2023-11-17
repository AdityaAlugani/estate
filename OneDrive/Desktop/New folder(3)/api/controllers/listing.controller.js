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
};

export const getListing=async (req,res,next)=>{
    try{
        const listing=await Listing.findById(req.params.id);
        if(!listing)
        {
            res.status(404).json("Listing not found");
        }
        return res.status(200).json(listing);
    }
    catch(error)
    {
        next(error);
    }
};

export const getListings=async (req,res,next)=>{
    console.log("IN");
    try{
        const limit=parseInt(req.query.limit) || 10;
        const startIndex=parseInt(req.query.startIndex) || 0;
        let offer=req.query.offer;
        if(offer===undefined || offer==="false")
        {
            offer={$in:[true,false]};
        }
        else
        {
            offer={$in:true};
        }
        let furnished=req.query.furnished;
        if(furnished==="false" || furnished===undefined)
        {
            furnished={$in:[true,false]};
        }
        else
        {
            furnished={$in:[true]};
        }
        let parking=req.query.parking;
        if(parking==="false" || parking===undefined)
        {
            parking={$in:[true,false]};
        }
        else
        {
            parking={$in:[true]};
        }
        let type=req.query.type;
        if(type===undefined || type==="all")
        {
            type={$in:["rent","sale"]};
        }
        else if(type==="rent")
        {
            type={$in:["rent"]};
        }
        else if(type==="sale")
        {
            type={$in:["sale"]};
        }
        const searchTerm=req.query.searchTerm || '';
        const sort=req.query.sort || 'createdAt';
        const order=req.query.order || 'desc';
        console.log("name",searchTerm);
        console.log("offer",offer);
        console.log("parking",parking);
        console.log("type",type);
        const listings=await Listing.find({
            name:{$regex:searchTerm,$options:'i'},
            offer,
            furnished,
            parking,
            type,

        }).sort({[sort]:order}).limit(limit).skip(startIndex);

        res.status(200).json(listings);
    }
    catch(error)
    {
        next(error);
    }
};