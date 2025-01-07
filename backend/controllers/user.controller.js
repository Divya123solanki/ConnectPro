import { User } from "../model/user.model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'; 
import { request } from "express";

// Signup code:

export const signup = async (request, response, next) => {
    try {
        const error = validationResult(request);
        if (!error.isEmpty())
            return response.status(401).json({ error: "bad request" });

        let saltKey = bcrypt.genSaltSync(10);
        let encryptedPassword = bcrypt.hashSync(request.body.password, saltKey);
        request.body.password = encryptedPassword;

        let user = await User.create(request.body);
        return response.status(201).json({ message: "signup successful", user });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ err: "internal server error" });
    }
};

// Signin code:

export const signin = async (request, response, next) => {
    try {
        let { email, password } = request.body;
        let user = await User.findOne({ email: email });

        if (user) {
            let status = bcrypt.compareSync(password, user.password);
            return status
                ? response.status(200).json({
                    message: "Sign in successful",
                    user,
                    token: generateToken(user._id)  
                  })
                : response.status(401).json({ error: "Invalid password" });
        } else {
            return response.status(401).json({ error: "Invalid email" });
        }
    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "internal server error" });
    }
};

const generateToken = (userId) => {
    let token = jwt.sign({ payload: userId }, "LinkedinSecretKey"); 
    return token;
};


  //view user by id.

export const view = async (req, res) => {
    try {
      const { id } = req.params; 
      const user = await User.findById(id); 
  
      if (!user) {
        return res.status(404).json({ error: "User not found" }); 
      }
  
      res.status(200).json(user); 
    } catch (err) {
      res.status(500).json({ error: err.message }); 
    }
  };
  
//update user by id

export const updateuser = async (request, response, next) => {
  try {
      const { id } = request.params;
      const updatedData = request.body;

      const user = await User.findById(id);
      
      if (!user) {
          return response.status(404).json({ error: "User not found" });
      }

   
      const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
          new: true, 
      });

      if (!updatedUser) {
          return response.status(400).json({ message: "No changes made to the user details" });
      }

      return response.status(200).json({ message: "User details updated successfully", user: updatedUser });
  } catch (error) {
      console.log(error);
      return response.status(500).json({ error: "Internal server error" });
  }
};

//delet user .

export const deleteuser = async (request, response) => {
    try {
      const user = await User.findOneAndDelete({ username: request.params.name });
      if (!user) {
        return response.status(404).json({ error: "User not found" });
      }
      response.status(200).json({ message: "User deleted successfully", user });
    } catch (err) {
      console.log(err);  
      response.status(500).json({ error: err.message });
    }
  };
  

//connect user with another user:


export const connectUsers = async (request, response) => {
  try {
    const { senderId, receiverId } = request.body;

    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      return response.status(404).json({ error: "User not found" });
    }

    if (sender.connection.includes(receiverId)) {
      return response.status(400).json({ error: "You are already connected with this user" });
    }

    sender.connection.push(receiverId);
    await sender.save();  

    receiver.connection.push(senderId);
    await receiver.save();

    return response.status(200).json({ message: "User connected successfully" });
  } catch (err) {
    console.log(err);
    return response.status(500).json({ error: "Internal server error" });
  }
};
