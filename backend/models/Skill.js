const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    trim: true,
    unique: true,
    maxLength: [50, 'Skill name cannot exceed 50 characters']
  },
  category: {
    type: String,
    required: [true, 'Skill category is required'],
    enum: ['frontend', 'backend', 'database', 'mobile', 'devops', 'design', 'other']
  },
  proficiency: {
    type: Number,
    required: [true, 'Proficiency level is required'],
    min: [1, 'Proficiency must be at least 1'],
    max: [100, 'Proficiency cannot exceed 100']
  },
  experience: {
    type: String,
    required: [true, 'Experience is required'],
    enum: ['beginner', 'intermediate', 'advanced', 'expert']
  },
  yearsOfExperience: {
    type: Number,
    min: [0, 'Years of experience cannot be negative'],
    max: [50, 'Years of experience seems too high']
  },
  icon: {
    type: String, // URL to icon or icon class name
    trim: true
  },
  color: {
    type: String,
    default: '#3498db'
  },
  description: {
    type: String,
    maxLength: [200, 'Description cannot exceed 200 characters']
  },
  certifications: [{
    name: String,
    issuer: String,
    date: Date,
    url: String
  }],
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }],
  isVisible: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }]
}, {
  timestamps: true
});

// Index for better performance
skillSchema.index({ category: 1, proficiency: -1 });
skillSchema.index({ order: 1 });
skillSchema.index({ isVisible: 1 });

module.exports = mongoose.model('Skill', skillSchema);
