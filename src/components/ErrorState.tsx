import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <AlertTriangle size={48} className="text-danger-500 mb-4" />
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        Unable to Load Data
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        {message || "There was an error loading the cryptocurrency data. Please try again later."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;