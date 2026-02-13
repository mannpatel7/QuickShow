import { Inngest } from "inngest";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import { model } from "mongoose";
import sendEmail from "../configs/nodeMailer.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "my-app",
    eventKey: process.env.INNGEST_EVENT_KEY
 });

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
        console.log(`[INNGEST] Starting email send for booking: ${bookingId}`);

        const {booking, user, show, movie} = await step.run('fetch-booking-details', async ()=>{
            console.log(`[INNGEST] Fetching booking: ${bookingId}`);
            const booking = await Booking.findById(bookingId);
            if(!booking) {
                throw new Error(`Booking not found: ${bookingId}`);
            }
            console.log(`[INNGEST] Booking found, user ID: ${booking.user}`);

            const user = await User.findById(booking.user);
            if(!user) {
                throw new Error(`User not found: ${booking.user}`);
            }
            console.log(`[INNGEST] User found: ${user.email}`);

            const show = await Show.findById(booking.show).populate('movie');
            if(!show) {
                throw new Error(`Show not found: ${booking.show}`);
            }
            if(!show.movie) {
                throw new Error(`Movie not found for show: ${booking.show}`);
            }
            console.log(`[INNGEST] Show and movie found: ${show.movie.title}`);

            return { booking, user, show, movie: show.movie };
        });

        await step.run('send-confirmation-email', async ()=>{
            console.log(`[INNGEST] Preparing email for ${user.email}`);
            const formattedDate = new Date(show.showDateTime).toLocaleString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });

            console.log(`[INNGEST] Calling sendEmail function`);
            return await sendEmail({
                to: user.email,
                subject: `Payment Confirmation – "${movie.title}" Booking Successful`,
                body: `
Hi ${user.name},

🎉 Payment Successful! Your booking is confirmed.

Movie: ${movie.title}
Date & Time: ${formattedDate}
Seats: ${booking.bookedSeats.join(", ")}
Amount Paid: ₹${booking.amount}

Enjoy your show!

– QuickShow Team
`
            });
        });
    }
)
// Create an empty array where we'll export future Inngest functions
export const functions = [Synccreation,Syncdeletion,Syncupdation, releaseSeatsAndDeleteBooking,sendBookingConfirmationEmail];