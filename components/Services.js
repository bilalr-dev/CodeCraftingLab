// components/Services.js
import React from 'react';

const Services = () => {
  return (
    <div className="services section" id="services">
      <div className="container">
        <div className="row">
          {/* Service Item 1 */}
          <div className="col-lg-4 col-md-6">
            <div className="service-item">
              <div className="icon">
                <img src="/images/service-01.png" alt="beginers friendly" />
              </div>
              <div className="main-content">
                <h4>Beginers Friendly</h4>
                <p>
                Embark on coding effortlessly in our Beginner-Friendly section. Navigable tutorials and a supportive community await, providing an enriching initiation into the programming world for all enthusiasts.                </p>
                <div className="main-button">
                  <a href="#">Read More</a>
                </div>
              </div>
            </div>
          </div>
          {/* Service Item 2 */}
          <div className="col-lg-4 col-md-6">
          <div className="service-item">
              <div className="icon">
                <img src="/images/nofees.png" alt="Free of Charges" />
              </div>
              <div className="main-content">
                <h4>Free of Charges</h4>
                <p>
                Explore and learn without cost! Our platform is committed to providing free access to coding resources, making programming education accessible to everyone seeking an enriching learning experience.                </p>
                <div className="main-button">
                  <a href="#">Read More</a>
                </div>
              </div>
            </div>
          </div>
          {/* Service Item 3 */}
          <div className="col-lg-4 col-md-6">
          <div className="service-item">
              <div className="icon">
                <img src="/images/aichat.png" alt="ai chatbot" />
              </div>
              <div className="main-content">
                <h4>AI Chatbot Assistance</h4>
                <p>
                Enhance your coding experience with our AI Chatbot. Utilize real-time assistance, ask coding queries, and receive instant answers. Seamlessly integrate AI into your learning journey for quick and efficient problem-solving.
                </p>
                <div className="main-button">
                  <a href="#">Read More</a>
                </div>
              </div>
            </div>          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
