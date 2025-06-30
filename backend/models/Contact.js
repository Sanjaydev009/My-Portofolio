const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxLength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxLength: [100, 'Subject cannot exceed 100 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    maxLength: [1000, 'Message cannot exceed 1000 characters']
  },
  phone: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^[\+]?[1-9][\d]{0,15}$/.test(v);
      },
      message: 'Please enter a valid phone number'
    }
  },
  company: {
    type: String,
    trim: true,
    maxLength: [100, 'Company name cannot exceed 100 characters']
  },
  projectType: {
    type: String,
    enum: ['web-development', 'mobile-app', 'consultation', 'collaboration', 'other'],
    default: 'other'
  },
  budget: {
    type: String,
    enum: ['<$1000', '$1000-$5000', '$5000-$10000', '$10000+', 'negotiable'],
    default: 'negotiable'
  },
  timeline: {
    type: String,
    enum: ['asap', '1-month', '2-3 months', '3-6 months', 'flexible'],
    default: 'flexible'
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'in-progress', 'completed', 'archived'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  notes: {
    type: String,
    maxLength: [500, 'Notes cannot exceed 500 characters']
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  },
  source: {
    type: String,
    enum: ['website', 'linkedin', 'email', 'referral', 'other'],
    default: 'website'
  },
  isSpam: {
    type: Boolean,
    default: false
  },
  repliedAt: {
    type: Date
  },
  replies: [{
    message: String,
    sentAt: {
      type: Date,
      default: Date.now
    },
    sentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }]
}, {
  timestamps: true
});

// Index for better performance
contactSchema.index({ createdAt: -1 });
contactSchema.index({ status: 1, priority: -1 });
contactSchema.index({ email: 1 });
contactSchema.index({ isSpam: 1 });

module.exports = mongoose.model('Contact', contactSchema);
