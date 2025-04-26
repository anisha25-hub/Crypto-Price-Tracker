import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { fetchCryptoData } from '../store/slices/cryptoSlice';
import { useWebSocket } from '../hooks/useWebSocket';
import CryptoTable from './CryptoTable';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

const CryptoTracker: React.FC = () => {
  const dispatch = useDispatch();
  const { assets, loading, error, lastUpdated } = useSelector((state: RootState) => state.crypto);
  const { isConnected } = useWebSocket();
  
  useEffect(() => {
    dispatch(fetchCryptoData());
  }, [dispatch]);
  
  // Format last updated time
  const formattedLastUpdate = lastUpdated 
    ? new Date(lastUpdated).toLocaleTimeString() 
    : 'N/A';
  
  if (loading && assets.length === 0) {
    return <LoadingState />;
  }
  
  if (error && assets.length === 0) {
    return <ErrorState message={error} onRetry={() => dispatch(fetchCryptoData())} />;
  }
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Crypto Price Tracker
        </h1>
        <div className="flex items-center mt-2 md:mt-0 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center mr-4">
            <div className={`h-2 w-2 rounded-full mr-2 ${isConnected ? 'bg-success-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span>{isConnected ? 'Live Updates' : 'Connecting...'}</span>
          </div>
          <div>
            Last updated: <span className="font-medium">{formattedLastUpdate}</span>
          </div>
        </div>
      </div>
      
      <CryptoTable assets={assets} />
    </div>
  );
};

export default CryptoTracker;