import express from "express";
import { protectAdmin } from "../middleware/auth.js";
import { getAllBookings, getDashboardData, isAdmin } from "../showcontrolles/admincontroller.js";
import { getAllShows } from "../showcontrolles/nowplaying.js";

const adminRouter=express.Router();

adminRouter.get('/is-admin',isAdmin)
adminRouter.get('/dashboard',protectAdmin,getDashboardData)
adminRouter.get('/all-shows',protectAdmin,getAllShows)
adminRouter.get('/all-bookings',protectAdmin,getAllBookings)

export default adminRouter;
