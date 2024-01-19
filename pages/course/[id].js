// pages/courses/[id].js
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import FloatingButton from "@/components/FloatingButton";
import { mongooseConnect } from "@/lib/mongoose";
import { Course } from "@/models/Course";
import Image from 'next/image';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

export default function CoursePage({ course }) {
  // Function to format date
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  }

  // Function to extract YouTube video ID from URL
  function getYouTubeVideoId(url) {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match && match[1];
  }

  return (
    <>
      <Header />
      <Banner />
      <section className="section courses" id="courses">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="section-heading">
                <h2>{course.title}</h2>
              </div>
            </div>
          </div>
          {/* Display course details */}
          <div className="row event_box">
            <div className="col-lg-12 align-self-center mb-30 event_outer">
              <div className="events_item">
                <div className="thumb">
                  {/* Use Next.js Image component for optimized image loading */}
                  <Image
                    src={course.images[0]}
                    alt=""
                    width={200}
                    height={300}
                    objectFit="cover"
                    className="course-image"
                  />
                </div>
                <div className="down-content">
                  <span className="author">CodeCraftingLab</span>
                  <h4>{course.title}</h4>
                  <p>{course.description}</p>
                                    {/* Display YouTube video */}
                                    {course.youtubeUrl && (
                    <div className="youtube-video-container">
                      <div className="video-wrapper">
                        <iframe
                          width="560"
                          height="315"
                          src={`https://www.youtube.com/embed/${getYouTubeVideoId(course.youtubeUrl)}`}
                          title={course.title}
                          frameBorder="0"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  )}
                  <div className="html-title">Code:</div>

                  {course.bodyText && (
                    <div className="body-text">
                      <SyntaxHighlighter language="html" style={a11yDark}>
                        {course.bodyText}
                      </SyntaxHighlighter>
                    </div>
                  )}



                  {/* Other details */}
                  <span className="author">
                    Last Updated:{' '}
                    {new Intl.DateTimeFormat('en-US', {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      timeZoneName: 'short',
                    }).format(new Date(course.updatedAt))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FloatingButton />
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const course = await Course.findById(id);

  if (!course) {
    return {
      notFound: true,
    };
  }

  console.log('Fetched Course:', course);

  return {
    props: {
      course: JSON.parse(JSON.stringify(course)),
    },
  };
}
