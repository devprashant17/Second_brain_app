import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { ContentModel, UserModel } from "./db.js";
import { userMiddleware } from "./middleware.js";

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

app.post("/api/v1/signup",async (req,res)=>{
    //add zod validation, hash the password, manage the error codes 400,403,200 and so on
    const username = req.body.username;
    const password = req.body.password;
    try{
        await UserModel.create({
        username: username,
        password: password
        })

        res.json({
            message:"User signed up!"
        })
    }
    catch(e){
            res.status(411).json({
            message:"User already exists!"
        })
    }

});

app.post("/api/v1/signin",async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await UserModel.findOne({
        username,
        password
    })
    if(existingUser){
        const token = jwt.sign({
            id: existingUser._id
        },process.env.JWT_PASSWORD as string);

        res.json({
            token
        })
    }
    else{
        res.status(403).json({
            message:"Incorrect username or password!"
        })
    }

});

//@ts-ignore
app.post("/api/v1/content",userMiddleware,async (req,res)=>{
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    try{
        await ContentModel.create({
            link,
            type,
            title,
            tags:[],
            //@ts-ignore
            userId: req.userId
        })
        return res.json({
            message:"Content Added!"
        });
    }
    catch(e){
        res.status(403).json({
            message:"Not logged in!"
        })
    }
});

app.get("/api/v1/content",userMiddleware,async (req,res)=>{
    //@ts-ignore
    console.log(req.userId);
    //@ts-ignore
    const userId = req.userId;
    try{
        const content = await ContentModel.find({
        userId: userId
    }).populate("userId","username")
        res.json({
            content
        })
    }
    catch(e){
        res.json({
            message:"Some error"
        })
    }
})

app.delete("/api/v1/delete",userMiddleware,async (req,res)=>{
    const contentId = req.body.contentId;

    console.log(contentId)
    //@ts-ignore
    const result = await ContentModel.deleteOne({
        _id: contentId,
        //@ts-ignore
        userId: req.userId
    })

    res.json({
        message:"Deleted content!"
    })
});

app.get("/api/v1/brain/:shareLink",(req,res)=>{

});

app.listen(process.env.PORT,()=>{
    console.log("Server running...");
})