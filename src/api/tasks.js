
import express from 'express';
import { connectToDatabase } from '../utils/mongodb';

const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
  try {
    await connectToDatabase();
    // After connection, the models should be available
    const { Task } = require('../utils/mongodb');
    
    const tasks = await Task.find({ isActive: true });
    
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error getting tasks:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new task (admin only)
router.post('/', async (req, res) => {
  try {
    await connectToDatabase();
    // After connection, the models should be available
    const { Task } = require('../utils/mongodb');
    
    const { name, description, points, type } = req.body;
    
    const newTask = new Task({
      name,
      description,
      points,
      type,
      isActive: true
    });
    
    await newTask.save();
    
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Complete task
router.post('/:id/complete', async (req, res) => {
  try {
    await connectToDatabase();
    // After connection, the models should be available
    const { Task, TaskCompletion, User } = require('../utils/mongodb');
    
    const { userId } = req.body;
    
    // Check if task exists
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    // Check if task is daily and already completed today
    if (task.type === 'daily') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const alreadyCompleted = await TaskCompletion.findOne({
        userId,
        taskId: req.params.id,
        completedAt: { $gte: today, $lt: tomorrow }
      });
      
      if (alreadyCompleted) {
        return res.status(400).json({ message: 'You have already completed this task today' });
      }
    }
    
    // Check if task is 'once' and already completed
    if (task.type === 'once') {
      const alreadyCompleted = await TaskCompletion.findOne({
        userId,
        taskId: req.params.id
      });
      
      if (alreadyCompleted) {
        return res.status(400).json({ message: 'You have already completed this one-time task' });
      }
    }
    
    // Create task completion record
    const taskCompletion = new TaskCompletion({
      userId,
      taskId: req.params.id,
      pointsEarned: task.points
    });
    
    await taskCompletion.save();
    
    // Update user's total points
    await User.findByIdAndUpdate(
      userId,
      { $inc: { totalPoints: task.points } }
    );
    
    res.status(201).json({
      message: 'Task completed successfully',
      pointsEarned: task.points
    });
  } catch (error) {
    console.error('Error completing task:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
