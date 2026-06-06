import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();
const app = express();
app.use(express.json());

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("DB connected!")
    }
    catch(err){
        console.error("DB connection failed:",err);
        process.exit(1);
    }
}

connectDB();

app.post("/api/v1/signup",(req,res)=>{

});

app.post("/api/v1/signin",(req,res)=>{

});

app.get("/api/v1/content",(req,res)=>{

});

app.delete("/api/v1/delete",(req,res)=>{

});

app.get("/api/v1/brain/:shareLink",(req,res)=>{

});

app.listen(process.env.PORT || 6000,()=>{
    console.log("Server running...");
})