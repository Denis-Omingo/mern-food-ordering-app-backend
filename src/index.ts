import express, {Request,Response} from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import myUserRoute from './routes/MyUserRoute';


    mongoose.connect(process.env.MONGODB as string)
    .then(()=>{
        console.log('Connected to the database')
    })
    .catch((error)=>console.log(error))


const app=express();
app.use(express.json());
app.use(cors());

app.get("/health",async(req:Request,res:Response)=>{
    res.send({message:"Health ok!"});
})

app.use("/api/my/user",myUserRoute)

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})