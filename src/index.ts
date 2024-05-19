import express, {Request,Response} from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import myUserRoute from './routes/MyUserRoute';
import {v2 as clodinary} from 'cloudinary';
import myRestaurantRoute from './routes/MyRestaurantRoute';


    mongoose.connect(process.env.MONGODB as string)
    .then(()=>{
        console.log('Connected to the database')
    })
    .catch((error)=>console.log(error))
clodinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLODINARY_API_SECRET,
});


const app=express();
app.use(express.json());
app.use(cors());

app.get("/health",async(req:Request,res:Response)=>{
    res.send({message:"Health ok!"});
})

app.use("/api/my/user",myUserRoute)
app.use("/api/my/restaurant",myRestaurantRoute)

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})