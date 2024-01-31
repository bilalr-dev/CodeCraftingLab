import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import FloatingButton from "@/components/FloatingButton";
import { mongooseConnect } from "@/lib/mongoose";
import { Course } from "@/models/Course";
import { useState } from 'react';

// Function to extract YouTube video ID from URL
function getYouTubeVideoId(url) {
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  return match && match[1];
}

// Function to format date
function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
  }).format(new Date(date));
}
const getLanguage = (code) => {
  // Check if code is defined and not null
  if (code && typeof code === 'string') {
    if (code.includes('python')) {
      return 'python';
    } else if (code.includes('java')) {
      return 'java';
    } else if (code.includes('cpp') || code.includes('c++')) {
      return 'cpp';
    }
  }
  return 'jsx'; 
};

export default function CoursePage({ course }) {
  const [copied, setCopied] = useState(false);
  const handleCopyClick = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => setCopied(true))
      .catch((err) => console.error('Copy to clipboard failed:', err));
  };

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
          <div className="row event_box">
            <div className="col-lg-12 align-self-center mb-30 event_outer">
              <div className="events_item">
                <div className="thumb">
                  {course.images[0] && (
                    <Image
                      src={course.images[0]}
                      alt=""
                      width={200}
                      height={300}
                      objectFit="cover"
                      className="course-image"
                    />
                  )}
                </div>
                <div className="down-content">
                  <span className="author">CodeCraftingLab</span>
                  <h4>{course.title}</h4>
                  <p>{course.description}</p>
                  {course.youtubeUrl && (
    <div className="video-wrapper">
    <div className="video-container">
      <iframe
        src={`https://www.youtube.com/embed/${getYouTubeVideoId(course.youtubeUrl)}`}
        title={course.title}
        frameBorder="0"
        allowFullScreen
      ></iframe>
                      </div>
                    </div>
                  )}
      {course.bodyText && (
        <div>
          {course.bodyText.split(/(<pre[^>]*>.*?<\/pre>|<code[^>]*>.*?<\/code>)/s).map((part, index) => (
            index % 2 === 0 ? (
              <div key={index} dangerouslySetInnerHTML={{ __html: part }} />
            ) : (
              <div key={index} className={part.includes('<code') ? 'code-block code-inline' : 'code-block'} style={{ position: 'relative' }}>
                {part.includes('<code') ? (
                  part.replace(/<\/?code[^>]*>/g, '')
                ) : (
                  <div>
                    { /* Copy button for <pre> tag case */ }
                    <div className="copy-button-container" style={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}>
                      <button
                        className="copy-button"
                        onClick={() => handleCopyClick(part.match(/<pre[^>]*>(.*?)<\/pre>/s)[1].trim())}
                        style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                        title={copied ? 'Copied' : 'Copy to clipboard'}
                      >
                        {copied ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-clipboard-check" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                          <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                          <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
                        </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-copy" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
                          </svg>
                        )}
                      </button>
                    </div>
                    <SyntaxHighlighter language={getLanguage(part.match(/<pre[^>]*>(.*?)<\/pre>/s)[1])} style={atomDark}>
                      {part.match(/<pre[^>]*>(.*?)<\/pre>/s)[1].trim()}
                    </SyntaxHighlighter>
                  </div>
                )}
              </div>
            )
          ))}
        </div>
      )}
                  <span className="author">
                    Last Updated: {formatDate(course.updatedAt)}
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
  return {
    props: {
      course: JSON.parse(JSON.stringify(course)),
    },
  };
}