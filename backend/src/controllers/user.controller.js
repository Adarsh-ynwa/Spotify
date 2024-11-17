import { User } from "../models/user.model.js";

export const getAllUsers=async(req,res,next)=>{
    try {
        const curruser=req.auth.userId
        const users= await User.find({})
        res.status(200).json(users)
        
    } catch (error) {
        next(error)
        
    }
}