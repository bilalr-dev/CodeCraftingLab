import React, { useEffect } from 'react';
import Script from 'next/script';
import Link from 'next/link';

import '@fortawesome/fontawesome-free/css/all.min.css';

const Banner = () => {
  useEffect(() => {
    // Check if running in a browser environment before initializing Owl Carousel
    if (typeof window !== 'undefined' && typeof window.jQuery !== 'undefined') {
      // Dynamically load Owl Carousel script
      const owlCarouselScript = document.createElement('script');
      owlCarouselScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js';
      owlCarouselScript.async = true;
      document.body.appendChild(owlCarouselScript);

      owlCarouselScript.onload = () => {
        // Initialize Owl Carousel after the script is loaded
        if (typeof window.jQuery.fn.owlCarousel === 'function') {
          window.jQuery('.owl-carousel').owlCarousel({
            items: 1,  
            loop: true,  
            nav: false,  
            autoplay: true,  
            autoplayTimeout: 8000,
            autoplayHoverPause:true,  
          });
        } else {
          console.error('Owl Carousel initialization failed.');
        }
      };

      owlCarouselScript.onerror = (error) => {
        console.error('Error loading Owl Carousel script:', error);
      };
    }
  }, []);

  return (
    <div className="main-banner" id="top">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="owl-carousel owl-banner">
              <div className="item item-1">
                <div className="header-text">
                  <span className="category">Our Courses</span>
                  <h2>Start Your Journey Today!</h2>
                  <p>
                    Dive into our Beginner-Friendly 🚀 platform with Free of Charges resources, an AI Chatbot 🤖, and an Online IDE 💻 to enhance your coding journey. Join a vibrant community and shape your coding skills with every keystroke!
                  </p>
                  <div className="buttons">
                    <div className="icon-button">
                      <a href="#about_us"><i className="fas fa-solid fa-book"></i> What&apos;s CCL?</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item item-2">
                <div className="header-text">
                  <span className="category">Quizzes</span>
                  <h2>Test your knowledge now!</h2>
                  <p>
                  Whether you&apos;re a novice or a pro, our diverse coding challenges offer a rewarding adventure. Test your knowledge across various levels, and enjoy the journey of continuous learning. Happy quizzing on your coding exploration! 💡                  </p>
                  <div className="buttons">
                    <div className="icon-button">
                      <Link href="/quiz"><i className="fas fa-solid fa-lightbulb"></i> Start A Quiz</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item item-3">
                <div className="header-text">
                  <span className="category">Contact Us</span>
                  <h2>You have a question? Get in touch with us</h2>
                  <p>
                    Need assistance on your coding journey? Do not hesitate to contact us! Explore our Contact Section for a direct connection to CodeCraftingLab. Your questions are our top priority, ensuring prompt and helpful responses. 🚀📧
                  </p>
                  <div className="buttons">
                    <div className="icon-button">
                      <Link href="/#contact"><i className="fas fa-solid fa-paper-plane"></i> Contact Us</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Load jQuery and Owl Carousel scripts */}
      <Script src="https://code.jquery.com/jquery-3.6.0.min.js" strategy="beforeInteractive" />

    </div>
  );
};

export default Banner;
