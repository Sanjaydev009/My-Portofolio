const express = require('express');
const path = require('path');
const app = express();

// Add error handling and logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Serve static files from the React app build (correct path for our structure)
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'frontend', 'dist', 'index.html');
  console.log('Serving index.html from:', indexPath);
  res.sendFile(indexPath);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📁 Serving files from: ${path.join(__dirname, 'frontend', 'dist')}`);
});
