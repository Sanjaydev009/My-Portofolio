const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxLength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    maxLength: [1000, 'Description cannot exceed 1000 characters']
  },
  shortDescription: {
    type: String,
    required: [true, 'Short description is required'],
    maxLength: [200, 'Short description cannot exceed 200 characters']
  },
  technologies: [{
    type: String,
    required: true
  }],
  images: [{
    url: String,
    caption: String,
    isMain: {
      type: Boolean,
      default: false
    }
  }],
  links: {
    demo: {
      type: String,
      validate: {
        validator: function(v) {
          return !v || /^https?:\/\/.+/.test(v);
        },
        message: 'Demo link must be a valid URL'
      }
    },
    github: {
      type: String,
      validate: {
        validator: function(v) {
          return !v || /^https?:\/\/.+/.test(v);
        },
        message: 'GitHub link must be a valid URL'
      }
    },
    website: {
      type: String,
      validate: {
        validator: function(v) {
          return !v || /^https?:\/\/.+/.test(v);
        },
        message: 'Website link must be a valid URL'
      }
    }
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'desktop', 'api', 'other']
  },
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'planned'],
    default: 'completed'
  },
  featured: {
    type: Boolean,
    default: false
  },
  priority: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String,
    trim: true
  }],
  challenges: {
    type: String,
    maxLength: [500, 'Challenges cannot exceed 500 characters']
  },
  solutions: {
    type: String,
    maxLength: [500, 'Solutions cannot exceed 500 characters']
  },
  duration: {
    type: String,
    trim: true
  },
  teamSize: {
    type: Number,
    min: 1,
    default: 1
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better performance
projectSchema.index({ title: 'text', description: 'text', tags: 'text' });
projectSchema.index({ category: 1, featured: -1, priority: -1 });
projectSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Project', projectSchema);
