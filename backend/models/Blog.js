const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog title is required'],
    trim: true,
    maxLength: [150, 'Title cannot exceed 150 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: [true, 'Blog excerpt is required'],
    maxLength: [300, 'Excerpt cannot exceed 300 characters']
  },
  content: {
    type: String,
    required: [true, 'Blog content is required']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  featuredImage: {
    url: String,
    caption: String,
    alt: String
  },
  category: {
    type: String,
    required: true,
    enum: ['technology', 'tutorial', 'career', 'personal', 'review', 'other']
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  publishedAt: {
    type: Date
  },
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  comments: [{
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
      type: String,
      required: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    comment: {
      type: String,
      required: true,
      maxLength: [500, 'Comment cannot exceed 500 characters']
    },
    isApproved: {
      type: Boolean,
      default: false
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  readTime: {
    type: Number, // in minutes
    default: 1
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Middleware to generate slug from title
blogSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  }
  
  // Calculate read time based on content
  if (this.isModified('content')) {
    const wordsPerMinute = 200;
    const wordCount = this.content.split(/\s+/).length;
    this.readTime = Math.ceil(wordCount / wordsPerMinute);
  }
  
  // Set publishedAt date when status changes to published
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  next();
});

// Index for better search performance
blogSchema.index({ title: 'text', content: 'text', tags: 'text' });
blogSchema.index({ status: 1, publishedAt: -1 });
blogSchema.index({ slug: 1 });
blogSchema.index({ category: 1, featured: -1 });

module.exports = mongoose.model('Blog', blogSchema);
