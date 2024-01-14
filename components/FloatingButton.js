// components/FloatingButton.js

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FloatingButtonContainer = styled.div`
  position: fixed;
  bottom: 14px;
  right: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #7A6AD8;
  color: #ffffff;
  height: 50px;
  width: 50px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: opacity 0.5s ease-in-out;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};

  &:hover {
    background-color: #5C4CAE;
  }
`;

const SvgIcon = styled.svg`
  width: 18px; /* Adjust the width as needed */
  height: 18px; /* Adjust the height as needed */
`;

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
    <FloatingButtonContainer visible={isVisible} onClick={scrollToTop}>
      <SvgIcon xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
      </SvgIcon>
    </FloatingButtonContainer>
  );
};

export default FloatingButton;
