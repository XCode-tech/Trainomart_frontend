"use client";
import {
  categories,
  coursesData,
  duration,
  instractorNames,
  languages,
  levels,
  prices,
  rating,
  sortingOptions,
} from "@/data/courses";
import React, { useState, useEffect } from "react";
import Star from "../common/Star";
import PaginationTwo from "../common/PaginationTwo";
import Image from "next/image";
import Link from "next/link";
import API_URL from "@/data/config";

export default function CourseListFive() {
  const [courses, setCourses] = useState([]); // State to store fetched courses
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterCategories, setFilterCategories] = useState([]);
  const [filterRatingRange, setFilterRatingRange] = useState([]);
  const [filterInstructors, setFilterInstructors] = useState([]);
  const [filterPrice, setFilterPrice] = useState("All");
  const [filterLevels, setFilterLevels] = useState([]);
  const [filterLanguage, setFilterLanguage] = useState([]);
  const [filterDuration, setFilterDuration] = useState([]);
  const [currentSortingOption, setCurrentSortingOption] = useState("Default");
  const [filteredData, setFilteredData] = useState([]);
  const [sortedFilteredData, setSortedFilteredData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  // Fetch courses from the API when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${API_URL}/courses/`);
        const data = await response.json();
        setCourses(data); // Store fetched courses in state
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  // Filtering logic
  useEffect(() => {
    const filteredCourses = courses.filter((elm) => {
      const price = parseFloat(elm.price) || 0;

      // Price Filter
      if (filterPrice === "Free" && price !== 0) return false;
      if (filterPrice === "Paid" && price === 0) return false;

      // Instructors Filter
      if (
        filterInstructors.length > 0 &&
        !filterInstructors.includes(elm.authorName)
      )
        return false;

      // Categories Filter
      if (
        filterCategories.length > 0 &&
        !filterCategories.includes(elm.category)
      )
        return false;

      // Levels Filter
      if (filterLevels.length > 0 && !filterLevels.includes(elm.level))
        return false;

      // Language Filter
      if (
        filterLanguage.length > 0 &&
        !filterLanguage.includes(elm.language)
      )
        return false;

      // Rating Range Filter
      if (
        filterRatingRange.length > 0 &&
        (elm.rating < filterRatingRange[0] ||
          elm.rating > filterRatingRange[1])
      )
        return false;

      // Duration Filter
      if (
        filterDuration.length > 0 &&
        (elm.duration < filterDuration[0] || elm.duration > filterDuration[1])
      )
        return false;

      return true;
    });

    setFilteredData(filteredCourses);
    setPageNumber(1);
  }, [
    courses,
    filterCategories,
    filterRatingRange,
    filterInstructors,
    filterPrice,
    filterLevels,
    filterLanguage,
    filterDuration,
  ]);

  // Sorting logic
  useEffect(() => {
    if (!filteredData || filteredData.length === 0) return;

    if (currentSortingOption === "Default") {
      setSortedFilteredData(filteredData);
    } else if (currentSortingOption === "Rating (asc)") {
      setSortedFilteredData([...filteredData].sort((a, b) => (a.rating || 0) - (b.rating || 0)));
    } else if (currentSortingOption === "Rating (dsc)") {
      setSortedFilteredData([...filteredData].sort((a, b) => (b.rating || 0) - (a.rating || 0)));
    } else if (currentSortingOption === "Price (asc)") {
      setSortedFilteredData([...filteredData].sort((a, b) => parseFloat(a.discountedPrice || 0) - parseFloat(b.discountedPrice || 0)));
    } else if (currentSortingOption === "Price (dsc)") {
      setSortedFilteredData([...filteredData].sort((a, b) => parseFloat(b.discountedPrice || 0) - parseFloat(a.discountedPrice || 0)));
    } else if (currentSortingOption === "Duration (asc)") {
      setSortedFilteredData([...filteredData].sort((a, b) => (a.duration || 0) - (b.duration || 0)));
    } else if (currentSortingOption === "Duration (dsc)") {
      setSortedFilteredData([...filteredData].sort((a, b) => (b.duration || 0) - (a.duration || 0)));
    }
  }, [currentSortingOption, filteredData]);

  const handleFilterCategories = (item) => {
    if (filterCategories.includes(item)) {
      const filtered = filterCategories.filter((elm) => elm !== item);
      setFilterCategories([...filtered]);
    } else {
      setFilterCategories((pre) => [...pre, item]);
    }
  };

  const handleFilterRatingRange = (item) => {
    setFilterRatingRange(item);
  };

  const handleFilterInstructors = (item) => {
    if (filterInstructors.includes(item)) {
      const filtered = filterInstructors.filter((elm) => elm !== item);
      setFilterInstructors([...filtered]);
    } else {
      setFilterInstructors((pre) => [...pre, item]);
    }
  };

  const handleFilterPrice = (item) => {
    setFilterPrice(item);
  };

  const handleFilterLevels = (item) => {
    if (filterLevels.includes(item)) {
      const filtered = filterLevels.filter((elm) => elm !== item);
      setFilterLevels([...filtered]);
    } else {
      setFilterLevels((pre) => [...pre, item]);
    }
  };

  const handleFilterLanguage = (item) => {
    if (filterLanguage.includes(item)) {
      const filtered = filterLanguage.filter((elm) => elm !== item);
      setFilterLanguage([...filtered]);
    } else {
      setFilterLanguage((pre) => [...pre, item]);
    }
  };

  const handleFilterDuration = (item) => {
    setFilterDuration(item);
  };

  return (
    <>
      <section className="page-header -type-1">
        <div className="container">
          <div className="page-header__content">
            <div className="row">
              <div className="col-auto">
                <div>
                  <h1 className="page-header__title">Our Courses Portfolio</h1>
                </div>

                <div>
                  <p className="page-header__text">
                    {/* Optional description or text */}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="accordion js-accordion">
            <div
              className={`accordion__item ${filterOpen ? "is-active" : ""} `}
            >
              <div className="row y-gap-20 items-center justify-between pb-30">
                <div className="col-auto">
                  <div className="text-14 lh-12">
                    Showing{" "}
                    <span className="text-dark-1 fw-500">
                      {filteredData.length}
                    </span>{" "}
                    total results
                  </div>
                </div>

                <div className="col-auto">
                  <div className="row x-gap-20 y-gap-20">
                    <div className="col-auto">
                      <div className="d-flex items-center">
                        <div className="text-14 lh-12 fw-500 text-dark-1 mr-20">
                          Sort by:
                        </div>

                        <div
                          id="dd51button"
                          className="dropdown js-dropdown js-category-active"
                        >
                          <div
                            className="dropdown__button d-flex items-center text-14 rounded-8 px-20 py-10"
                            onClick={() => {
                              document
                                .getElementById("dd51button")
                                .classList.toggle("-is-dd-active");
                              document
                                .getElementById("dd51content")
                                .classList.toggle("-is-el-visible");
                            }}
                            data-el-toggle=".js-category-toggle"
                            data-el-toggle-active=".js-category-active"
                          >
                            <span className="js-dropdown-title">
                              {currentSortingOption}
                            </span>
                            <i className="icon text-9 ml-40 icon-chevron-down"></i>
                          </div>

                          <div
                            id="dd51content"
                            className="toggle-element -dropdown -dark-bg-dark-2 -dark-border-white-10 js-click-dropdown js-category-toggle"
                          >
                            <div className="text-14 y-gap-15 js-dropdown-list">
                              {sortingOptions.map((elm, i) => (
                                <div
                                  key={i}
                                  onClick={() => {
                                    setCurrentSortingOption(elm);
                                  }}
                                  className="cursor-pointer p-10 rounded-4 hover-bg-light-3"
                                >
                                  {elm}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-auto">
                      <button
                        className="button -icon -blue-1 text-white bg-blue-1"
                        onClick={() => setFilterOpen(!filterOpen)}
                      >
                        Filter
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`accordion__content -is-open ${
                  filterOpen ? "is-active" : ""
                }`}
              >
                <div className="row y-gap-20">
                  <div className="col-lg-3 col-md-6">
                    <h5 className="text-15 fw-500">Categories</h5>
                    <div className="row x-gap-15">
                      {categories.map((item, i) => (
                        <div key={i} className="col-auto">
                          <div className="form-checkbox">
                            <input
                              type="checkbox"
                              id={`filter-category-${i}`}
                              checked={filterCategories.includes(item)}
                              onChange={() => handleFilterCategories(item)}
                            />
                            <label htmlFor={`filter-category-${i}`}>
                              {item}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6">
                    <h5 className="text-15 fw-500">Rating Range</h5>
                    <div className="row x-gap-15">
                      <div className="col-auto">
                        <button
                          className={`button -outline -blue-1 text-blue-1 ${
                            filterRatingRange.length === 0 ? "is-active" : ""
                          }`}
                          onClick={() => handleFilterRatingRange([])}
                        >
                          All Ratings
                        </button>
                      </div>
                      <div className="col-auto">
                        <button
                          className={`button -outline -blue-1 text-blue-1 ${
                            filterRatingRange[0] === 1 ? "is-active" : ""
                          }`}
                          onClick={() =>
                            handleFilterRatingRange([1, 1.99])
                          }
                        >
                          1 Star
                        </button>
                      </div>
                      <div className="col-auto">
                        <button
                          className={`button -outline -blue-1 text-blue-1 ${
                            filterRatingRange[0] === 2 ? "is-active" : ""
                          }`}
                          onClick={() =>
                            handleFilterRatingRange([2, 2.99])
                          }
                        >
                          2 Stars
                        </button>
                      </div>
                      <div className="col-auto">
                        <button
                          className={`button -outline -blue-1 text-blue-1 ${
                            filterRatingRange[0] === 3 ? "is-active" : ""
                          }`}
                          onClick={() =>
                            handleFilterRatingRange([3, 3.99])
                          }
                        >
                          3 Stars
                        </button>
                      </div>
                      <div className="col-auto">
                        <button
                          className={`button -outline -blue-1 text-blue-1 ${
                            filterRatingRange[0] === 4 ? "is-active" : ""
                          }`}
                          onClick={() =>
                            handleFilterRatingRange([4, 4.99])
                          }
                        >
                          4 Stars
                        </button>
                      </div>
                      <div className="col-auto">
                        <button
                          className={`button -outline -blue-1 text-blue-1 ${
                            filterRatingRange[0] === 5 ? "is-active" : ""
                          }`}
                          onClick={() =>
                            handleFilterRatingRange([5, 5])
                          }
                        >
                          5 Stars
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6">
                    <h5 className="text-15 fw-500">Instructors</h5>
                    <div className="row x-gap-15">
                      {instractorNames.map((item, i) => (
                        <div key={i} className="col-auto">
                          <div className="form-checkbox">
                            <input
                              type="checkbox"
                              id={`filter-instructor-${i}`}
                              checked={filterInstructors.includes(item)}
                              onChange={() => handleFilterInstructors(item)}
                            />
                            <label htmlFor={`filter-instructor-${i}`}>
                              {item}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6">
                    <h5 className="text-15 fw-500">Price</h5>
                    <div className="row x-gap-15">
                      {prices.map((item, i) => (
                        <div key={i} className="col-auto">
                          <div className="form-checkbox">
                            <input
                              type="radio"
                              id={`filter-price-${i}`}
                              name="price"
                              checked={filterPrice === item}
                              onChange={() => handleFilterPrice(item)}
                            />
                            <label htmlFor={`filter-price-${i}`}>{item}</label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6">
                    <h5 className="text-15 fw-500">Level</h5>
                    <div className="row x-gap-15">
                      {levels.map((item, i) => (
                        <div key={i} className="col-auto">
                          <div className="form-checkbox">
                            <input
                              type="checkbox"
                              id={`filter-level-${i}`}
                              checked={filterLevels.includes(item)}
                              onChange={() => handleFilterLevels(item)}
                            />
                            <label htmlFor={`filter-level-${i}`}>{item}</label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6">
                    <h5 className="text-15 fw-500">Language</h5>
                    <div className="row x-gap-15">
                      {languages.map((item, i) => (
                        <div key={i} className="col-auto">
                          <div className="form-checkbox">
                            <input
                              type="checkbox"
                              id={`filter-language-${i}`}
                              checked={filterLanguage.includes(item)}
                              onChange={() => handleFilterLanguage(item)}
                            />
                            <label htmlFor={`filter-language-${i}`}>
                              {item}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6">
                    <h5 className="text-15 fw-500">Duration</h5>
                    <div className="row x-gap-15">
                      {duration.map((item, i) => (
                        <div key={i} className="col-auto">
                          <div className="form-checkbox">
                            <input
                              type="radio"
                              id={`filter-duration-${i}`}
                              name="duration"
                              checked={filterDuration[0] === item[0]}
                              onChange={() => handleFilterDuration(item)}
                            />
                            <label htmlFor={`filter-duration-${i}`}>
                              {item[0]} - {item[1]}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row y-gap-30">
            {sortedFilteredData.length > 0 ? (
              sortedFilteredData
                .slice((pageNumber - 1) * 8, pageNumber * 8)
                .map((course) => (
                  <div key={course.id} className="col-lg-3 col-md-4 col-sm-6">
                    <Link href={`/course/${course.id}`}>
                      <div className="course-card">
                        <Image
                          src={course.image}
                          alt={course.title}
                          width={300}
                          height={200}
                          className="course-card__image"
                        />
                        <div className="course-card__content">
                          <h4 className="course-card__title">{course.title}</h4>
                          <div className="course-card__rating">
                            <Star rating={course.rating} />
                          </div>
                          <p className="course-card__price">${course.discountedPrice}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
            ) : (
              <div className="col-12 text-center">
                <p>No courses found based on your filters.</p>
              </div>
            )}
          </div>

          {sortedFilteredData.length > 0 && (
            <PaginationTwo
              totalResults={sortedFilteredData.length}
              resultsPerPage={8}
              setPageNumber={setPageNumber}
              currentPage={pageNumber}
            />
          )}
        </div>
      </section>
    </>
  );
}
