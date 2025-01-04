import User from "../models/model.user.js"; 
import nodemailer from 'nodemailer';
import { sendEmail } from "../email.js";
export const createUser = async (req, res) => {
    try {
        const { name, username, email, password, profilePicture, bannerImg, headline, location, about, skills, experience } = req.body;

        const newUser = new User({
            name,
            username,
            email,
            password,
            profilePicture,
            bannerImg,
            headline,
            location,
            about,
            skills,
            experience,
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser); 
        sendEmail(email, name);
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users); 
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user); 
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
};

export const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }, 
            { new: true } 
        );
        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        res.status(200).json(updatedUser); 
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
};
const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '9c603ed8c1e0e8',
      pass: '0037a51d64643a',
    },
  });
  
  let users = [];
  
  export const signup = (req, res) => {
    const { username, email } = req.body;
  
    if (!username || !email) {
      return res.status(400).send('Username and email are required');
    }
  
    users.push({ username, email });
  
    const mailOptions = {
      from: 'moreyogita120@gmail.com',
      to: email,
      subject: 'Welcome to Our App!',
      text: `Hello ${username},\n\nThank you for signing up! We are excited to have you on board.`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).send('Error sending email');
      }
      res.status(200).send(`Signup successful! A welcome email has been sent to ${email}`);
    });
  };
  
  export const get_Users = (req, res) => {
    res.status(200).json(users);
  };