import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function CoursesCatalog({ courses }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedCourses, setSortedCourses] = useState([]);

  // Effect to sort courses by updatedAt time on component mount
  useEffect(() => {
    const sorted = sortCourses(courses);
    setSortedCourses(sorted);
  }, [courses]);

  // Sort courses by updatedAt time
  const sortCourses = (coursesToSort) => {
    return [...coursesToSort].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    // Filter and sort courses based on the search term
    const filteredCourses = courses.filter(
      (course) => course.title.toLowerCase().includes(searchTerm)
    );

    setSortedCourses(sortCourses(filteredCourses));
  };

  return (
    <div>
      <section className="section courses" id="courses">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="section-heading">
                <h6>All Courses</h6>
                <h2>All Courses</h2>
              </div>
            </div>
          </div>
          <div>
            <div>
              <input
                type="text"
                placeholder="Search for a course..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="shadow appearance-none border rounded w-full py-1 px-4 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="row event_box">
            {sortedCourses.map((course) => (
              <div
                key={course._id}
                className="col-lg-4 col-md-6 align-self-center mb-30 event_outer col-md-6"
              >
                <div className="events_item">
                  <div className="thumb">
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
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
