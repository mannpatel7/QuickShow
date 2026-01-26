import { Inngest, step } from "inngest";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import { model } from "mongoose";
import sendEmail from "../configs/nodeMailer.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "my-app" });

const Synccreation=inngest.createFunction(
    {id:'sync-user-from-clerk'},
    {event:'clerk/user.created'},
    async ({event})=>{
        const {id,first_name,last_name,email_address,image_url}=event.data
        const userData={
            _id:id,
            email:email_address[0].email_address,
            name:first_name+' '+last_name,
            image:image_url
        }
        await User.create(userData)
    }
)
const Syncdeletion=inngest.createFunction(
    {id:'delete-user-from-clerk'},
    {event:'clerk/user.deleted'},
    async ({event})=>{
        const {id}=event.data
        await User.findByIdAndDelete(id)
    }
)
const Syncupdation=inngest.createFunction(
    {id:'update-user-from-clerk'},
    {event:'clerk/user.updated'},
    async ({event})=>{
        const {id,first_name,last_name,email_address,image_url}=event.data
        const updatedData={
            _id:id,
            email:email_address[0].email_address,
            name:first_name+' '+last_name,
            image:image_url
        }
        await User.findByIdAndUpdate(id,updatedData)
    }
)
//hold seats for 10 minutes
const releaseSeatsAndDeleteBooking=inngest.createFunction(
    {id: 'release-seats-delete-booking'},
    {event:"app/checkpayment"},
    async ({event, step})=>{
        const tenMinutesLater=new Date(Date.now()+10*60*1000);
        await step.sleepUntil('ait-for-10-minutes',
            tenMinutesLater);

            await step.run('check-payment-status',async()=>{
                const bookingId=event.data.bookingId;
                const booking=await Booking.findById(bookingId)

                if(!booking.isPaid){
                    const show=await Show.findById(booking.show);
                    booking.bookedSeats.forEach((seat)=>{
                        delete show.occupiedSeats[seat]
                    });
                    show.markModified('occupiedSeats')
                    await show.save()
                    await Booking.findByIdAndDelete(booking._id)
                }
            })
    }
)

//for send email
const sendBookingConfirmationEmail=inngest.createFunction(
    {id: "send-booking-confirmation-email"},
    {event: "app/show.booked"},
    async ({event,step})=>{
        const {bookingId}=event.data;

        const booking=await Booking.findById(bookingId).populate({
            path:'show',
            populate:{
                path:'movie',model:"Movie"
            }
        }).populate('user');

       await sendEmail({
  to: booking.user.email,
  subject: `Payment Confirmation – "${booking.show.movie.title}" Booking Successful`,
  body: `
Hi ${booking.user.name},

🎉 Payment Successful! Your booking is confirmed.

Movie: ${booking.show.movie.title}
Date & Time: ${booking.show.time}
Seats: ${booking.bookedSeats.join(", ")}
Amount Paid: ₹${booking.amount}

Enjoy your show!

– QuickShow Team
`
});

    }
)
// Create an empty array where we'll export future Inngest functions
export const functions = [Synccreation,Syncdeletion,Syncupdation, releaseSeatsAndDeleteBooking,sendBookingConfirmationEmail];