import { useState } from 'react';
import Image from 'next/image';

export default function LatestCourses({ courses }) {
  const [selectedFilter, setSelectedFilter] = useState('*');

  // Get unique category names from the courses
  const uniqueCategories = [...new Set(courses.map((course) => course.category.name))];

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  // Sort courses by updatedAt in descending order
  const sortedCourses = [...courses].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return (
    <div>
      <section className="section courses" id="courses">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="section-heading">
                <h6>Latest Courses</h6>
                <h2>Latest Courses</h2>
              </div>
            </div>
          </div>
          <ul className="event_filter">
            <li>
              <a
                className={selectedFilter === '*' ? 'is_active' : ''}
                href="#!"
                onClick={() => handleFilterClick('*')}
              >
                Show All
              </a>
            </li>
            {/* Dynamically generate filter options based on unique category names */}
            {uniqueCategories.map((category) => (
              <li key={category}>
                <a
                  className={selectedFilter === category ? 'is_active' : ''}
                  href="#!"
                  onClick={() => handleFilterClick(category)}
                >
                  {category}
                </a>
              </li>
            ))}
          </ul>
          <div className="row event_box">
            {/* Course items */}
            {/* Repeat this block for each course */}
            {sortedCourses
              .filter((course) => selectedFilter === '*' || selectedFilter === course.category.name)
              .map((course) => (
                <div key={course._id} className="col-lg-4 col-md-6 align-self-center mb-30 event_outer col-md-6">
                  <div className="events_item">
                    <div className="thumb">
                      {/* Use Next.js Image component for optimized image loading */}
                      <a href={`/courses/${course._id}`}>
                        <Image src={course.images[0]} alt="" width={300} height={180} layout="responsive" />
                      </a>
                      {/* Display both parent and child category */}
                      <span className="category">
                        {course.category.parent ? course.category.parent.name + ' > ' : ''}
                        {course.category.name}
                      </span>
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
              ))}
            {/* End of Course items */}
          </div>
        </div>
      </section>
    </div>
  );
}
