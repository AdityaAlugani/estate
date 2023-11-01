import express from "express";
import { createListing, getUserListings } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/VerifyUser.js";

const router=express.Router();

router.post('/create',createListing);
router.get('/listings/:userid',verifyToken,getUserListings);

export default router;