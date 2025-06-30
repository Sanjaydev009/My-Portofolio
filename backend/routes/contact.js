const express = require('express');
const Contact = require('../models/Contact');
const { protect, authorize } = require('../middleware/auth');
const { contactValidation, validate, sanitizeInput } = require('../middleware/validation');
const nodemailer = require('nodemailer');

const router = express.Router();

// Email transporter setup
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', sanitizeInput, contactValidation.create, validate, async (req, res) => {
  try {
    const contactData = {
      ...req.body,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent')
    };
    
    const contact = await Contact.create(contactData);
    
    // Send notification email to admin
    try {
      const transporter = createTransporter();
      
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_USER,
        subject: `New Contact Form Submission: ${contact.subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #2c3e50;">Contact Details</h3>
              <p><strong>Name:</strong> ${contact.name}</p>
              <p><strong>Email:</strong> ${contact.email}</p>
              <p><strong>Phone:</strong> ${contact.phone || 'Not provided'}</p>
              <p><strong>Company:</strong> ${contact.company || 'Not provided'}</p>
              <p><strong>Project Type:</strong> ${contact.projectType}</p>
              <p><strong>Budget:</strong> ${contact.budget}</p>
              <p><strong>Timeline:</strong> ${contact.timeline}</p>
            </div>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #2c3e50;">Subject</h3>
              <p style="background: #fff; padding: 15px; border-left: 4px solid #3498db; margin: 0;">
                ${contact.subject}
              </p>
            </div>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #2c3e50;">Message</h3>
              <div style="background: #fff; padding: 15px; border-left: 4px solid #27ae60; white-space: pre-wrap;">
                ${contact.message}
              </div>
            </div>
            
            <div style="background: #ecf0f1; padding: 15px; border-radius: 5px; margin-top: 20px;">
              <p style="margin: 0; font-size: 12px; color: #7f8c8d;">
                <strong>Submitted:</strong> ${new Date(contact.createdAt).toLocaleString()}<br>
                <strong>IP Address:</strong> ${contact.ipAddress}<br>
                <strong>Contact ID:</strong> ${contact._id}
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="${process.env.FRONTEND_URL}/admin/contacts/${contact._id}" 
                 style="background: #3498db; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block;">
                View in Admin Panel
              </a>
            </div>
          </div>
        `
      };
      
      await transporter.sendMail(mailOptions);
      
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Don't fail the request if email fails
    }
    
    // Emit real-time notification to admin
    const io = req.app.get('io');
    if (io) {
      io.to('admin').emit('contact-notification', {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        createdAt: contact.createdAt
      });
    }
    
    res.status(201).json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
      contactId: contact._id
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again later.'
    });
  }
});

// @route   GET /api/contact
// @desc    Get all contact submissions (admin only)
// @access  Private/Admin
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    let query = {};
    
    // Filter by status
    if (req.query.status && req.query.status !== 'all') {
      query.status = req.query.status;
    }
    
    // Filter by priority
    if (req.query.priority) {
      query.priority = req.query.priority;
    }
    
    // Filter by project type
    if (req.query.projectType) {
      query.projectType = req.query.projectType;
    }
    
    // Search functionality
    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } },
        { subject: { $regex: req.query.search, $options: 'i' } },
        { message: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    
    // Filter spam
    if (req.query.includeSpam !== 'true') {
      query.isSpam = { $ne: true };
    }
    
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Contact.countDocuments(query);
    
    // Get counts for dashboard
    const stats = await Contact.aggregate([
      { $match: { isSpam: { $ne: true } } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    res.json({
      success: true,
      contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      stats: stats.reduce((acc, stat) => {
        acc[stat._id] = stat.count;
        return acc;
      }, {})
    });
    
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting contacts'
    });
  }
});

// @route   GET /api/contact/:id
// @desc    Get single contact submission
// @access  Private/Admin
router.get('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }
    
    // Mark as read if it's new
    if (contact.status === 'new') {
      contact.status = 'read';
      await contact.save();
    }
    
    res.json({
      success: true,
      contact
    });
    
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting contact'
    });
  }
});

// @route   PUT /api/contact/:id/status
// @desc    Update contact status
// @access  Private/Admin
router.put('/:id/status', protect, authorize('admin'), async (req, res) => {
  try {
    const { status, priority, notes } = req.body;
    
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }
    
    if (status) contact.status = status;
    if (priority) contact.priority = priority;
    if (notes !== undefined) contact.notes = notes;
    
    await contact.save();
    
    res.json({
      success: true,
      message: 'Contact updated successfully',
      contact
    });
    
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating contact'
    });
  }
});

// @route   POST /api/contact/:id/reply
// @desc    Reply to contact submission
// @access  Private/Admin
router.post('/:id/reply', protect, authorize('admin'), sanitizeInput, async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Reply message is required'
      });
    }
    
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }
    
    // Send reply email
    try {
      const transporter = createTransporter();
      
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: contact.email,
        subject: `Re: ${contact.subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Thank you for contacting me!</h2>
            
            <p>Hi ${contact.name},</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
              ${message.replace(/\n/g, '<br>')}
            </div>
            
            <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
              <p style="font-size: 14px; color: #666;">
                <strong>Your original message:</strong><br>
                <em>Subject: ${contact.subject}</em><br>
                ${contact.message.replace(/\n/g, '<br>')}
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f1f2f6;">
              <p style="margin: 0; color: #666;">
                Best regards,<br>
                <strong>Your Name</strong>
              </p>
            </div>
          </div>
        `
      };
      
      await transporter.sendMail(mailOptions);
      
      // Add reply to contact record
      contact.replies.push({
        message,
        sentBy: req.user.id
      });
      
      contact.status = 'replied';
      contact.repliedAt = new Date();
      
      await contact.save();
      
      res.json({
        success: true,
        message: 'Reply sent successfully'
      });
      
    } catch (emailError) {
      console.error('Reply email error:', emailError);
      res.status(500).json({
        success: false,
        message: 'Error sending reply email'
      });
    }
    
  } catch (error) {
    console.error('Reply to contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error sending reply'
    });
  }
});

// @route   DELETE /api/contact/:id
// @desc    Delete contact submission
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }
    
    await Contact.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Contact submission deleted successfully'
    });
    
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting contact'
    });
  }
});

// @route   PUT /api/contact/:id/spam
// @desc    Mark contact as spam
// @access  Private/Admin
router.put('/:id/spam', protect, authorize('admin'), async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isSpam: true, status: 'archived' },
      { new: true }
    );
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Contact marked as spam'
    });
    
  } catch (error) {
    console.error('Mark spam error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error marking as spam'
    });
  }
});

module.exports = router;
