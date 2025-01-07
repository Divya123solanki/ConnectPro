import cloudinary from "../db/db.cloudinary.js";
import Profile from "../model/profile.model.js";
import { validationResult } from 'express-validator';




// Create Profile code
export const createProfile = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, website, bio, linkedinUrl, githubUrl ,imagefile} = req.body;
    const error = validationResult(req);
    if (!error.isEmpty()) return res.status(401).json({ error: "Bad request" });
    const newProfile = new Profile({
      firstname,
      lastname,
      email,
      phone,
      website,
      bio,
      linkedinUrl,
      githubUrl,
      imagefile,
      
    });

   let image=null;
   if(imagefile){
    let upload=await cloudinary.v2.uploader.upload(imagefile,{folder:"imagefolder"})
    image={
      url:uploadResponse.secure_url,
      public_id:uploadResponse.public_id,

    }
   }
    
   
    const savedProfile = await newProfile.save();

    return res.status(201).json({
      message: 'Profile created successfully!',
      profile: savedProfile,
    });
  } catch (error) {
    console.error('Error creating profile:', error);
    return res.status(500).json({ message: 'Error creating profile', error });
  }
};




// Get Profile by ID code
export const getProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findById(id);

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    return res.status(200).json({ profile });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return res.status(500).json({ message: 'Error fetching profile', error });
  }
};




// Update Profile by ID code
export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, headline, industry, education, location, email, phone, website, profilePicture, bio, linkedinUrl, githubUrl } = req.body;
    const updatedProfile = await Profile.findByIdAndUpdate(id, {
      firstname,
      lastname,
      headline,
      industry,
      education,
      location,
      email,
      phone,
      website,
      profilePicture,
      bio,
      linkedinUrl,
      githubUrl,
    }, { new: true });

    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    return res.status(200).json({
      message: 'Profile updated successfully!',
      profile: updatedProfile,
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ message: 'Error updating profile', error });
  }
};




// Delete Profile by ID code
export const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProfile = await Profile.findByIdAndDelete(id);

    if (!deletedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    return res.status(200).json({
      message: 'Profile deleted successfully!',
      profile: deletedProfile,
    });
  } catch (error) {
    console.error('Error deleting profile:', error);
    return res.status(500).json({ message: 'Error deleting profile', error });
  }
};
