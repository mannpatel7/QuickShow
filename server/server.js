import express from 'express'
import cors from 'cors'
import 'dotenv/config';
import Connectdb from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./ingest/inngest.js";
import showRouter from './Routers/showRoutes.js';
import bookingRouter from './Routers/bookingroutes.js';
import adminRouter from './Routers/adminRoutes.js';
import userRouter from './Routers/userRoutes.js';


const app=express();
const port=3000;

app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())
await Connectdb()

app.get('/',(req,res)=>{
    res.send("server is live")
})
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use('/api/shows', showRouter);
app.use('/api/booking',bookingRouter)
app.use('/api/admin',adminRouter)
app.use('/api/user',userRouter)

app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`)
})