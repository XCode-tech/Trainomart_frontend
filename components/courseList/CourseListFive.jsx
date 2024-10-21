"use client";
import {
  categories,
  coursesData,
  duration,
  instructorNames,
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
                  <p className="page-header__text"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="accordion js-accordion">
            <div className={`accordion__item ${filterOpen ? "is-active" : ""} `}>
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
                                  className={`dropdown__item cursor-pointer ${
                                    currentSortingOption === elm
                                      ? "is-active"
                                      : ""
                                  }`}
                                  onClick={() => {
                                    setCurrentSortingOption(elm);
                                  }}
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
                      <div className="d-flex items-center">
                        <div className="text-14 lh-12 fw-500 text-dark-1 mr-20">
                          Filter:
                        </div>
                        <div
                          className="toggle-element d-flex items-center text-dark-1 cursor-pointer"
                          onClick={() => setFilterOpen((prev) => !prev)}
                        >
                          <span>Filter Options</span>
                          <i className="icon text-9 ml-10 icon-chevron-down"></i>
                        </div>
                      </div>
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
                            <label
                              key={i}
                              className="text-14 text-dark-1 flex-row align-items-center cursor-pointer mb-10"
                            >
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
                        <h5 className="text-15 fw-500 mb-20">Instructors</h5>
                        <div className="d-flex flex-column">
                          {instructorNames.map((item, i) => (
                            <label
                              key={i}
                              className="text-14 text-dark-1 flex-row align-items-center cursor-pointer mb-10"
                            >
                              <input
                                type="checkbox"
                                checked={filterInstructors.includes(item)}
                                onChange={() => handleFilterInstructors(item)}
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
                        <h5 className="text-15 fw-500 mb-20">Levels</h5>
                        <div className="d-flex flex-column">
                          {levels.map((item, i) => (
                            <label
                              key={i}
                              className="text-14 text-dark-1 flex-row align-items-center cursor-pointer mb-10"
                            >
                              <input
                                type="checkbox"
                                checked={filterLevels.includes(item)}
                                onChange={() => handleFilterLevels(item)}
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
                        <h5 className="text-15 fw-500 mb-20">Languages</h5>
                        <div className="d-flex flex-column">
                          {languages.map((item, i) => (
                            <label
                              key={i}
                              className="text-14 text-dark-1 flex-row align-items-center cursor-pointer mb-10"
                            >
                              <input
                                type="checkbox"
                                checked={filterLanguage.includes(item)}
                                onChange={() => handleFilterLanguage(item)}
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
                        <h5 className="text-15 fw-500 mb-20">Price</h5>
                        <div className="d-flex flex-column">
                          <label className="text-14 text-dark-1 flex-row align-items-center cursor-pointer mb-10">
                            <input
                              type="radio"
                              checked={filterPrice === "All"}
                              onChange={() => handleFilterPrice("All")}
                            />
                            <span className="ml-10">All</span>
                          </label>
                          <label className="text-14 text-dark-1 flex-row align-items-center cursor-pointer mb-10">
                            <input
                              type="radio"
                              checked={filterPrice === "Free"}
                              onChange={() => handleFilterPrice("Free")}
                            />
                            <span className="ml-10">Free</span>
                          </label>
                          <label className="text-14 text-dark-1 flex-row align-items-center cursor-pointer mb-10">
                            <input
                              type="radio"
                              checked={filterPrice === "Paid"}
                              onChange={() => handleFilterPrice("Paid")}
                            />
                            <span className="ml-10">Paid</span>
                          </label>
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
                            <label
                              key={i}
                              className="text-14 text-dark-1 flex-row align-items-center cursor-pointer mb-10"
                            >
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

                  <div className="col-lg-3 col-md-4 col-12">
                    <div className="bg-light-1 rounded-10 border-light-3 border">
                      <div className="p-20">
                        <h5 className="text-15 fw-500 mb-20">Rating</h5>
                        <div className="d-flex flex-column">
                          <label className="text-14 text-dark-1 flex-row align-items-center cursor-pointer mb-10">
                            <input
                              type="radio"
                              checked={filterRatingRange.length === 0}
                              onChange={() => handleFilterRatingRange([])}
                            />
                            <span className="ml-10">All</span>
                          </label>
                          <label className="text-14 text-dark-1 flex-row align-items-center cursor-pointer mb-10">
                            <input
                              type="radio"
                              checked={filterRatingRange.length === 2 && filterRatingRange[0] === 0 && filterRatingRange[1] === 5}
                              onChange={() => handleFilterRatingRange([0, 5])}
                            />
                            <span className="ml-10">0 - 5</span>
                          </label>
                          <label className="text-14 text-dark-1 flex-row align-items-center cursor-pointer mb-10">
                            <input
                              type="radio"
                              checked={filterRatingRange.length === 2 && filterRatingRange[0] === 4 && filterRatingRange[1] === 5}
                              onChange={() => handleFilterRatingRange([4, 5])}
                            />
                            <span className="ml-10">4 - 5</span>
                          </label>
                        </div>
                      </div>
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
  );
};

export default CoursesPage;
