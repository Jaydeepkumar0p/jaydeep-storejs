import  User  from "../models/user.model.js";
import asyncHandler from "../config/asyncHandler.js";
import bcrypt from "bcryptjs";
import { genrateToken } from "../config/jwt.js";


export const createUser=asyncHandler(async(req,res)=>{
    const {email,password,username}=req.body;
    try{
        if(!username || !email || !password){
            res.status(400).json({message:"All fields are required"});
           
        }
        const existingUser=await User.findOne({email});
        if(existingUser){
            res.status(400).json({message:"User already exists"});
           
        }
        const salt =await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=new User({username,email,password:hashedPassword});
       if(newUser){
        genrateToken(res,newUser._id);
         await newUser.save();
        res.status(201).json({message:"User created successfully",user:newUser,_id:newUser._id,email:newUser.email,isAdmin:newUser.isAdmin,username:newUser.username});
       }

    }
    catch(err){
        res.status(500).json({message:"Error while creating user",error:err.message});
    }
}
)

export const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    try{
        const existingUser=await User.findOne({email});
        if(!existingUser){
            res.status(400).json({message:"User not found, please sign up"});
        }
        const isPasswordCorrect =await bcrypt.compare(password,existingUser.password);
        if(!isPasswordCorrect){
            res.status(400).json({message:"Invalid email or password"});
        }
        if(existingUser && isPasswordCorrect){
            genrateToken(res,existingUser._id);
            res.status(200).json({message:"User logged in successfully",user:existingUser,_id:existingUser._id,email:existingUser.email,isAdmin:existingUser.isAdmin,username:existingUser.username});
        }

    }
    catch(err){
        res.status(500).json({message:"Error while logging in",error:err.message});
    }
})

export const logoutUser=asyncHandler(async(req,res)=>{
   try{
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0), 
    });
    res.status(200).json({ message: "Logout successful: Cookie cleared" });
   }
   catch(err){
    res.status(500).json({message:"Error while logging out",error:err.message});
   }
})

export const getAllUsers=asyncHandler(async(req,res)=>{
    try{
        const users=await User.find({});
        res.status(200).json({message:"All users fetched successfully",users})
    }
    catch(err){
        res.status(500).json({message:"Error while fetching users",error:err.message});
    }
})

export const getUserProfile=asyncHandler(async(req,res)=>{
    try{
        const user=await User.findById(req.user._id);
        if(user){
            res.status(200).json({message:"User profile fetched successfully",_id:user._id,username:user.username,email:user.email,isAdmin:user.isAdmin});
        }
    }
    catch(err){
        res.status(500).json({message:"Error while fetching user profile",error:err.message});
    }
})
export const updateUserProfile=asyncHandler(async(req,res)=>{
    try{
        const user=await User.findById(req.user._id);
        if(user){
            user.username=req.body.username || user.username;
            user.email=req.body.email || user.email;
            if(req.body.password){
                const salt =await bcrypt.genSalt(10);
                user.password=await bcrypt.hash(req.body.password,salt);
            }
            const updatedUser=await user.save();
            res.status(200).json({message:"User profile updated successfully",user:updatedUser,_id:updatedUser._id,username:updatedUser.username,email:updatedUser.email,isAdmin:updatedUser.isAdmin});

    }}
    catch(err){
        res.status(404).json({message:"Error while updating user profile",error:err.message});
    }
})

export const deleteUser=asyncHandler(async(req,res)=>{

    const user=await User.findById(req.params.id);
    try{
        if(user){
            if(user.isAdmin){
                res.status(400).json({message:"Cannot delete admin user"});
            }
            await User.deleteOne({_id:user._id})
            res.status(200).json({message:"User deleted successfully"});
        }
        else{
            res.status(404).json({message:"User not found"});
        }
    }
    catch(err){
        res.status(500).json({message:"Error while deleting user",error:err.message});
    }
})

export const getUser=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id)
    try{
        if(user){
            res.status(200).json({message:"User fetched successfully",userId:user._id,username:user.username,email:user.email,isAdmin:user.isAdmin});
        }
    }
    catch(err){
        res.status(500).json({message:"Error while fetching user",error:err.message});
    }
})



export const updateUser=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id);
    try{
        if(user){
            user.username=req.body.username || user.username;
            user.email=req.body.email || user.email;
            user.isAdmin=Boolean(req.body.isAdmin);
            const updatedUser=await user.save();
            res.status(200).json({message:"User updated successfully",user:updatedUser,_id:updatedUser._id,username:updatedUser.username,email:updatedUser.email,isAdmin:updatedUser.isAdmin});
        }
    }
    catch(err){
        res.status(500).json({message:"Error while updating user",error:err.message});
    }
})