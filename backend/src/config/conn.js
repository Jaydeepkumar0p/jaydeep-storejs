import mongoose from "mongoose";

const Connection=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Database connected successfully at ${conn.connection.host}`);
    }
    catch(err){
        console.log("Error while connecting with the database",err.message);
        process.exit(1);
        
    }

}
export default Connection;