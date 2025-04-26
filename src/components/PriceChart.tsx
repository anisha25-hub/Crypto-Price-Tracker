import React, { useRef, useEffect } from 'react';

interface PriceChartProps {
  data: number[];
  percentChange: number;
  width?: number;
  height?: number;
}

const PriceChart: React.FC<PriceChartProps> = ({ 
  data, 
  percentChange, 
  width = 120, 
  height = 40 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isPositive = percentChange >= 0;
  
  useEffect(() => {
    if (!canvasRef.current || data.length < 2) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set line style
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    if (isPositive) {
      ctx.strokeStyle = '#059669'; // success-600
      gradient.addColorStop(0, 'rgba(5, 150, 105, 0.2)');
      gradient.addColorStop(1, 'rgba(5, 150, 105, 0)');
    } else {
      ctx.strokeStyle = '#DC2626'; // danger-600
      gradient.addColorStop(0, 'rgba(220, 38, 38, 0.2)');
      gradient.addColorStop(1, 'rgba(220, 38, 38, 0)');
    }
    
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Find min and max for scaling
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1; // Avoid division by zero
    
    // Draw line
    ctx.beginPath();
    data.forEach((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
    
    // Fill area under the line
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
    
  }, [data, percentChange, isPositive, width, height]);
  
  return (
    <div className="inline-block">
      <canvas 
        ref={canvasRef} 
        width={width} 
        height={height}
        className="block"
      />
    </div>
  );
};

export default PriceChart;