const express = require('express');
const Blog = require('../models/Blog');
const { protect, authorize, optionalAuth } = require('../middleware/auth');
const { blogValidation, validate, sanitizeInput } = require('../middleware/validation');

const router = express.Router();

// @route   GET /api/blog
// @desc    Get all published blog posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    let query = { status: 'published' };
    
    // Filter by category
    if (req.query.category && req.query.category !== 'all') {
      query.category = req.query.category;
    }
    
    // Search functionality
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }
    
    // Filter by tags
    if (req.query.tags) {
      const tags = req.query.tags.split(',');
      query.tags = { $in: tags };
    }
    
    // Sort options
    let sortOption = { publishedAt: -1 };
    if (req.query.sort) {
      switch (req.query.sort) {
        case 'newest':
          sortOption = { publishedAt: -1 };
          break;
        case 'oldest':
          sortOption = { publishedAt: 1 };
          break;
        case 'popular':
          sortOption = { views: -1 };
          break;
        case 'featured':
          sortOption = { featured: -1, publishedAt: -1 };
          break;
      }
    }
    
    const blogs = await Blog.find(query)
      .populate('author', 'name avatar')
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .select('-content') // Exclude full content for list view
      .lean();
    
    const total = await Blog.countDocuments(query);
    
    res.json({
      success: true,
      blogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Get blogs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting blogs'
    });
  }
});

// @route   GET /api/blog/featured
// @desc    Get featured blog posts
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const blogs = await Blog.find({ 
      featured: true, 
      status: 'published' 
    })
    .populate('author', 'name avatar')
    .sort({ publishedAt: -1 })
    .limit(3)
    .select('-content')
    .lean();
    
    res.json({
      success: true,
      blogs
    });
    
  } catch (error) {
    console.error('Get featured blogs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting featured blogs'
    });
  }
});

// @route   GET /api/blog/:slug
// @desc    Get single blog post by slug
// @access  Public
router.get('/:slug', optionalAuth, async (req, res) => {
  try {
    const blog = await Blog.findOne({ 
      slug: req.params.slug,
      status: 'published'
    }).populate('author', 'name avatar bio');
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    // Increment view count
    blog.views += 1;
    await blog.save();
    
    // Get related posts
    const relatedPosts = await Blog.find({
      _id: { $ne: blog._id },
      status: 'published',
      $or: [
        { category: blog.category },
        { tags: { $in: blog.tags } }
      ]
    })
    .populate('author', 'name avatar')
    .sort({ publishedAt: -1 })
    .limit(3)
    .select('-content')
    .lean();
    
    res.json({
      success: true,
      blog,
      relatedPosts
    });
    
  } catch (error) {
    console.error('Get blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting blog post'
    });
  }
});

// @route   POST /api/blog
// @desc    Create new blog post
// @access  Private/Admin
router.post('/', protect, authorize('admin'), sanitizeInput, blogValidation.create, validate, async (req, res) => {
  try {
    const blog = await Blog.create({
      ...req.body,
      author: req.user.id
    });
    
    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      blog
    });
    
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating blog post'
    });
  }
});

// @route   PUT /api/blog/:id
// @desc    Update blog post
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), sanitizeInput, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('author', 'name avatar');
    
    res.json({
      success: true,
      message: 'Blog post updated successfully',
      blog: updatedBlog
    });
    
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating blog post'
    });
  }
});

// @route   DELETE /api/blog/:id
// @desc    Delete blog post
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    await Blog.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
    
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting blog post'
    });
  }
});

// @route   POST /api/blog/:id/like
// @desc    Like/Unlike blog post
// @access  Public (can be enhanced with user tracking)
router.post('/:id/like', optionalAuth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    // Simple like increment (can be enhanced with user tracking)
    blog.likes.push({
      user: req.user ? req.user.id : null,
      date: new Date()
    });
    
    await blog.save();
    
    res.json({
      success: true,
      likes: blog.likes.length
    });
    
  } catch (error) {
    console.error('Like blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error liking blog post'
    });
  }
});

// @route   GET /api/blog/admin/all
// @desc    Get all blog posts including drafts (admin only)
// @access  Private/Admin
router.get('/admin/all', protect, authorize('admin'), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    let query = {};
    
    if (req.query.status) {
      query.status = req.query.status;
    }
    
    if (req.query.category) {
      query.category = req.query.category;
    }
    
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }
    
    const blogs = await Blog.find(query)
      .populate('author', 'name avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-content');
    
    const total = await Blog.countDocuments(query);
    
    res.json({
      success: true,
      blogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Get admin blogs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting blogs'
    });
  }
});

module.exports = router;
