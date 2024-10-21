import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Pagination from "./Pagination"; // Adjust the path as necessary

const CoursesPage = ({ courses }) => {
  const [currentSortingOption, setCurrentSortingOption] = useState("Default");
  const [filterCategories, setFilterCategories] = useState([]);
  const [filterDuration, setFilterDuration] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);

  // Sorting and filtering logic
  const categories = ["Category 1", "Category 2", "Category 3"]; // Example categories
  const duration = ["Short", "Medium", "Long"]; // Example duration options

  const handleFilterCategories = (item) => {
    setFilterCategories((prev) =>
      prev.includes(item)
        ? prev.filter((category) => category !== item)
        : [...prev, item]
    );
  };

  const handleFilterDuration = (item) => {
    setFilterDuration((prev) =>
      prev.includes(item)
        ? prev.filter((duration) => duration !== item)
        : [...prev, item]
    );
  };

  const sortedFilteredData = courses
    .filter((course) => filterCategories.length === 0 || filterCategories.includes(course.category))
    .filter((course) => filterDuration.length === 0 || filterDuration.includes(course.duration))
    .sort((a, b) => {
      if (currentSortingOption === "Default") return 0; // Adjust sort logic as necessary
      // Add your sorting logic here based on `currentSortingOption`
    });

  return (
    <div className="courses-page">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="mb-20">Courses</h2>

            <div className="filter-section mb-20">
              <div className="d-flex justify-content-between">
                <div className="dropdown">
                  <button className="btn dropdown-toggle" onClick={() => setFilterOpen((prev) => !prev)}>
                    Sort by: {currentSortingOption}
                  </button>
                  <div className={`dropdown-menu ${filterOpen ? "show" : ""}`}>
                    {["Default", "Newest", "Most Popular"].map((elm) => (
                      <div
                        key={elm}
                        className={`dropdown-item cursor-pointer ${currentSortingOption === elm ? "is-active" : ""}`}
                        onClick={() => {
                          setCurrentSortingOption(elm);
                          setFilterOpen(false); // Close dropdown on selection
                        }}
                      >
                        {elm}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="accordion__body">
              <div className="row x-gap-30 y-gap-30">
                <div className="col-lg-3 col-md-4 col-12">
                  <div className="bg-light-1 rounded-10 border-light-3 border">
                    <div className="p-20">
                      <h5 className="text-15 fw-500 mb-20">Categories</h5>
                      <div className="d-flex flex-column">
                        {categories.map((item, i) => (
                          <label key={i} className="text-14 text-dark-1 flex-row align-items-center cursor-pointer mb-10">
                            <input
                              type="checkbox"
                              checked={filterCategories.includes(item)}
                              onChange={() => handleFilterCategories(item)}
                            />
                            <span className="ml-10">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-4 col-12">
                  <div className="bg-light-1 rounded-10 border-light-3 border">
                    <div className="p-20">
                      <h5 className="text-15 fw-500 mb-20">Duration</h5>
                      <div className="d-flex flex-column">
                        {duration.map((item, i) => (
                          <label key={i} className="text-14 text-dark-1 flex-row align-items-center cursor-pointer mb-10">
                            <input
                              type="checkbox"
                              checked={filterDuration.includes(item)}
                              onChange={() => handleFilterDuration(item)}
                            />
                            <span className="ml-10">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row x-gap-30 y-gap-30">
              {sortedFilteredData.slice((pageNumber - 1) * 9, pageNumber * 9).map((course, index) => (
                <div className="col-lg-4 col-md-6 col-12" key={index}>
                  <div className="course-card">
                    <Link href={`/course/${course.id}`}>
                      <div className="course-card__image">
                        <Image
                          src={course.imageUrl}
                          alt={course.title}
                          width={600}
                          height={400}
                          className="rounded-10"
                        />
                      </div>
                      <div className="course-card__body">
                        <h4 className="course-card__title">{course.title}</h4>
                        <div className="course-card__meta">
                          <div className="course-card__instructor">{course.instructor}</div>
                          <div className="course-card__rating">{course.rating}</div>
                        </div>
                        <div className="course-card__price">{course.price}</div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <Pagination
              currentPage={pageNumber}
              totalItems={sortedFilteredData.length}
              itemsPerPage={9}
              onPageChange={(page) => setPageNumber(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
