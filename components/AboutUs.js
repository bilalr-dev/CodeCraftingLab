import Link from 'next/link';
import React, { useEffect } from 'react';

const AboutUs = () => {
  useEffect(() => {
    const bootstrapScript = document.createElement('script');
    bootstrapScript.src = '/vendor/bootstrap/js/bootstrap.min.js'; 
    bootstrapScript.async = true;
    document.body.appendChild(bootstrapScript);

    const jQueryScript1 = document.createElement('script');
    jQueryScript1.src = '/vendor/jquery/jquery.js';
    jQueryScript1.async = true;
    document.body.appendChild(jQueryScript1);

    const jQueryScript2 = document.createElement('script');
    jQueryScript2.src = '/vendor/jquery/jquery.min.js'; 
    jQueryScript2.async = true;
    document.body.appendChild(jQueryScript2);

    const jQuerySlimScript1 = document.createElement('script');
    jQuerySlimScript1.src = '/vendor/jquery/jquery.slim.js'; 
    jQuerySlimScript1.async = true;
    document.body.appendChild(jQuerySlimScript1);

    const jQuerySlimScript2 = document.createElement('script');
    jQuerySlimScript2.src = '/vendor/jquery/jquery.slim.min.js'; 
    document.body.appendChild(jQuerySlimScript2);

    return () => {
      document.body.removeChild(bootstrapScript);
      document.body.removeChild(jQueryScript1);
      document.body.removeChild(jQueryScript2);
      document.body.removeChild(jQuerySlimScript1);
      document.body.removeChild(jQuerySlimScript2);
    };
  }, []);

  return (
    <div id='about_us'>
      <div className="section about-us">
      <link rel="stylesheet" href="/bootstrap.min.css" />
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-1">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Where shall I begin?
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                  &emsp;Navigate to the <Link href='/categories'><strong>Categories</strong></Link> section, where you can select the specific category you wish to explore. Within each <code>category</code>, you&apos;ll discover associated courses. Feel free to commence with any course of your choice.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    How CodeCraftingLab works?
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                  <strong>&emsp;CodeCraftingLab</strong> provides a well-structured plan. In the <Link href='/categories'><strong>Categories</strong></Link> section, find our categories alphabetically sorted. Access associated courses by clicking each category&apos;s card.
<br/>
&emsp;In the <Link href='/courses'><strong>Courses</strong></Link> section, explore all courses sorted by Last Updated date. Choose or search for any course you prefer.
<br/>
&emsp;Explore the <Link href='/quiz'><strong>Quizzes</strong></Link> section to assess and elevate your proficiency in programming languages and various Computer Science topics.</div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Do I have to pay any fees?
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <strong>&emsp;CodeCraftingLab</strong> is a free of charges platform, you don&apos;t have to pay anything.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFour">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    I have a question, how can I contact you?
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFour"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                  &emsp;Navigate to our <Link href='/#contact'><strong>Contact Us</strong></Link> section and effortlessly fill out the form in no time.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 align-self-center">
            <div className="section-heading">
              <h6>About Us</h6>
              <h2>What makes us the best?</h2>
              <p>
              <strong>CodeCraftingLab</strong> is a beginner-friendly platform that is completely free of charge. Our courses database is regularly updated to keep up with the fast-paced advancements in the programming field.              </p>
              <div className="main-button">
                <a href="#">Discover More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AboutUs;
