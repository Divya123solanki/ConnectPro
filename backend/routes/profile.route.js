import express from 'express';
import { createProfile, getProfileById, updateProfile, deleteProfile } from '../controller/profile.controller.js';

const router = express.Router();

router.post('/', createProfile);// http://localhost:3000/profile
router.get('/:id', getProfileById);// http://localhost:3000/profile/67798e4951fa30ad95d09846
router.put('/:id', updateProfile);// http://localhost:3000/profile/67798a0851fa30ad95d0983a
router.delete('/:id', deleteProfile);

export default router;



          //user createprofile:-
// {
//     "firstname": "nandani",
//     "lastname": "bachhane",
//     "email": "nandani@gmail.com",
//     "phone": "1234567890",
//     "website": "",
//     "bio": "software Developer",
//     "linkedinUrl": "nandanibachhane",
//     "githubUrl": "nandanibachhane123"
// }


       //user update
    //    {
    //     "firstname": "John",
    //     "lastname": "Smith",
    //     "headline": "Senior Software Developer",
    //     "industry": "Technology",
    //     "education": "Master's in Computer Science",
    //     "location": "New York",
    //     "email": "johnsmith@example.com",
    //     "phone": "9876543210",
    //     "website": "https://johnsmith.com",
    //     "profilePicture": "https://link-to-picture.com",
    //     "bio": "Experienced software engineer",
    //     "linkedinUrl": "https://linkedin.com/in/johnsmith",
    //     "githubUrl": "https://github.com/johnsmith"
    //   }
      
