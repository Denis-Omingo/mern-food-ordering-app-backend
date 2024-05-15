import { Request,Response } from "express";
import User from "../models/user";

const getCurrentUser=async(req:Request,res:Response)=>{
    try{
        const curentUser=await User.findOne({_id:req.userId});
        if(!curentUser){
            return res.status(404).json({message:"User not found"});
        }
        res.json(curentUser);
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Something went wrong"});
    }
};

const createCurrentUser=async (req:Request,res:Response) => {
    try{
        const {auth0Id}=req.body;
        const existingUser=await User.findOne({auth0Id});

        if(existingUser){
            return res.status(200).send("Logged in successfully");
        }
            const newUser=new User(req.body);
             await newUser.save();
             res.status(201).json(newUser.toObject());
         
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Error in creating user"})
    }
    
};

const updateCurrentUser=async(req:Request,res:Response)=>{
    try{
        const {name,addressLine1,country,city}=req.body;
        const user=await User.findById(req.userId);
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        user.name=name;
        user.addressLine1=addressLine1;
        user.city=city;
        user.country=country;

        await user.save();
        res.send(user);
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Error updating user"});
    }
}

export default{
    createCurrentUser,
    updateCurrentUser,
    getCurrentUser,
} 