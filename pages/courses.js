import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from 'react-paginate';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const fetchData = async () => {
    try {
      const [coursesResponse, categoriesResponse] = await Promise.all([
        axios.get('/api/courses'),
        axios.get('/api/categories'),
      ]);

      const sortedCourses = coursesResponse.data.sort((a, b) => a.title.localeCompare(b.title));

      // Filter out courses with the "Uncategorized" category
      const filteredCourses = sortedCourses.filter(
        (course) => course.category?.name !== 'Uncategorized'
      );

      setCourses(filteredCourses);
      setCategories(categoriesResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const deleteAllCourses = async () => {
    await axios.delete("/api/courses?all=true");
    fetchData();
  };

// Function to fetch courses from the server
function fetchCourses() {
  axios.get("/api/courses").then((result) => {
    const sortedCourses = result.data.sort((a, b) =>
      a.title.localeCompare(b.title)
    );

    // Filter out courses with the "Uncategorized" category
    const filteredCourses = sortedCourses.filter(
      (course) => course.category?.name !== 'Uncategorized'
    );

    setCourses(filteredCourses);
  });
}


  const filteredCourses = courses
    .filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (categories.find(cat => cat._id === course.category)?.name || 'Uncategorized').toLowerCase().includes(searchTerm.toLowerCase())
    );

  const pageCount = Math.ceil(filteredCourses.length / itemsPerPage);

  return (
    <Layout>
      <h1>Courses</h1>
      <Link className="btn-primary" href={'/courses/new'}>
        Add new Course
      </Link>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Search courses by name or category"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          className="px-4 py-2 border rounded-md"
        />
      </div>

      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Course name</td>
            <td>Parent category</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {filteredCourses
            .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
            .map((course) => (
              <tr key={course._id}>
                <td>{course.title}</td>
                <td>
                  {categories.find((cat) => cat._id === course.category)?.name ||
                    'Uncategorized'}
                </td>
                <td>
                  <Link
                    className="btn-default"
                    href={'/courses/edit/' + course._id}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    Edit
                  </Link>
                  <Link
                    className="btn-red"
                    href={'/courses/delete/' + course._id}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {filteredCourses.length > 0 && (
        <div>
          <div className="pagination-container mt-4">
            <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              breakLabel={'...'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
          </div>

          <div className="mt-4">
            <button
              onClick={() => deleteAllCourses()}
              className="btn-red py-2 px-4 border rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 inline-block mr-1"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
              Delete All
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
