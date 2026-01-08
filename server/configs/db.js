import mongoose from "mongoose";

const Connectdb=async ()=>{
    try{
        mongoose.connection.on('connected',()=> console.log('Database Connected'))
        await mongoose.connect(`${process.env.MONGODB_URI}/quickshow`) 
    }
   catch(error){
    console.log(error.message);
   }
} 

export default Connectdb;