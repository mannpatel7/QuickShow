import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import User from "../models/User.js"; 
import { clerkClient } from "@clerk/express";




export const isAdmin = async (req, res) => {
  try {
    const auth = req.auth();
    const userId = auth?.userId;

    if (!userId) {
      return res.json({ success: true, isAdmin: false });
    }

    const user = await clerkClient.users.getUser(userId);

    const isAdmin = user.privateMetadata?.role === "admin";

    console.log("ADMIN CHECK RESULT:", isAdmin);

    return res.json({ success: true, isAdmin });
  } catch (error) {
    console.error("IS ADMIN ERROR:", error);
    return res.json({ success: false, isAdmin: false });
  }
};




export const getDashboardData=async (req,res)=>{
    try{
        const bookings=await Booking.find({isPaid:true});
        const activeShows=await Show.find({showDateTime:{$gte: new Date()}}).populate('movie');

        const totalUser=await User.countDocuments();

        const dashboardData={
            totalBookings:bookings.length,
            totalRevenue:bookings.reduce((acc,booking)=>acc+booking.amount,0),
            activeShows,
            totalUser
        }
        res.json({success:true,dashboardData})
    }catch(error){
        console.error(error);
        res.json({success: false,message:error.message})
    }
}

export const getAllShows=async (req,res)=>{
try{
    const shows=(await Show.find({showDateTime: {$gte: new Date()}}).populate('movie')).sort({showDateTime:1})
    res.json({success:true,shows})

}catch(error){
    console.error(error);
    res.json({success:false,message:error.message})
}
}

export const getAllBookings=async (req,res)=>{
try{
    const bookings=await Booking.find({}).populate('user').populate({
        path:"show",
        populate:{path:"movie"}
    }).sort({createdAt:-1})

    res.json({success: true,bookings})
}catch(error){
    console.error(error);
    res.json({success:false,message:error.message})
}
}