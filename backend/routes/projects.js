const express = require('express');
const Project = require('../models/Project');
const { protect, authorize, optionalAuth } = require('../middleware/auth');
const { projectValidation, validate, sanitizeInput } = require('../middleware/validation');

const router = express.Router();

// @route   GET /api/projects
// @desc    Get all projects (public)
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    
    // Build query
    let query = { isPublic: true };
    
    // Filter by category
    if (req.query.category && req.query.category !== 'all') {
      query.category = req.query.category;
    }
    
    // Filter by featured
    if (req.query.featured === 'true') {
      query.featured = true;
    }
    
    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }
    
    // Search functionality
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }
    
    // Filter by technologies
    if (req.query.tech) {
      const technologies = req.query.tech.split(',');
      query.technologies = { $in: technologies };
    }
    
    // Sort options
    let sortOption = { priority: -1, createdAt: -1 };
    if (req.query.sort) {
      switch (req.query.sort) {
        case 'newest':
          sortOption = { createdAt: -1 };
          break;
        case 'oldest':
          sortOption = { createdAt: 1 };
          break;
        case 'popular':
          sortOption = { views: -1, likes: -1 };
          break;
        case 'featured':
          sortOption = { featured: -1, priority: -1 };
          break;
      }
    }
    
    const projects = await Project.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean();
    
    const total = await Project.countDocuments(query);
    
    res.json({
      success: true,
      projects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      filters: {
        categories: ['web', 'mobile', 'desktop', 'api', 'other'],
        statuses: ['completed', 'in-progress', 'planned']
      }
    });
    
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting projects'
    });
  }
});

// @route   GET /api/projects/featured
// @desc    Get featured projects
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const projects = await Project.find({ 
      featured: true, 
      isPublic: true 
    })
    .sort({ priority: -1, createdAt: -1 })
    .limit(6)
    .lean();
    
    res.json({
      success: true,
      projects
    });
    
  } catch (error) {
    console.error('Get featured projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting featured projects'
    });
  }
});

// @route   GET /api/projects/:id
// @desc    Get single project
// @access  Public
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    // Check if project is public or user is admin
    if (!project.isPublic && (!req.user || req.user.role !== 'admin')) {
      return res.status(403).json({
        success: false,
        message: 'Access denied to this project'
      });
    }
    
    // Increment view count
    project.views += 1;
    await project.save();
    
    res.json({
      success: true,
      project
    });
    
  } catch (error) {
    console.error('Get project error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error getting project'
    });
  }
});

// @route   POST /api/projects
// @desc    Create new project
// @access  Private/Admin
router.post('/', protect, authorize('admin'), sanitizeInput, projectValidation.create, validate, async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      author: req.user.id
    });
    
    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      project
    });
    
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating project'
    });
  }
});

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), sanitizeInput, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      message: 'Project updated successfully',
      project: updatedProject
    });
    
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating project'
    });
  }
});

// @route   DELETE /api/projects/:id
// @desc    Delete project
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    await Project.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
    
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting project'
    });
  }
});

// @route   POST /api/projects/:id/like
// @desc    Like/Unlike project
// @access  Public
router.post('/:id/like', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    project.likes += 1;
    await project.save();
    
    res.json({
      success: true,
      likes: project.likes
    });
    
  } catch (error) {
    console.error('Like project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error liking project'
    });
  }
});

// @route   GET /api/projects/admin/all
// @desc    Get all projects including private ones (admin only)
// @access  Private/Admin
router.get('/admin/all', protect, authorize('admin'), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    let query = {};
    
    if (req.query.category) {
      query.category = req.query.category;
    }
    
    if (req.query.status) {
      query.status = req.query.status;
    }
    
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }
    
    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Project.countDocuments(query);
    
    res.json({
      success: true,
      projects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Get admin projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting projects'
    });
  }
});

module.exports = router;
