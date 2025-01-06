import Job from "../models/job.model.js";
import User from "../models/user.model.js";

/**
 * Create a new job
 */
export const createJob = async (request, response) => {
  const { title, description, company, location, salary, jobType, skills } = request.body; // Include jobType and skills
  const { userId } = request.user; // Assuming `authMiddleware` attaches `userId`

  try {
    const newJob = await Job.create({
      title,
      description,
      company,
      location,
      salary,
      jobType, 
      skills, 
      postedBy: userId,
    });
    console.log("a new job created .....",title);
    return response.status(201).json({ message: "Job created successfully!", job: newJob });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Failed to create job" });
  }
};


/**
 * Update a job
 */
export const updateJob = async (request, response) => {
  const { id } = request.params;
  const { title, description, company, location, salary } = request.body;
  const { userId } = request.user;

  try {
    console.log(`Job ID: ${id}, User ID: ${userId}`);

    const job = await Job.findOne({ where: { id, postedBy: userId } });
    if (!job) {
      console.log("Job not found or unauthorized");
      return response.status(404).json({ message: "Job not found or unauthorized" });
    }

    await Job.update(
      { title, description, company, location, salary },
      { where: { id } }
    );

    console.log(`Job with ID ${id} was updated by user ${userId}`);
    return response.status(200).json({ message: "Job updated successfully!" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Failed to update job" });
  }
};

//delete

export const deleteJob = async (request, response) => {
  // Get the job ID from the URL and sanitize it by trimming
  const id = request.params.id.trim(); // Remove extra whitespace or newline characters
  const { userId } = request.user;    // Get the user ID from the request user

  if (!id || !userId) {
    return response.status(400).json({ message: "Invalid request parameters" });
  }

  try {
    // Search for the job posted by the user
    const job = await Job.findOne({ _id: id, postedBy: userId });

    if (!job) {
      return response.status(404).json({ message: "Job not found or unauthorized" });
    }

    // Delete the job
    await Job.deleteOne({ _id: id });
console.log("Job deleted")
    return response.status(200).json({ message: "Job deleted successfully!" });
  } catch (error) {
    console.error("Error deleting job:", error);
    return response.status(500).json({ error: "Failed to delete job" });
  }
};







/**
 * View all jobs
 */

  export const getAllJobs = async (request, response) => {
    try {
      // Fetch all jobs along with user details (name and email)
      const jobs = await Job.find()
        .populate("postedBy", "name email") // Populate the `postedBy` field with `name` and `email`
        .exec();
  
      return response.status(200).json({ jobs });
    } catch (error) {
      console.error("Error fetching jobs:", error);
      return response.status(500).json({ error: "Failed to fetch jobs" });
    }
  };
  


/**
 * Get jobs applied by a user
 */
export const getJobById = async (request, response) => {
  const { userId } = request.user;

  try {
    const appliedJobs = await Job.findAll({
      where: { "applicants.userId": userId },
    });
    return response.status(200).json({ appliedJobs });
  } catch (error) {
    return response.status(500).json({ error: "Failed to fetch applied jobs" });
  }
};

/**
//  * Apply to a job
//  */
export const applyToJob = async (request, response) => {
  const { id } = request.params; // Job ID
  const { userId } = request.user; // User ID from authMiddleware

  try {
    // Find job by ID
    const job = await Job.findById(id);

    if (!job) {
      return response.status(404).json({ message: "Job not found" });
    }

    // Check if the user has already applied
    const hasApplied = job.applicants && job.applicants.some((applicant) => applicant.userId.toString() === userId.toString());

    if (hasApplied) {
      return response.status(400).json({ message: "You have already applied for this job." });
    }

    // Add applicant to the job
    job.applicants = job.applicants || [];
    job.applicants.push({ userId, appliedAt: new Date() });
    await job.save();

    return response.status(200).json({ message: "Successfully applied to the job!", job });
  } catch (error) {
    console.error("Error while applying to job:", error);
    return response.status(500).json({ error: "An error occurred while applying to the job." });
  }
};
