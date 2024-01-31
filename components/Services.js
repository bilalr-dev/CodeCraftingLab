// components/Services.js
import Link from 'next/link';
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
                  <Link href="/courses">Read More</Link>
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
                  <Link href="#">Read More</Link>
                </div>
              </div>
            </div>
          </div>
          {/* Service Item 3 */}
          <div className="col-lg-4 col-md-6">
          <div className="service-item">
              <div className="icon">
                <img src="/images/quiz.png" alt="quiz" />
              </div>
              <div className="main-content">
                <h4>Learn with Quizzes</h4>
                <p>
                Level up your coding prowess with interactive quizzes, covering basics to advanced concepts. Boost proficiency in a concise, engaging format for a holistic grasp of programming languages.
                </p>
                <div className="main-button">
                  <Link href="/quiz">Start Quiz</Link>
                </div>
              </div>
            </div>          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
