import { Inngest } from "inngest";
import User from "../models/User.js";

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


// Create an empty array where we'll export future Inngest functions
export const functions = [Synccreation,Syncdeletion];