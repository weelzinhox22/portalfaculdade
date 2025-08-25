import { useState, useEffect } from 'react';

const VirtualizedList = ({ items, renderItem, itemHeight = 100, windowHeight = 600 }) => {
  const [scrollTop, setScrollTop] = useState(0);
  
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - 5);
  const endIndex = Math.min(items.length, Math.ceil((scrollTop + windowHeight) / itemHeight) + 5);
  
  const visibleItems = items.slice(startIndex, endIndex);
  
  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };
  
  return (
    <div 
      style={{ height: windowHeight, overflow: 'auto' }} 
      onScroll={handleScroll}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        {visibleItems.map((item, index) => (
          <div 
            key={item.id} 
            style={{
              position: 'absolute',
              top: (startIndex + index) * itemHeight,
              height: itemHeight,
              width: '100%'
            }}
          >
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualizedList;