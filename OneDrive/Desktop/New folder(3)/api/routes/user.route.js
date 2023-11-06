import express from "express";
import { deleteUser, getUserInfo, test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/VerifyUser.js";
import { getUserListings } from "../controllers/listing.controller.js";

const router=express.Router();

router.get('/test',test);
router.post('/update/:id',verifyToken,updateUser);
router.delete('/delete/:id',verifyToken,deleteUser);
router.get('/listings/:userid',verifyToken,getUserListings);
router.get('/:id',verifyToken,getUserInfo);
export default router;