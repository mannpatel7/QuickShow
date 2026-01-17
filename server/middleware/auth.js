import {clerkClient} from "@clerk/express";
import { json } from "express";

export const protectAdmin=async (req,res,next)=>{
    try{
        const {userId}=req.auth();

        const user=await clerkClient.users.getUser(userId);

        if(user.privateMetadata.role!=='admin'){
            return res.json({success:false,message:"Unauthorized Access"});
        }
        next();
    }catch(err){
        return res.json({success:false,message:"Unauthorized Access"});
    }
}