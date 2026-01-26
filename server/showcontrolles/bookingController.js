import { inngest } from "../ingest/inngest.js";
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Check seat availability
const checkSeatAvailability = async (showId, selectedSeats) => {
  try {
    const bookings = await Booking.find({
      show: showId,
      // block both paid and unpaid bookings
      isPaid: { $in: [true, false] }
    });

    let occupiedSeats = [];
    bookings.forEach(b => occupiedSeats.push(...b.bookedSeats));

    const isAnySeatTaken = selectedSeats.some(seat =>
      occupiedSeats.includes(seat)
    );

    return !isAnySeatTaken;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};


// Create Booking
export const createBooking = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { showId, selectedSeats } = req.body;
    const { origin } = req.headers;

    const isAvailable = await checkSeatAvailability(showId, selectedSeats);

    if (!isAvailable) {
      return res.json({
        success: false,
        message: "Selected Seats are not available",
      });
    }

    const showData = await Show.findById(showId).populate("movie");

    const booking = await Booking.create({
      user: userId,
      show: showId,
      amount: showData.showPrice * selectedSeats.length,
      bookedSeats: selectedSeats,
      isPaid: false,
    });

    const line_items = [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: showData.movie.title,
          },
          unit_amount: Math.floor(booking.amount) * 100,
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/my-bookings`,
      cancel_url: `${origin}/my-bookings`,
      line_items,
      mode: "payment",
      metadata: {
        bookingId: booking._id.toString(),
        showId: showId,
        seats: JSON.stringify(selectedSeats),
      },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
    });

    booking.paymentLink = session.url;
    await booking.save();

    await inngest.send({
      name: "app/checkpayment",
      data:{
        bookingId:booking._id.toString()
      }
    })

    res.json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get occupied seats
// Get occupied seats (from PAID bookings only)
export const getOccupiedSeats = async (req, res) => {
  try {
    const { showId } = req.params;

    const bookings = await Booking.find({
      show: showId,
      isPaid: true
    });

    let occupiedSeats = [];
    bookings.forEach(b => {
      occupiedSeats.push(...b.bookedSeats);
    });

    res.json({ success: true, occupiedSeats });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

