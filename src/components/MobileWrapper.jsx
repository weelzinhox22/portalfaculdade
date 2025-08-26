import React, { useEffect, useState } from 'react';

const MobileWrapper = ({ children, className = '' }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Add mobile classes to elements with inline styles
  useEffect(() => {
    if (isMobile) {
      // Add mobile classes to common elements
      const elementsWithGrids = document.querySelectorAll('[style*="gridTemplateColumns"], [style*="grid-template-columns"]');
      elementsWithGrids.forEach(el => {
        if (!el.classList.contains('mobile-preserve-grid')) {
          el.classList.add('mobile-grid-single');
        }
      });

      const elementsWithFlex = document.querySelectorAll('[style*="display: flex"]');
      elementsWithFlex.forEach(el => {
        if (!el.classList.contains('mobile-preserve-flex')) {
          el.classList.add('mobile-flex-column');
        }
      });

      const authContainers = document.querySelectorAll('.auth-page');
      authContainers.forEach(el => {
        el.classList.add('mobile-auth-optimized');
      });

      const profileContainers = document.querySelectorAll('.profile-page');
      profileContainers.forEach(el => {
        el.classList.add('mobile-profile-optimized');
      });
    }
  }, [isMobile, children]);

  return (
    <div className={`${className} ${isMobile ? 'mobile-optimized' : 'desktop-optimized'}`}>
      {children}
    </div>
  );
};

export default MobileWrapper;
