import express from "express";
import { createListing, deleteListing } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/VerifyUser.js";

const router=express.Router();

router.post('/create',createListing);
//router.get('/listings/:userid');
router.delete('/delete/:id',verifyToken,deleteListing);

export default router;