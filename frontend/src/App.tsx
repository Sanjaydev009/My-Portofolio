import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, CircularProgress, Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Context Providers
import { CustomThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
// import { SocketProvider } from './context/SocketContext'; // DISABLED: No backend needed

// Layout
import Layout from './components/layout/Layout';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

// Lazy load Blog page for better performance
const Blog = React.lazy(() => import('./pages/Blog'));

// Create a query client - optimized for frontend-only mode
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0, // Don't retry failed requests
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: Infinity, // Consider data always fresh
      gcTime: Infinity, // Keep data in cache indefinitely
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CustomThemeProvider>
        <AuthProvider>
          {/* <SocketProvider> // DISABLED: No backend socket connection needed */}
            <CssBaseline />
            <Router>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="about" element={<About />} />
                  <Route path="projects" element={<Projects />} />
                  <Route path="blog" element={
                    <Suspense fallback={
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                        <CircularProgress />
                      </Box>
                    }>
                      <Blog />
                    </Suspense>
                  } />
                  <Route path="contact" element={<Contact />} />
                </Route>
              </Routes>
            </Router>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          {/* </SocketProvider> */}
        </AuthProvider>
      </CustomThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
