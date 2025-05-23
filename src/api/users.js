
import express from 'express';
import { connectToDatabase } from '../utils/mongodb';

const router = express.Router();

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    await connectToDatabase();
    // After connection, the models should be available
    const { User } = require('../utils/mongodb');
    
    const user = await User.findOne({ googleId: req.params.id });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
      college: user.college,
      skills: user.skills,
      experience: user.experience,
      totalPoints: user.totalPoints
    });
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new user
router.post('/', async (req, res) => {
  try {
    await connectToDatabase();
    // After connection, the models should be available
    const { User } = require('../utils/mongodb');
    
    const { email, name, role, avatar, googleId } = req.body;
    
    // Check if user already exists
    let existingUser = await User.findOne({ email });
    
    if (existingUser) {
      // Update existing user
      existingUser.name = name || existingUser.name;
      existingUser.avatar = avatar || existingUser.avatar;
      existingUser.googleId = googleId || existingUser.googleId;
      
      await existingUser.save();
      
      return res.status(200).json({
        id: existingUser._id,
        email: existingUser.email,
        name: existingUser.name,
        role: existingUser.role,
        avatar: existingUser.avatar,
        totalPoints: existingUser.totalPoints
      });
    }
    
    // Create new user
    const newUser = new User({
      email,
      name,
      role,
      avatar,
      googleId,
      totalPoints: 0
    });
    
    await newUser.save();
    
    res.status(201).json({
      id: newUser._id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      avatar: newUser.avatar,
      totalPoints: newUser.totalPoints
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    await connectToDatabase();
    // After connection, the models should be available
    const { User } = require('../utils/mongodb');
    
    const { name, college, skills, experience } = req.body;
    
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update user fields
    if (name) user.name = name;
    if (college) user.college = college;
    if (skills) user.skills = skills;
    if (experience) user.experience = experience;
    
    await user.save();
    
    res.status(200).json({
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
      college: user.college,
      skills: user.skills,
      experience: user.experience,
      totalPoints: user.totalPoints
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
