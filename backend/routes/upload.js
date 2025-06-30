const express = require('express');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// @route   POST /api/upload/image
// @desc    Upload image to Cloudinary
// @access  Private/Admin
router.post('/image', protect, authorize('admin'), upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }
    
    // Get upload options from request
    const { folder = 'portfolio', quality = 'auto', format = 'auto' } = req.body;
    
    // Convert buffer to base64
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;
    
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: `portfolio/${folder}`,
      quality,
      format,
      transformation: [
        { quality: 'auto:best' },
        { fetch_format: 'auto' }
      ]
    });
    
    res.json({
      success: true,
      message: 'Image uploaded successfully',
      image: {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        size: result.bytes
      }
    });
    
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading image',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @route   POST /api/upload/multiple
// @desc    Upload multiple images to Cloudinary
// @access  Private/Admin
router.post('/multiple', protect, authorize('admin'), upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No image files provided'
      });
    }
    
    const { folder = 'portfolio', quality = 'auto', format = 'auto' } = req.body;
    
    // Upload all images
    const uploadPromises = req.files.map(async (file) => {
      const b64 = Buffer.from(file.buffer).toString('base64');
      let dataURI = 'data:' + file.mimetype + ';base64,' + b64;
      
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: `portfolio/${folder}`,
        quality,
        format,
        transformation: [
          { quality: 'auto:best' },
          { fetch_format: 'auto' }
        ]
      });
      
      return {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        size: result.bytes,
        originalName: file.originalname
      };
    });
    
    const images = await Promise.all(uploadPromises);
    
    res.json({
      success: true,
      message: `${images.length} images uploaded successfully`,
      images
    });
    
  } catch (error) {
    console.error('Multiple image upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading images',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @route   DELETE /api/upload/:publicId
// @desc    Delete image from Cloudinary
// @access  Private/Admin
router.delete('/:publicId', protect, authorize('admin'), async (req, res) => {
  try {
    const { publicId } = req.params;
    
    // Decode the publicId (it might be URL encoded)
    const decodedPublicId = decodeURIComponent(publicId);
    
    const result = await cloudinary.uploader.destroy(decodedPublicId);
    
    if (result.result === 'ok') {
      res.json({
        success: true,
        message: 'Image deleted successfully'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Image not found or already deleted'
      });
    }
    
  } catch (error) {
    console.error('Image delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting image',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @route   GET /api/upload/images
// @desc    Get all uploaded images from Cloudinary
// @access  Private/Admin
router.get('/images', protect, authorize('admin'), async (req, res) => {
  try {
    const { folder = 'portfolio', max_results = 50 } = req.query;
    
    const result = await cloudinary.search
      .expression(`folder:${folder}/*`)
      .sort_by([['created_at', 'desc']])
      .max_results(max_results)
      .execute();
    
    const images = result.resources.map(resource => ({
      url: resource.secure_url,
      publicId: resource.public_id,
      width: resource.width,
      height: resource.height,
      format: resource.format,
      size: resource.bytes,
      createdAt: resource.created_at
    }));
    
    res.json({
      success: true,
      images,
      total: result.total_count
    });
    
  } catch (error) {
    console.error('Get images error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching images',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// @route   POST /api/upload/transform
// @desc    Transform existing image on Cloudinary
// @access  Private/Admin
router.post('/transform', protect, authorize('admin'), async (req, res) => {
  try {
    const { publicId, transformations } = req.body;
    
    if (!publicId || !transformations) {
      return res.status(400).json({
        success: false,
        message: 'Public ID and transformations are required'
      });
    }
    
    // Generate transformed URL
    const transformedUrl = cloudinary.url(publicId, {
      ...transformations,
      secure: true
    });
    
    res.json({
      success: true,
      message: 'Image transformation URL generated',
      transformedUrl,
      originalUrl: cloudinary.url(publicId, { secure: true })
    });
    
  } catch (error) {
    console.error('Image transform error:', error);
    res.status(500).json({
      success: false,
      message: 'Error transforming image',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
});

// Error handling middleware for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size too large. Maximum size is 10MB.'
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files. Maximum is 10 files.'
      });
    }
  }
  
  if (error.message === 'Only image files are allowed') {
    return res.status(400).json({
      success: false,
      message: 'Only image files are allowed'
    });
  }
  
  console.error('Upload middleware error:', error);
  res.status(500).json({
    success: false,
    message: 'Error processing upload'
  });
});

module.exports = router;
