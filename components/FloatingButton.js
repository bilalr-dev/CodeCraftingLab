import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const FloatingButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

      // Show the button when scrolled 20% of the page
      setIsVisible(scrollPercentage > 20);
    };

    // Attach the event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Image
      src="/images/gototop.png"
      alt="GoTo Top"
      onClick={isVisible ? scrollToTop : null} 
      width={17}
      height={180}
      style={{
        zIndex: 1000,
        position: 'fixed',
        bottom: isVisible ? '14px' : '-50px',
        right: '14px',
        cursor: 'pointer',
        transition: 'bottom 1s ease-in-out, opacity 1s ease-in-out',
        opacity: isVisible ? 1 : 0,
        width: 'auto',
        height: 'auto',
        pointerEvents: isVisible ? 'auto' : 'none', 
      }}
    />
  );
};

export default FloatingButton;
