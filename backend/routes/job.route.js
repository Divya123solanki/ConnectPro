import express from 'express';
import {
  createJob,
  updateJob,
  deleteJob,
  getAllJobs,
  getJobById,
  getAppliedJobs,
  // filterJobs,
  applyToJob,
} from '../controllers/job.controller.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Job Routes
router.post('/create', authMiddleware, createJob); // Create a new job      
router.put('/:id', authMiddleware, updateJob); // Update a job by ID
router.delete('/:id', authMiddleware, deleteJob); // Delete a job by ID
router.get('/',authMiddleware, getAllJobs); // View all jobs
router.get('/:id',authMiddleware, getJobById); // View a specific job by ID
router.get('/applied', authMiddleware, getAppliedJobs); // Get applied jobs for logged-in user
// router.get('/filter', filterJobs); // Get filtered jobs based on criteria
router.post('/apply/:id', authMiddleware, applyToJob); // representing the ID of the job the user wants to apply for.

export default router;
