import React from 'react';

interface CryptoLogoProps {
  symbol: string;
  size?: number;
  className?: string;
}

const CryptoLogo: React.FC<CryptoLogoProps> = ({ symbol, size = 32, className = '' }) => {
  // Map of crypto symbols to their logo colors
  const logoColors: Record<string, string> = {
    BTC: 'bg-orange-500',
    ETH: 'bg-blue-600',
    USDT: 'bg-green-500',
    BNB: 'bg-yellow-500',
    XRP: 'bg-blue-400',
    ADA: 'bg-blue-700',
    SOL: 'bg-purple-600',
    DOT: 'bg-pink-500',
    DOGE: 'bg-yellow-400',
    USDC: 'bg-blue-400',
    // Add more as needed
    DEFAULT: 'bg-gray-400',
  };

  const color = logoColors[symbol] || logoColors.DEFAULT;
  const sizeStyle = { width: `${size}px`, height: `${size}px` };

  // Custom fallback logo with symbol
  return (
    <div 
      className={`rounded-full flex items-center justify-center text-white text-xs font-bold ${color} ${className}`} 
      style={sizeStyle}
    >
      {symbol.substring(0, 1)}
    </div>
  );
};

export default CryptoLogo;