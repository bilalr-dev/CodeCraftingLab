// AssociatedCourse.js
import React from 'react';
import Image from 'next/image';

export default function AssociatedCourse({ category }) {
    console.log('Category:', category);

    return (
    <div>
      <section className="section categories" id="categories">
        <div className="container">
          <div className="row event_box">
            {/* Course items */}
            {/* Repeat this block for each course */}
            {category && category.courses.map((course) => (
              <div key={course._id} className="col-lg-4 col-md-6 align-self-center mb-30 event_outer col-md-6">
                <div className="events_item">
                  <div className="thumb">
                    {/* Use Next.js Link for client-side navigation */}
                    <a href={`/course/${course._id}`}>
                    <Image
                          src={course.images[0]}
                          alt=""
                          width={300}
                          height={180}
                          objectFit="cover"
                          className="course-image"
                        />                    </a>
                    <span className="category">{course.title}</span>
                  </div>
                  <div className="down-content">
                    <span className="author">{course.description}</span>
                  </div>
                </div>
              </div>
            ))}
            {/* End of Course items */}
          </div>
        </div>
      </section>
    </div>
  );
}
