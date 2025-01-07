import express from "express";
import {signup,signin,view,updateuser,deleteuser,connectUsers} from "../controller/user.controller.js";
import {body} from "express-validator";
import {auth}from "../middleware/auth.js";

const router = express.Router();
router.post('/signup',
    body("username","username is required").notEmpty(),
    body("email","Invalid email id").isEmail(),
    body("email","Email id is required").notEmpty(),
    body("password","Only digit is reruired").isNumeric(),signup);

    router.post("/signin",signin);
    router.get("/view/:id",view);
    router.put("/update/:id",updateuser);
    router.delete("/delete/:name",deleteuser);
    router.post("/connect",connectUsers);
    

    export default router;