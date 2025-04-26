import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Loading market data...</p>
    </div>
  );
};

export default LoadingState;