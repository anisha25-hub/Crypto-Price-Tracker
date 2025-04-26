import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCryptoData } from '../store/slices/cryptoSlice';
import { mockWebSocket } from '../services/mockWebSocket';

// Hook to manage WebSocket connection
export const useWebSocket = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Fetch initial data
    dispatch(fetchCryptoData());
    
    // Connect to WebSocket
    mockWebSocket.connect();
    
    // Cleanup on unmount
    return () => {
      mockWebSocket.disconnect();
    };
  }, [dispatch]);
  
  return {
    isConnected: mockWebSocket.isConnected,
  };
};