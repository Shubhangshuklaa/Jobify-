
import express from 'express';
import { connectToDatabase, Job, Application } from '../utils/mongodb';

const router = express.Router();

// Get all jobs
router.get('/', async (req, res) => {
  try {
    await connectToDatabase();
    const jobs = await Job.find().sort({ postedAt: -1 });
    
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error getting jobs:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get job by ID
router.get('/:id', async (req, res) => {
  try {
    await connectToDatabase();
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.status(200).json(job);
  } catch (error) {
    console.error('Error getting job:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new job
router.post('/', async (req, res) => {
  try {
    await connectToDatabase();
    const { title, company, location, type, description, skills, salary, recruiterId } = req.body;
    
    const newJob = new Job({
      title,
      company,
      location,
      type,
      description,
      skills,
      salary,
      recruiterId
    });
    
    await newJob.save();
    
    res.status(201).json(newJob);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Apply for job
router.post('/:id/apply', async (req, res) => {
  try {
    await connectToDatabase();
    const { userId } = req.body;
    
    // Check if job exists
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Check if already applied
    const existingApplication = await Application.findOne({ 
      jobId: req.params.id, 
      userId 
    });
    
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }
    
    // Create application
    const newApplication = new Application({
      jobId: req.params.id,
      userId,
      status: 'pending'
    });
    
    await newApplication.save();
    
    // TODO: Award points for application
    
    res.status(201).json(newApplication);
  } catch (error) {
    console.error('Error applying for job:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all applications for a job
router.get('/:id/applications', async (req, res) => {
  try {
    await connectToDatabase();
    const applications = await Application.find({ jobId: req.params.id })
      .populate('userId', 'name email avatar totalPoints')
      .sort({ appliedAt: -1 });
    
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error getting applications:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
