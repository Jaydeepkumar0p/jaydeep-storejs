import asyncHandler from "../config/asyncHandler.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const AuthHandle=asyncHandler(async(req,res,next)=>{
    try{
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId) // changed from decoded.UserId to decoded.id
            .select("-password");

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = user;
        next();
       
    }
    catch(err){
        res.status(401).json({message:"Not authorized, token failed",error:err.message});
    }

})


export const AdminMiddleware=asyncHandler(async(req,res,next)=>{
   try{
     if(req.user && req.user.isAdmin){
        next();
    }
   }
   catch(err){
    res.status(401).json({message:"Not authorized as an admin",error:err.message});
   }
})