const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Feedback = require('./models/Feedback');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://student-feedback-tracker-aaira.vercel.app', process.env.FRONTEND_URL].filter(Boolean),
  credentials: true
}));
app.use(express.json()); // Parse JSON request bodies

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/student_feedback';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
  });

// Routes

// GET route - Fetch all feedback
app.get('/api/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json({
      success: true,
      count: feedbacks.length,
      data: feedbacks
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch feedback',
      error: error.message
    });
  }
});

// DELETE route - Delete feedback by ID
app.delete('/api/feedback/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFeedback = await Feedback.findByIdAndDelete(id);
    
    if (!deletedFeedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Feedback deleted successfully',
      data: deletedFeedback
    });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete feedback',
      error: error.message
    });
  }
});

// PUT route - Update feedback by ID
app.put('/api/feedback/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, message } = req.body;
    
    if (!name || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both name and message'
      });
    }
    
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      id,
      { name: name.trim(), message: message.trim() },
      { new: true, runValidators: true }
    );
    
    if (!updatedFeedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Feedback updated successfully',
      data: updatedFeedback
    });
  } catch (error) {
    console.error('Error updating feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update feedback',
      error: error.message
    });
  }
});

// POST route - Submit new feedback
app.post('/api/feedback', async (req, res) => {
  try {
    const { name, message } = req.body;

    // Validate input
    if (!name || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both name and message'
      });
    }

    // Create new feedback document
    const newFeedback = new Feedback({
      name: name.trim(),
      message: message.trim()
    });

    // Save to MongoDB
    const savedFeedback = await newFeedback.save();

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
      data: savedFeedback
    });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit feedback',
      error: error.message
    });
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

