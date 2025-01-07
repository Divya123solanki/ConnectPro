import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true, // Required field
    },
    lastname: {
        type: String,
        required: true, // Required field
    },
    headline: {
        type: String,
        default: 'New User', // Default headline if not provided
    },
    industry: {
        type: String,
        default: '', // Optional field
    },
    education: {
        type: String,
        default: '', // Optional field
    },
    location: {
        type: String,
        default: '', // Optional field
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure no duplicate emails
    },
    phone: {
        type: String,
        default: '', // Optional field
    },
    website: {
        type: String,
        default: '', // Optional field
    },
    profilePicture: {
        type: String, // URL of the profile picture (could be a URL or filename)
        default: '', // Optional field
    },
    bio: {
        type: String,
        default: '', // Optional field for user's biography/description
    },
    linkedinUrl: {
        type: String,
        default: '', // Optional field for LinkedIn profile
    },
    githubUrl: {
        type: String,
        default: '', // Optional field for GitHub profile
    },
    createdAt: {
        type: Date,
        default: Date.now, // Timestamp when the profile was created
    },
    updatedAt: {
        type: Date,
        default: Date.now, // Timestamp when the profile was last updated
    },

    
    image :{
        Url:{type:String},
        public_id:{type:String}
    }

});

// Middleware to update the `updatedAt` field whenever the profile is updated
profileSchema.pre('save', function(next) {
    this.updatedAt = Date.now(); // Set `updatedAt` to current time on every save
    next();
});

// Create and export the model
const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
