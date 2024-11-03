import React, { createContext, useContext, useEffect } from 'react';
import { wsService } from '../services/websocket';
import { useAuth } from './AuthContext';

interface WebSocketContextType {
  send: (type: string, payload: any) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const token = localStorage.getItem('token');
      wsService.connect(`ws://${window.location.host}/ws?token=${token}`);
    }

    return () => {
      wsService.disconnect();
    };
  }, [user]);

  const value = {
    send: wsService.send.bind(wsService),
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
}; 