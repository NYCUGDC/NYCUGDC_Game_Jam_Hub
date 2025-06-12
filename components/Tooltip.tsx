
import React, { useState, ReactNode } from 'react';

interface TooltipProps {
  text: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, position = 'top' }) => {
  const [visible, setVisible] = useState(false);

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
      case 'bottom':
        return 'top-full left-1/2 -translate-x-1/2 mt-2';
      case 'left':
        return 'right-full top-1/2 -translate-y-1/2 mr-2';
      case 'right':
        return 'left-full top-1/2 -translate-y-1/2 ml-2';
      default:
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
    }
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && text && (
        <div 
          className={`absolute ${getPositionClasses()} z-50 p-2 text-xs text-white bg-slate-700 rounded-md shadow-lg whitespace-nowrap`}
        >
          {text}
          <div 
            className={`absolute w-2 h-2 bg-slate-700 transform rotate-45 
              ${position === 'top' ? 'top-full -translate-y-1/2 left-1/2 -translate-x-1/2' : ''}
              ${position === 'bottom' ? 'bottom-full translate-y-1/2 left-1/2 -translate-x-1/2' : ''}
              ${position === 'left' ? 'left-full -translate-x-1/2 top-1/2 -translate-y-1/2' : ''}
              ${position === 'right' ? 'right-full translate-x-1/2 top-1/2 -translate-y-1/2' : ''}
            `}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
