import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

// Socket Context Type
interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  joinAdminRoom: () => void;
  leaveAdminRoom: () => void;
}

// Create Context
const SocketContext = createContext<SocketContextType | null>(null);

// Socket Provider Component
interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      // Initialize socket connection
      const newSocket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', {
        transports: ['websocket'],
        timeout: 20000,
      });

      // Connection event listeners
      newSocket.on('connect', () => {
        console.log('🔌 Socket connected:', newSocket.id);
        setIsConnected(true);
        
        // Join admin room if user is admin
        if (isAdmin()) {
          newSocket.emit('join-admin');
        }
      });

      newSocket.on('disconnect', () => {
        console.log('🔌 Socket disconnected');
        setIsConnected(false);
      });

      newSocket.on('connect_error', (error) => {
        console.error('🔌 Socket connection error:', error);
        setIsConnected(false);
      });

      // Admin-specific event listeners
      if (isAdmin()) {
        // Contact notifications
        newSocket.on('contact-notification', (data) => {
          toast.info(`New contact from ${data.name}: ${data.subject}`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        });

        // Other real-time notifications can be added here
        newSocket.on('blog-comment', (data) => {
          toast.info(`New comment on "${data.blogTitle}" by ${data.commenterName}`, {
            position: 'top-right',
            autoClose: 5000,
          });
        });

        newSocket.on('project-like', (data) => {
          toast.success(`Someone liked your project "${data.projectTitle}"!`, {
            position: 'top-right',
            autoClose: 3000,
          });
        });
      }

      setSocket(newSocket);

      // Cleanup on unmount
      return () => {
        newSocket.close();
        setSocket(null);
        setIsConnected(false);
      };
    }
  }, [isAuthenticated, isAdmin]);

  const joinAdminRoom = () => {
    if (socket && isAdmin()) {
      socket.emit('join-admin');
    }
  };

  const leaveAdminRoom = () => {
    if (socket && isAdmin()) {
      socket.emit('leave-admin');
    }
  };

  const value: SocketContextType = {
    socket,
    isConnected,
    joinAdminRoom,
    leaveAdminRoom
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

// Hook to use Socket Context
export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

// Custom hook for real-time notifications
export const useRealtimeNotifications = () => {
  const { socket, isConnected } = useSocket();
  const { isAdmin } = useAuth();

  const sendContactNotification = (contactData: any) => {
    if (socket && isConnected) {
      socket.emit('new-contact', contactData);
    }
  };

  const sendBlogCommentNotification = (commentData: any) => {
    if (socket && isConnected) {
      socket.emit('new-blog-comment', commentData);
    }
  };

  const sendProjectLikeNotification = (projectData: any) => {
    if (socket && isConnected) {
      socket.emit('project-liked', projectData);
    }
  };

  return {
    isConnected,
    isAdminConnected: isConnected && isAdmin(),
    sendContactNotification,
    sendBlogCommentNotification,
    sendProjectLikeNotification
  };
};

export default SocketContext;
