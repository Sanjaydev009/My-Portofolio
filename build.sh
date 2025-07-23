# Build script for deployment
#!/bin/bash

echo "Starting deployment build process..."

# Navigate to frontend directory
cd frontend

# Install dependencies with legacy peer deps
npm install --legacy-peer-deps

# Build for production
npm run build

echo "Build completed successfully!"
