import { clerkClient } from "@clerk/express";
import dotenv from "dotenv";
dotenv.congig()

export const protectRoute = async(req,res,next)=>{
    if(!req.auth.userId){
        res.status(401).json({messgae:"unauthorized--you must be logged in"})
        return
    }
    next()
}

export const requireAdmin=async(req,res,next)=>{
    try {
        const curruser= await clerkClient.users.getUser(req.auth.userId)
        const isAdmin = process.env.ADMIN_EMAIL===curruser.primaryEmailAddress?.emailAddress
        

        if(!isAdmin){
            return res.status(403).json({message:"unauthorized- youu must be an admin"})
        }
    } catch (error) {
        next(error)
    }
}
