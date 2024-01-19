// pages/category/[id].js
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import FloatingButton from "@/components/FloatingButton";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import Image from 'next/image';

export default function CoursePage({ category }) {
  // Function to format date
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
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
                <h2>{category.name}</h2>
              </div>
            </div>
          </div>
          {/* Display courses if they exist */}
          <div className="row event_box">
            {category.courses && category.courses.length > 0 ? (
              category.courses.map((course) => (
                <div key={course._id} className="col-lg-4 col-md-6 align-self-center mb-30 event_outer col-md-6">
                  <div className="events_item">
                    <div className="thumb">
                      {/* Use Next.js Image component for optimized image loading */}
                      <a href={`/course/${course._id}`}>
                      <Image
                          src={course.images[0]}
                          alt=""
                          width={300}
                          height={180}
                          objectFit="cover"
                          className="course-image"
                        />
                      </a>
                    </div>
                    <div className="down-content">
                      <span className="author">CodeCraftingLab</span>
                      <h4>{course.title}</h4>
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
              ))
            ) : (
              <p>No courses</p>
            )}
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
  const category = await Category.findById(id).populate('parent').populate('courses');

  if (!category) {
    return {
      notFound: true,
    };
  }

  console.log('Fetched Category:', category);

  return {
    props: {
      category: JSON.parse(JSON.stringify(category)),
    },
  };
}