import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Userrouter from "./routes/route.user.js";

const app=express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true})); 

app.use('/user',Userrouter);

mongoose.connect('mongodb://localhost:27017/clone')
.then(()=>{
    console.log("Connected to Mongo Db")
})
.catch((err)=>{
    console.log('Error ................')
})

app.listen(4000,()=>{
    console.log("Server Started..........................")
})