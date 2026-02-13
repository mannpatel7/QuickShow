import { clerkClient } from "@clerk/express";
import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";


export const getUserBookings = async (req, res) => {
  try {
    const user = req.auth().userId;

    const bookings = await Booking.find({ user })
      .populate({
        path: "show",
        populate: { path: "movie" },
      });

    // Filter only future bookings
    const currentDate = new Date();

    const validBookings = bookings.filter(
      booking => new Date(booking.show.showDateTime) > currentDate
    );

    res.json({ success: true, bookings: validBookings });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const updateFavourite=async(req,res)=>{
    try{
        const {movieId}=req.body;
        const userId=req.auth().userId;

        const user=await clerkClient.users.getUser(userId)

        if(!user.privateMetadata.favorites){
            user.privateMetadata.favorites=[]
        }

        if(!user.privateMetadata.favorites.includes(movieId)){
            user.privateMetadata.favorites.push(movieId)
        }
        else{
            user.privateMetadata.favorites=user.privateMetadata.favorites.filter(item=>item!==movieId)
        }


        await clerkClient.users.updateUserMetadata(userId,{privateMetadata: user.privateMetadata})

        res.json({success:true,message:"Favourite movies updated successfully"})
    }catch(error){
        console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
    }
}

export const getFavourites=async (req,res)=>{
    try {
        const user=await clerkClient.users.getUser(req.auth.userId)
        const favorites=user.privateMetadata.favorites;

        const movies=await Movie.find({_id:{$in: favorites}})

        res.json({success:true, movies})
    } catch (error) {
        console.error(error.message);
        res.json({success:false,message: error.message});
    }
}