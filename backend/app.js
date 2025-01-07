import bodyParser from "body-parser";
import express from "express";
import UserRouter from "./routes/user.router.js";
import makeuserprofile from "./routes/profile.router.js";
import { connectionDB } from "./db/db.config.js";


connectionDB();
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/user",UserRouter);
app.use("/profile",makeuserprofile);

app.listen(3000,()=>{
    console.log("Server started...");
})