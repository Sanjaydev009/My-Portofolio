const mongoose = require('mongoose');
const User = require('../models/User');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Create default admin user if it doesn't exist
    await createDefaultAdmin();
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const createDefaultAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@portfolio.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123456';
    
    // Check if admin user exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (!existingAdmin) {
      const adminUser = await User.create({
        name: 'Admin User',
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
        bio: 'Default admin user for the portfolio website'
      });
      
      console.log('✅ Default admin user created:', adminEmail);
      console.log('🔑 Default admin password:', adminPassword);
      console.log('⚠️  Please change the default password after first login');
    }
  } catch (error) {
    console.error('❌ Error creating default admin:', error);
  }
};

module.exports = connectDB;
