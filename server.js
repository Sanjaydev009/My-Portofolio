const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Force this to be treated as a Node.js app
console.log('🚀 Starting Express Server for SPA Routing');
console.log('📍 Node.js version:', process.version);
console.log('🔧 Environment:', process.env.NODE_ENV || 'development');

// Add error handling and logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Check if dist folder exists
const distPath = path.join(__dirname, 'frontend', 'dist');
console.log('🔍 Checking dist path:', distPath);
console.log('📁 Dist exists:', fs.existsSync(distPath));

if (fs.existsSync(distPath)) {
  console.log('📋 Dist contents:', fs.readdirSync(distPath));
} else {
  console.error('❌ CRITICAL: frontend/dist folder not found!');
  console.log('📁 Current directory contents:', fs.readdirSync(__dirname));
  process.exit(1);
}

// Serve static files from the React app build (correct path for our structure)
app.use(express.static(distPath));

// Add a health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    distPath: distPath,
    distExists: fs.existsSync(distPath)
  });
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  console.log('🎯 Serving index.html from:', indexPath);
  console.log('📄 Index exists:', fs.existsSync(indexPath));
  
  if (!fs.existsSync(indexPath)) {
    console.error('❌ index.html not found!');
    return res.status(404).send('index.html not found');
  }
  
  res.sendFile(indexPath);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📁 Serving files from: ${path.join(__dirname, 'frontend', 'dist')}`);
});
