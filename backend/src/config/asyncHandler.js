const asyncHandler=(fn)=>(req,res,next)=>{
    Promise.resolve(fn(req,res,next)).catch((error)=>{
        res.status(500).json({message:"Something went wrong",error: error.message});
    })
}
export default asyncHandler;