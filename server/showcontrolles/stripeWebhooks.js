import stripe from "stripe";
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";

const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (request, response) => {
  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return response.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;

        // get checkout session from payment intent
        const sessionList = await stripeInstance.checkout.sessions.list({
          payment_intent: paymentIntent.id,
        });

        const session = sessionList.data[0];

        const { bookingId, showId, seats } = session.metadata;
        const bookedSeats = JSON.parse(seats);

        // mark booking paid
        const booking = await Booking.findByIdAndUpdate(
          bookingId,
          { isPaid: true, paymentLink: "" },
          { new: true }
        );

        // update show occupied seats
        const show = await Show.findById(showId);

        bookedSeats.forEach(seat => {
          show.occupiedSeats[seat] = booking.user.toString();
        });

        await show.save();

        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    response.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    response.status(500).send("Internal Server Error");
  }
};
