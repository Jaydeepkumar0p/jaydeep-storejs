import mongoose from "mongoose";

export const UserSchema=new mongoose.Schema({
    username:{
        required:true,
        type:String,
    },
    email:{
        required:true,
        type:String,
        unique:true,
    },
    password:{
        required:true,
        type:String,
    },
    isAdmin:{
        type:Boolean,
        default:false,
        required:true,
    }
},{timestamps:true});
 const User=mongoose.model("User",UserSchema);

export default User;