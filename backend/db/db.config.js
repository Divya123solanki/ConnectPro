import mongoose from "mongoose";
const connectionDB = async()=>{
    mongoose.connect("mongodb://localhost:27017/Linkedin")
    .then(()=>{console.log("Mongodb is connnected")})
    .catch(()=>{console.log("Mongodb connection is failed")})
}


export{connectionDB};