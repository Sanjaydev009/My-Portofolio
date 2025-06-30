const { body, validationResult } = require('express-validator');

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(error => ({
        field: error.param || error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  
  next();
};

// User validation rules
const userValidation = {
  register: [
    body('name')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 2 and 50 characters'),
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
  ],
  
  login: [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email'),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
  ]
};

// Project validation rules
const projectValidation = {
  create: [
    body('title')
      .trim()
      .isLength({ min: 3, max: 100 })
      .withMessage('Title must be between 3 and 100 characters'),
    body('description')
      .trim()
      .isLength({ min: 10, max: 1000 })
      .withMessage('Description must be between 10 and 1000 characters'),
    body('shortDescription')
      .trim()
      .isLength({ min: 10, max: 200 })
      .withMessage('Short description must be between 10 and 200 characters'),
    body('technologies')
      .isArray({ min: 1 })
      .withMessage('At least one technology must be specified'),
    body('category')
      .isIn(['web', 'mobile', 'desktop', 'api', 'other'])
      .withMessage('Invalid project category')
  ]
};

// Blog validation rules
const blogValidation = {
  create: [
    body('title')
      .trim()
      .isLength({ min: 5, max: 150 })
      .withMessage('Title must be between 5 and 150 characters'),
    body('excerpt')
      .trim()
      .isLength({ min: 10, max: 300 })
      .withMessage('Excerpt must be between 10 and 300 characters'),
    body('content')
      .trim()
      .isLength({ min: 100 })
      .withMessage('Content must be at least 100 characters'),
    body('category')
      .isIn(['technology', 'tutorial', 'career', 'personal', 'review', 'other'])
      .withMessage('Invalid blog category')
  ]
};

// Contact validation rules
const contactValidation = {
  create: [
    body('name')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 2 and 50 characters'),
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email'),
    body('subject')
      .trim()
      .isLength({ min: 5, max: 100 })
      .withMessage('Subject must be between 5 and 100 characters'),
    body('message')
      .trim()
      .isLength({ min: 10, max: 1000 })
      .withMessage('Message must be between 10 and 1000 characters'),
    body('phone')
      .optional()
      .isMobilePhone()
      .withMessage('Please provide a valid phone number'),
    body('projectType')
      .optional()
      .isIn(['web-development', 'mobile-app', 'consultation', 'collaboration', 'other'])
      .withMessage('Invalid project type')
  ]
};

// Skill validation rules
const skillValidation = {
  create: [
    body('name')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Skill name must be between 2 and 50 characters'),
    body('category')
      .isIn(['frontend', 'backend', 'database', 'mobile', 'devops', 'design', 'other'])
      .withMessage('Invalid skill category'),
    body('proficiency')
      .isInt({ min: 1, max: 100 })
      .withMessage('Proficiency must be between 1 and 100'),
    body('experience')
      .isIn(['beginner', 'intermediate', 'advanced', 'expert'])
      .withMessage('Invalid experience level')
  ]
};

// Sanitize input middleware
const sanitizeInput = (req, res, next) => {
  // Remove any potential XSS attacks
  const sanitizeString = (str) => {
    if (typeof str === 'string') {
      return str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    }
    return str;
  };

  const sanitizeObject = (obj) => {
    for (let key in obj) {
      if (typeof obj[key] === 'string') {
        obj[key] = sanitizeString(obj[key]);
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        sanitizeObject(obj[key]);
      }
    }
  };

  if (req.body) {
    sanitizeObject(req.body);
  }

  next();
};

module.exports = {
  validate,
  userValidation,
  projectValidation,
  blogValidation,
  contactValidation,
  skillValidation,
  sanitizeInput
};
