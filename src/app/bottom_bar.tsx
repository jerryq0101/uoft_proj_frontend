"use client"
import { useState } from 'react';

const BottomBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`fixed bottom-0 left-[400px] right-0 bg-gray-200 transition-all duration-300 ${isExpanded ? 'h-64' : 'h-12'}`}>
      <button 
        className="w-full h-12 bg-gray-300 text-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'Hide' : 'Expand'}
      </button>
      {isExpanded && (
        <div className="p-4">
          <p>This is the expanded content of the bottom bar.</p>
        </div>
      )}
    </div>
  );
};

export default BottomBar;