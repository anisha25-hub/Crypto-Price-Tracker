import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '../utils/cn';

interface PriceChangeProps {
  value: number;
  showIcon?: boolean;
  className?: string;
}

const PriceChange: React.FC<PriceChangeProps> = ({ 
  value, 
  showIcon = true,
  className = ''
}) => {
  const isPositive = value > 0;
  const isZero = value === 0;
  
  const baseClasses = "font-medium flex items-center justify-end";
  
  const colorClasses = isZero
    ? "text-gray-500 dark:text-gray-400"
    : isPositive
      ? "text-success-600 dark:text-success-500"
      : "text-danger-600 dark:text-danger-500";
  
  return (
    <div className={cn(baseClasses, colorClasses, className)}>
      {showIcon && !isZero && (
        isPositive ? (
          <ChevronUp size={16} className="mr-0.5" />
        ) : (
          <ChevronDown size={16} className="mr-0.5" />
        )
      )}
      <span>{Math.abs(value).toFixed(2)}%</span>
    </div>
  );
};

export default PriceChange;