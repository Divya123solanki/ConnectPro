import express from "express";
import { createUser, getUsers, getUserById, updateUser, deleteUser,signup, get_Users } from "../controllers/controller.user.js";
const router = express.Router();

router.post("/", createUser);
router.get("/get", getUsers);
router.get("/byid/:id", getUserById);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.post('/signup', signup);
router.get('/users', get_Users);

export default router;
