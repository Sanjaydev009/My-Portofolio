# Render.com Deployment Configuration

## Build Settings in Render Dashboard:
- **Build Command**: `cd frontend && npm ci --legacy-peer-deps && npm run build`
- **Publish Directory**: `frontend/dist`
- **Environment**: `Static Site`

## Important Notes:
1. Make sure to use `npm ci --legacy-peer-deps` for consistent builds
2. The `frontend/dist` folder contains all built assets
3. Assets are bundled with hashes (e.g., `sanju-CXYmJaON.jpg`)
4. SPA routing is handled by `_redirects` file

## Static Files Structure:
```
frontend/dist/
├── index.html          # Main app entry
├── _redirects          # Routing configuration
├── _headers            # HTTP headers
├── assets/             # Bundled assets (CSS, JS, images, PDFs)
├── documents/          # Legacy path (if needed)
├── images/             # Legacy path (if needed)
└── vite.svg           # Static files
```

## Manual Render Setup Steps:
1. Connect your GitHub repository
2. Select "Static Site" service type
3. Set build command: `cd frontend && npm ci --legacy-peer-deps && npm run build`
4. Set publish directory: `frontend/dist`
5. Deploy

## Troubleshooting:
- If routes like `/about` show 404: Check `_redirects` file is in `dist/`
- If assets don't load: Check `assets/` folder in `dist/`
- If build fails: Ensure Node.js version 18+ is used
