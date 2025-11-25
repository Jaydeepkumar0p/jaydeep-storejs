import  mongoose from 'mongoose'
import User from "./user.model.js"
import Category from "./category.model.js"

const reviewSchema=new mongoose.Schema({
    name:{type:String,required:true},
    rating:{type:Number,required:true},
    comment:{type:String,required:true},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
},{timestamps:true})


const productSchema=new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true,default:0},
    images: [{ type: String }],
    category:{type:mongoose.Schema.Types.ObjectId,ref:'Category',required:true},
    brand:{type:String,required:true},
    rating:{type:Number,required:true,default:0},
    reviews:[reviewSchema],
    numReviews:{type:Number,required:true,default:0},
    countInStock:{type:Number,required:true,default:0},
    quantity:{type:Number,required:true,default:1},
},{timestamps:true})

 const Product=mongoose.model('Product',productSchema);
    export default Product;

