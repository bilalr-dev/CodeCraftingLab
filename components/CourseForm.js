import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "@/components/Spinner";

const CourseForm = ({
  _id,
  title: existingTitle,
  description: existingDescription,
  youtubeUrl: existingYoutubeUrl,
  images: existingImages,
  category: assignedCategory,
}) => {
  const [title, setTitle] = useState(existingTitle || "");
  const [category, setCategory] = useState(assignedCategory || "");
  const [images, setImages] = useState(existingImages || []);
  const [description, setDescription] = useState(existingDescription || "");
  const [youtubeUrl, setYoutubeUrl] = useState(existingYoutubeUrl || "");
  const [goToCourses, setGoToCourses] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [youtubeUrlError, setYoutubeUrlError] = useState(null);
  const router = useRouter();

  const acceptedYoutubeFormats = [
    "https://www.youtube.com/",
    "http://www.youtube.com/",
    "https://youtube.com/",
    "http://youtube.com/",
    "youtube.com/",
    "www.youtube.com/",
    "m.youtube.com/",
    "youtu.be/",
  ];

  const youtubeUrlPatterns = acceptedYoutubeFormats.map(format => new RegExp(`^${format}`, 'i'));

  useEffect(() => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);

  useEffect(() => {
    const errors = {};
    if (title.trim() === "") {
      errors.title = "Title is required";
    }
    if (category.trim() === "") {
      errors.category = "Category is required";
    }
    if (images.length === 0) {
      errors.images = "Image is required";
    }
    if (youtubeUrl.trim() === "") {
      errors.youtubeUrl = "Youtube URL is required";
    }

    if (Object.keys(errors).length === 0) {
      setValidationErrors({});
    } else {
      setValidationErrors(errors);
    }
  }, [title, category, images, youtubeUrl]);

  const validateYoutubeUrl = () => {
    if (youtubeUrl.trim() !== "") {
      const isValid = youtubeUrlPatterns.some(pattern => pattern.test(youtubeUrl));
      setYoutubeUrlError(isValid ? null : "Invalid YouTube URL");
    }
  };

  const validateForm = () => {
    return title.trim() !== "" && category.trim() !== "" && images.length > 0 && !youtubeUrlError;
  };

  const saveCourse = async (ev) => {
    ev.preventDefault();
    setShowErrors(true);

    const errors = {};
    if (title.trim() === "") {
      errors.title = "Title is required";
    }
    if (category.trim() === "") {
      errors.category = "Category is required";
    }
    if (images.length === 0) {
      errors.images = "Image is required";
    }
    if (youtubeUrl.trim() === "") {
      errors.youtubeUrl = "Youtube URL is required";
    }
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const data = {
      title,
      description,
      youtubeUrl,
      images,
      category,
    };

    try {
      if (_id) {
        await axios.put("/api/courses", { ...data, _id });
      } else {
        await axios.post("/api/courses", data);
      }

      setGoToCourses(true);
    } catch (error) {
      console.error("Error saving course:", error);
    }
  };

  const uploadImage = async (ev) => {
    const file = ev.target?.files[0];
    if (file && file.type.startsWith("image/")) {
      setIsUploading(true);
      const data = new FormData();
      data.append("file", file);

      try {
        const res = await axios.post("/api/upload", data);
        setImages([res.data.links[0]]);
      } catch (error) {
        console.error("Error uploading image:", error);
      }

      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    if (goToCourses) {
      router.push("/courses");
    }
  }, [goToCourses]);

  return (
    <form onSubmit={saveCourse}>
      <h2 className="text-sm mb-2">
        <span>(</span><span className="text-red-500">*</span>) required fields
      </h2>
      <label>
        Course name
        <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        placeholder="course name"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
        className={showErrors && validationErrors.title ? "border-red-500" : ""}
      />
      {showErrors && validationErrors.title && (
        <p className="text-red-500 text-sm">{validationErrors.title}</p>
      )}

      <label>
        Category
        <span className="text-red-500">*</span>
      </label>
      <select
        value={category}
        onChange={(ev) => setCategory(ev.target.value)}
        className={showErrors && validationErrors.category ? "border-red-500" : ""}
      >
        <option value="">Uncategorized</option>
        {categories.length > 0 &&
          categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
      </select>
      {showErrors && validationErrors.category && (
        <p className="text-red-500 text-sm">{validationErrors.category}</p>
      )}

      <label>
        Photo
        <span className="text-red-500">*</span>
      </label>
      <div className="mb-2 flex flex-wrap gap-1">
        <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Add image</div>
          <input type="file" accept="image/*" onChange={uploadImage} className="hidden" />
        </label>
        {!!images?.length &&
          images.map((link) => (
            <div
              key={link}
              className="relative h-24"
              onClick={() => handleImageClick(link)}
            >
              <img
                src={link}
                alt=""
                className="w-64 h-48 ml-2 object-cover rounded-lg cursor-pointer hover:opacity-75"
              />
              {selectedImage === link && (
                <button
                  className="absolute top-1 right-1 text-white bg-red-500 rounded-full p-1 hover:bg-red-600"
                  onClick={handleCloseModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}
        {isUploading && (
          <div className="h-24 flex items-center">
            <Spinner />
          </div>
        )}
      </div>
      {showErrors && validationErrors.images && (
        <p className="text-red-500 text-sm mt-2">{validationErrors.images}</p>
      )}

      <label>
        Description
      </label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      />

      <label>
        Youtube Link
        <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        placeholder="youtubeUrl"
        value={youtubeUrl}
        onChange={(ev) => setYoutubeUrl(ev.target.value)}
        onBlur={validateYoutubeUrl} // Trigger validation when the user finishes typing
        className={(showErrors && validationErrors.youtubeUrl) || youtubeUrlError ? "border-red-500" : ""}
      />
      {(showErrors && validationErrors.youtubeUrl) && (
        <p className="text-red-500 text-sm">{validationErrors.youtubeUrl}</p>
      )}
      {youtubeUrlError && (
        <p className="text-red-500 text-sm">{youtubeUrlError}</p>
      )}

      <button type="submit" className="btn-primary" disabled={!validateForm()}>
        Save
      </button>
      <button type="button" className="btn-red ml-1" onClick={handleCancel}>
        Cancel
      </button>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center"
          onClick={handleCloseModal}
        >
          <div className="max-w-2xl max-h-2xl overflow-hidden rounded-lg p-4 relative">
            <img
              src={selectedImage}
              alt="Selected"
              className="rounded-lg max-w-full max-h-full"
            />
            <button
              className="absolute top-1 right-1 text-white bg-red-500 rounded-full p-1 hover:bg-red-600"
              onClick={handleCloseModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default CourseForm;
