const express = require('express');
const Contact = require('../models/Contact');
const Project = require('../models/Project');
const Blog = require('../models/Blog');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/analytics/dashboard
// @desc    Get dashboard analytics data
// @access  Private/Admin
router.get('/dashboard', protect, authorize('admin'), async (req, res) => {
  try {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    // Get basic counts
    const [
      totalContacts,
      newContacts,
      totalProjects,
      totalBlogs,
      publishedBlogs,
      totalUsers
    ] = await Promise.all([
      Contact.countDocuments({ isSpam: { $ne: true } }),
      Contact.countDocuments({ 
        createdAt: { $gte: sevenDaysAgo },
        isSpam: { $ne: true }
      }),
      Project.countDocuments(),
      Blog.countDocuments(),
      Blog.countDocuments({ status: 'published' }),
      User.countDocuments()
    ]);
    
    // Contact status breakdown
    const contactStats = await Contact.aggregate([
      { $match: { isSpam: { $ne: true } } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Project category breakdown
    const projectStats = await Project.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalViews: { $sum: '$views' },
          totalLikes: { $sum: '$likes' }
        }
      }
    ]);
    
    // Blog category breakdown
    const blogStats = await Blog.aggregate([
      { $match: { status: 'published' } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalViews: { $sum: '$views' },
          totalLikes: { $sum: { $size: '$likes' } }
        }
      }
    ]);
    
    // Recent contacts trend (last 30 days)
    const contactsTrend = await Contact.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo },
          isSpam: { $ne: true }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$createdAt'
            }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id': 1 } }
    ]);
    
    // Popular projects (most viewed)
    const popularProjects = await Project.find({ isPublic: true })
      .sort({ views: -1 })
      .limit(5)
      .select('title views likes category')
      .lean();
    
    // Popular blog posts (most viewed)
    const popularBlogs = await Blog.find({ status: 'published' })
      .sort({ views: -1 })
      .limit(5)
      .select('title views category publishedAt')
      .lean();
    
    // Recent activities
    const recentContacts = await Contact.find({ isSpam: { $ne: true } })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email subject status createdAt')
      .lean();
    
    // Project type distribution
    const projectTypeStats = await Contact.aggregate([
      { $match: { isSpam: { $ne: true } } },
      {
        $group: {
          _id: '$projectType',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Monthly growth data
    const monthlyGrowth = await Contact.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(now.getFullYear(), now.getMonth() - 11, 1) },
          isSpam: { $ne: true }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          contacts: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);
    
    res.json({
      success: true,
      analytics: {
        overview: {
          totalContacts,
          newContacts,
          totalProjects,
          totalBlogs,
          publishedBlogs,
          totalUsers
        },
        contacts: {
          statusBreakdown: contactStats.reduce((acc, stat) => {
            acc[stat._id] = stat.count;
            return acc;
          }, {}),
          trend: contactsTrend,
          projectTypeDistribution: projectTypeStats.reduce((acc, stat) => {
            acc[stat._id] = stat.count;
            return acc;
          }, {}),
          monthlyGrowth
        },
        projects: {
          categoryBreakdown: projectStats,
          popular: popularProjects
        },
        blogs: {
          categoryBreakdown: blogStats,
          popular: popularBlogs
        },
        recent: {
          contacts: recentContacts
        }
      }
    });
    
  } catch (error) {
    console.error('Analytics dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting analytics data'
    });
  }
});

// @route   GET /api/analytics/contacts
// @desc    Get detailed contact analytics
// @access  Private/Admin
router.get('/contacts', protect, authorize('admin'), async (req, res) => {
  try {
    const { period = '30d' } = req.query;
    
    let startDate;
    const now = new Date();
    
    switch (period) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case '1y':
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }
    
    // Daily contacts trend
    const dailyTrend = await Contact.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
          isSpam: { $ne: true }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$createdAt'
            }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id': 1 } }
    ]);
    
    // Source distribution
    const sourceStats = await Contact.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
          isSpam: { $ne: true }
        }
      },
      {
        $group: {
          _id: '$source',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Budget distribution
    const budgetStats = await Contact.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
          isSpam: { $ne: true }
        }
      },
      {
        $group: {
          _id: '$budget',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Response time analysis
    const responseTimeStats = await Contact.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
          repliedAt: { $exists: true },
          isSpam: { $ne: true }
        }
      },
      {
        $project: {
          responseTimeHours: {
            $divide: [
              { $subtract: ['$repliedAt', '$createdAt'] },
              1000 * 60 * 60
            ]
          }
        }
      },
      {
        $group: {
          _id: null,
          avgResponseTime: { $avg: '$responseTimeHours' },
          minResponseTime: { $min: '$responseTimeHours' },
          maxResponseTime: { $max: '$responseTimeHours' }
        }
      }
    ]);
    
    res.json({
      success: true,
      analytics: {
        period,
        dailyTrend,
        sourceDistribution: sourceStats.reduce((acc, stat) => {
          acc[stat._id] = stat.count;
          return acc;
        }, {}),
        budgetDistribution: budgetStats.reduce((acc, stat) => {
          acc[stat._id] = stat.count;
          return acc;
        }, {}),
        responseTime: responseTimeStats[0] || {
          avgResponseTime: 0,
          minResponseTime: 0,
          maxResponseTime: 0
        }
      }
    });
    
  } catch (error) {
    console.error('Contact analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting contact analytics'
    });
  }
});

// @route   GET /api/analytics/projects
// @desc    Get project analytics
// @access  Private/Admin
router.get('/projects', protect, authorize('admin'), async (req, res) => {
  try {
    // View trends for projects
    const projectViews = await Project.aggregate([
      { $match: { isPublic: true } },
      {
        $group: {
          _id: '$category',
          totalViews: { $sum: '$views' },
          totalLikes: { $sum: '$likes' },
          projectCount: { $sum: 1 },
          avgViews: { $avg: '$views' }
        }
      }
    ]);
    
    // Technology popularity
    const techStats = await Project.aggregate([
      { $match: { isPublic: true } },
      { $unwind: '$technologies' },
      {
        $group: {
          _id: '$technologies',
          count: { $sum: 1 },
          totalViews: { $sum: '$views' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);
    
    // Project status distribution
    const statusStats = await Project.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    res.json({
      success: true,
      analytics: {
        categoryStats: projectViews,
        technologyStats: techStats,
        statusDistribution: statusStats.reduce((acc, stat) => {
          acc[stat._id] = stat.count;
          return acc;
        }, {})
      }
    });
    
  } catch (error) {
    console.error('Project analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting project analytics'
    });
  }
});

// @route   GET /api/analytics/blogs
// @desc    Get blog analytics
// @access  Private/Admin
router.get('/blogs', protect, authorize('admin'), async (req, res) => {
  try {
    // Blog view trends
    const blogViews = await Blog.aggregate([
      { $match: { status: 'published' } },
      {
        $group: {
          _id: '$category',
          totalViews: { $sum: '$views' },
          totalLikes: { $sum: { $size: '$likes' } },
          blogCount: { $sum: 1 },
          avgViews: { $avg: '$views' },
          avgReadTime: { $avg: '$readTime' }
        }
      }
    ]);
    
    // Monthly publishing trend
    const publishingTrend = await Blog.aggregate([
      { $match: { status: 'published' } },
      {
        $group: {
          _id: {
            year: { $year: '$publishedAt' },
            month: { $month: '$publishedAt' }
          },
          count: { $sum: 1 },
          totalViews: { $sum: '$views' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);
    
    // Tag popularity
    const tagStats = await Blog.aggregate([
      { $match: { status: 'published' } },
      { $unwind: '$tags' },
      {
        $group: {
          _id: '$tags',
          count: { $sum: 1 },
          totalViews: { $sum: '$views' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 15 }
    ]);
    
    res.json({
      success: true,
      analytics: {
        categoryStats: blogViews,
        publishingTrend,
        tagStats
      }
    });
    
  } catch (error) {
    console.error('Blog analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting blog analytics'
    });
  }
});

module.exports = router;
