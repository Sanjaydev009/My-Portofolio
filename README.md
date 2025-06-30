# 🚀 Modern Portfolio Website - MERN Stack

A full-featured, production-ready portfolio website built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring real-time capabilities, admin panel, blog system, and modern UI/UX.

## ✨ Features

### 🎨 Frontend Features

- **Modern UI/UX** with Material-UI and Framer Motion animations
- **Responsive Design** that works on all devices
- **Dark/Light Theme** with system preference detection
- **Portfolio Showcase** with project filtering and search
- **Blog System** with rich content and social features
- **Contact Form** with real-time validation
- **Real-time Notifications** via Socket.io
- **Progressive Web App** (PWA) capabilities
- **SEO Optimized** with meta tags and structured data

## 🛠️ Technical Stack

### Frontend

- **React 19** with TypeScript
- **Material-UI v7** for components
- **Framer Motion** for animations
- **React Router v7** for navigation
- **React Query** for data fetching
- **React Hook Form** with Yup validation
- **Axios** for API calls
- **Socket.io Client** for real-time features

### Backend

- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Socket.io** for real-time features
- **Multer** for file uploads
- **Nodemailer** for email
- **Express Rate Limit** for API protection
- **Helmet** for security headers

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd My-Portofolio
   ```

2. **Install all dependencies**

   ```bash
   npm run install-all
   ```

3. **Set up environment variables**

   **Backend (.env)**

   ```bash
   cd backend
   cp .env.example .env
   ```

   Edit backend/.env with your values (see .env.example for all options)

4. **Start the application**

   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5001/api

```bash
npm run install-all
```

3. Set up environment variables (see .env.example files)

4. Run the development server

```bash
npm run dev
```

## Project Structure

```
My-Portofolio/
├── frontend/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── utils/
│   └── public/
├── backend/           # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── utils/
└── docs/             # Documentation
```

## Deployment

### Frontend (Vercel/Netlify)

- Build command: `npm run build`
- Output directory: `frontend/build`

### Backend (Heroku/Railway)

- Start command: `npm start`
- Environment variables required

## License

MIT License - see LICENSE file for details
