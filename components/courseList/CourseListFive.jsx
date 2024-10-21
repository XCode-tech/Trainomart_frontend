"use client";
import React, { useState, useEffect } from "react";
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
            <div className={`accordion__item ${filterOpen ? "is-active" : ""}`}>
              <div className="row y-gap-20 items-center justify-between pb-30">
                <div className="col-auto">
                  <div className="text-14 lh-12">
                    Showing{" "}
                    <span className="text-dark-1 fw-500">{filteredData.length}</span>{" "}
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
                                    document
                                      .getElementById("dd51button")
                                      .classList.toggle("-is-dd-active");
                                    document
                                      .getElementById("dd51content")
                                      .classList.toggle("-is-el-visible");
                                  }}
                                  className={`${
                                    currentSortingOption === elm
                                      ? "text-blue-1 "
                                      : ""
                                  }d-flex items-center px-20 py-10 rounded-8 js-dropdown-link`}
                                  data-value={elm}
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
                        className="button h-50 px-24 -blue-1 text-dark-1 bg-blue-1-05"
                        onClick={() => setFilterOpen(!filterOpen)}
                      >
                        <i className="icon icon-up-down mr-10"></i> Filter
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`accordion__content ${filterOpen ? "is-active" : ""}`}>
                {/* Insert filter UI here */}
              </div>
            </div>
          </div>

          {/* Insert filtered and sorted courses here */}
          <div className="row y-gap-20">
            {sortedFilteredData.map((course, i) => (
              <div className="col-lg-4 col-md-6" key={i}>
                <div className="course-card -type-5">
                  <div className="course-card__image">
                    <Image
                      width={300}
                      height={200}
                      src={course.image}
                      alt={course.title}
                      className="rounded-8"
                    />
                  </div>

                  <div className="course-card__content mt-20">
                    <h4 className="course-card__title">
                      <Link href={`/courses/${course.slug}`}>
                        {course.title}
                      </Link>
                    </h4>
                    <div className="course-card__meta mt-10">
                      <div className="d-flex items-center">
                        <Star rating={course.rating} />
                        <span className="ml-10 text-dark-1 text-12 lh-12 fw-500">
                          ({course.reviewsCount} reviews)
                        </span>
                      </div>
                      <div className="mt-10 text-dark-1 text-12 lh-12 fw-500">
                        {course.duration} hours
                      </div>
                    </div>

                    <div className="d-flex items-center justify-between mt-15">
                      <div className="course-card__price">
                        {course.price === 0 ? (
                          <span className="text-dark-1">Free</span>
                        ) : (
                          <>
                            <span className="text-dark-1">
                              ${course.discountedPrice}
                            </span>{" "}
                            <del className="text-light-2">${course.price}</del>
                          </>
                        )}
                      </div>

                      <Link href={`/courses/${course.slug}`} className="button -sm -blue-1 h-40">
                        Enroll Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <PaginationTwo
            total={sortedFilteredData.length}
            currentPage={pageNumber}
            onPageChange={(page) => setPageNumber(page)}
          />
        </div>
      </section>
    </>
  );
}
