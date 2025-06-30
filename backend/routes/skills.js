const express = require('express');
const Skill = require('../models/Skill');
const { protect, authorize } = require('../middleware/auth');
const { skillValidation, validate, sanitizeInput } = require('../middleware/validation');

const router = express.Router();

// @route   GET /api/skills
// @desc    Get all visible skills
// @access  Public
router.get('/', async (req, res) => {
  try {
    let query = { isVisible: true };
    
    // Filter by category
    if (req.query.category && req.query.category !== 'all') {
      query.category = req.query.category;
    }
    
    // Sort by order and proficiency
    const skills = await Skill.find(query)
      .populate('projects', 'title slug')
      .sort({ order: 1, proficiency: -1 })
      .lean();
    
    // Group by category
    const skillsByCategory = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {});
    
    res.json({
      success: true,
      skills,
      skillsByCategory,
      categories: ['frontend', 'backend', 'database', 'mobile', 'devops', 'design', 'other']
    });
    
  } catch (error) {
    console.error('Get skills error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting skills'
    });
  }
});

// @route   GET /api/skills/:id
// @desc    Get single skill
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id)
      .populate('projects', 'title slug shortDescription images');
    
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }
    
    if (!skill.isVisible) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }
    
    res.json({
      success: true,
      skill
    });
    
  } catch (error) {
    console.error('Get skill error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting skill'
    });
  }
});

// @route   POST /api/skills
// @desc    Create new skill
// @access  Private/Admin
router.post('/', protect, authorize('admin'), sanitizeInput, skillValidation.create, validate, async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Skill created successfully',
      skill
    });
    
  } catch (error) {
    console.error('Create skill error:', error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Skill with this name already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error creating skill'
    });
  }
});

// @route   PUT /api/skills/:id
// @desc    Update skill
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), sanitizeInput, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }
    
    const updatedSkill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      message: 'Skill updated successfully',
      skill: updatedSkill
    });
    
  } catch (error) {
    console.error('Update skill error:', error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Skill with this name already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error updating skill'
    });
  }
});

// @route   DELETE /api/skills/:id
// @desc    Delete skill
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }
    
    await Skill.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Skill deleted successfully'
    });
    
  } catch (error) {
    console.error('Delete skill error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting skill'
    });
  }
});

// @route   PUT /api/skills/reorder
// @desc    Reorder skills
// @access  Private/Admin
router.put('/reorder', protect, authorize('admin'), async (req, res) => {
  try {
    const { skills } = req.body; // Array of { id, order }
    
    if (!Array.isArray(skills)) {
      return res.status(400).json({
        success: false,
        message: 'Skills array is required'
      });
    }
    
    // Update each skill's order
    const updatePromises = skills.map(({ id, order }) => 
      Skill.findByIdAndUpdate(id, { order }, { new: true })
    );
    
    await Promise.all(updatePromises);
    
    res.json({
      success: true,
      message: 'Skills reordered successfully'
    });
    
  } catch (error) {
    console.error('Reorder skills error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error reordering skills'
    });
  }
});

// @route   GET /api/skills/admin/all
// @desc    Get all skills including hidden ones (admin only)
// @access  Private/Admin
router.get('/admin/all', protect, authorize('admin'), async (req, res) => {
  try {
    const skills = await Skill.find()
      .populate('projects', 'title slug')
      .sort({ category: 1, order: 1 });
    
    res.json({
      success: true,
      skills
    });
    
  } catch (error) {
    console.error('Get admin skills error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting skills'
    });
  }
});

module.exports = router;
