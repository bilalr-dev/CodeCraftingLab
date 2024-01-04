import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { withSwal } from "react-sweetalert2";
import ReactPaginate from 'react-paginate';

function Categories({ swal }) {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false); // New state variable
  const itemsPerPage = 10;

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios.get("/api/categories").then((result) => {
      const sortedCategories = result.data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setCategories(sortedCategories);
    });
  }

  async function saveCategory(ev) {
    ev.preventDefault();
    setFormSubmitted(true);
    if (!name.trim()) {
      return;
    }
    const data = {
      name,
      parentCategory,
    };
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put("/api/categories", data);
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }
    setName("");
    setParentCategory("");
    setFormSubmitted(false);
    fetchCategories();
  }

  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
  }

  function deleteCategory(category) {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want to delete ${category.name}?`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, Delete!",
        confirmButtonColor: "#d55",
        reverseButtons: false,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = category;
          await axios.delete("/api/categories?_id=" + _id);
          fetchCategories();
        }
      });
  }

  function deleteAllCategories() {
    swal
      .fire({
        title: "Are you sure?",
        text: "This will delete all categories. Are you sure you want to proceed?",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, Delete All!",
        confirmButtonColor: "#d55",
        reverseButtons: false,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete("/api/categories?all=true");
          fetchCategories();
        }
      });
  }

  const filteredCategories = categories
    .filter(
      (category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (category?.parent?.name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

  const pageCount = Math.ceil(filteredCategories.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <Layout>
      <h1>Categories</h1>
      <h2 className="text-sm mb-2">
        <span>(</span><span className="text-red-500">*</span>) required fields
      </h2>
      <label>
        {editedCategory
          ? `Edit category ${editedCategory.name}`
          : "Create new category"}
        <span className="text-red-500"> *</span>
      </label>
  
      <form onSubmit={saveCategory}>
        <div className="flex gap-1">
          <input
            type="text" 
            placeholder={"Category name"}
            onChange={(ev) => setName(ev.target.value)}
            value={name}
            className={`px-4 py-2 border rounded-md ${!name.trim() && formSubmitted ? 'border-red-500' : ''}`}
          />
          <select
            onChange={(ev) => setParentCategory(ev.target.value)}
            value={parentCategory}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">No parent category</option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        {(!name.trim() && formSubmitted) && (
          <div className="text-red-500 mt-2">
            Category name cannot be empty.
          </div>
        )}
        <div className="mb-2"></div>
        <div className="flex gap-1">
          <button
            type="submit"
            className="btn-primary py-2 px-4"
          >
            Save
          </button>
          {editedCategory && (
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setName("");
                setParentCategory("");
              }}
              className="btn-default px-4 py-2 border rounded-md"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      {!editedCategory && (
        <div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search categories by name or parent category"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              className="px-4 py-2 border rounded-md"
            />
          </div>
          <table className="basic mt-4">
            <thead>
              <tr>
                <td>Category name</td>
                <td>Parent category</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {filteredCategories
                .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
                .map((category) => (
                  <tr key={category._id}>
                    <td>{category.name}</td>
                    <td>{category?.parent?.name}</td>
                    <td className="flex gap-1">
                      <button
                        onClick={() => editCategory(category)}
                        className="btn-default py-2 px-4 border rounded-md flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 inline-block mr-1"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCategory(category)}
                        className="btn-red py-2 px-4 border rounded-md flex items-center"
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
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {filteredCategories.length > 0 && (
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
          )}

          {filteredCategories.length > 0 && (
            <div className="mt-4">
              <button
                onClick={deleteAllCategories}
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
          )}
        </div>
      )}
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
