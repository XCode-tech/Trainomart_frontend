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
                                    document
                                      .getElementById("dd51button")
                                      .classList.toggle("-is-dd-active");
                                    document
                                      .getElementById("dd51content")
                                      .classList.toggle("-is-el-visible");
                                  }}
                                >
                                  <span
                                    className={`d-block js-dropdown-link cursor ${
                                      currentSortingOption === elm
                                        ? "activeMenu"
                                        : ""
                                    } `}
                                  >
                                    {elm}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-auto">
                      <div
                        className="accordion__button w-unset"
                        onClick={() => setFilterOpen((pre) => !pre)}
                      >
                        <button className="button h-50 px-30 -light-7 text-purple-1">
                          <i className="icon-filter mr-10"></i>
                          Filter
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="accordion__content"
                style={filterOpen ? { maxHeight: "1800px" } : {}}
              >
                <div className="sidebar -courses px-30 py-30 rounded-8 bg-light-3 mb-50">
                  <div className="row x-gap-60 y-gap-40">
                    {/* Category Filter */}
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                      <div className="sidebar__item">
                        <h5 className="sidebar__title">Category</h5>
                        <div className="sidebar-checkbox">
                          <div
                            className="sidebar-checkbox__item cursor"
                            onClick={() => setFilterCategories([])}
                          >
                            <div className="form-checkbox">
                              <input
                                type="checkbox"
                                checked={filterCategories.length === 0}
                                readOnly
                              />
                              <div className="form-checkbox__mark">
                                <div className="form-checkbox__icon icon-check"></div>
                              </div>
                            </div>

                            <div className="sidebar-checkbox__title">All</div>
                            <div className="sidebar-checkbox__count"></div>
                          </div>
                          {categories.map((item, index) => (
                            <div
                              className="sidebar-checkbox__item cursor"
                              key={index}
                              onClick={() => handleFilterCategories(item.title)}
                            >
                              <div className="form-checkbox">
                                <input
                                  type="checkbox"
                                  checked={filterCategories.includes(item.title)}
                                  readOnly
                                />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check"></div>
                                </div>
                              </div>

                              <div className="sidebar-checkbox__title">
                                {item.title}
                              </div>
                              <div className="sidebar-checkbox__count">
                                (
                                {
                                  courses.filter(
                                    (itm) => itm.category === item.title
                                  ).length
                                }
                                )
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="sidebar__more mt-15">
                          <a
                            href="#"
                            className="text-14 fw-500 underline text-purple-1"
                          >
                            Show more
                          </a>
                        </div>
                      </div>
                    </div>

                   
                    {/* Language Filter */}
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                      <div className="sidebar__item">
                        <h5 className="sidebar__title">Language</h5>
                        <div className="sidebar-checkbox">
                          <div
                            className="sidebar-checkbox__item cursor"
                            onClick={() => setFilterLanguage([])}
                          >
                            <div className="form-checkbox">
                              <input
                                type="checkbox"
                                checked={filterLanguage.length === 0}
                                readOnly
                              />
                              <div className="form-checkbox__mark">
                                <div className="form-checkbox__icon icon-check"></div>
                              </div>
                            </div>

                            <div className="sidebar-checkbox__title">All</div>
                            <div className="sidebar-checkbox__count"></div>
                          </div>
                          {languages.map((item, index) => (
                            <div
                              className="sidebar-checkbox__item cursor"
                              key={index}
                              onClick={() => handleFilterLanguage(item.title)}
                            >
                              <div className="form-checkbox">
                                <input
                                  type="checkbox"
                                  checked={filterLanguage.includes(item.title)}
                                  readOnly
                                />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check"></div>
                                </div>
                              </div>

                              <div className="sidebar-checkbox__title">
                                {item.title}
                              </div>
                              <div className="sidebar-checkbox__count">
                                (
                                {
                                  courses.filter(
                                    (itm) => itm.language === item.title
                                  ).length
                                }
                                )
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="sidebar__more mt-15">
                          <a
                            href="#"
                            className="text-14 fw-500 underline text-purple-1"
                          >
                            Show more
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Duration Filter */}
                    <div className="col-xl-3 col-lg-4 col-sm-6">
                      <div className="sidebar__item">
                        <h5 className="sidebar__title">Duration</h5>
                        <div className="sidebar-checkbox">
                          <div
                            className="sidebar-checkbox__item cursor"
                            onClick={() => setFilterDuration([])}
                          >
                            <div className="form-checkbox">
                              <input
                                type="checkbox"
                                checked={filterDuration.length === 0}
                                readOnly
                              />
                              <div className="form-checkbox__mark">
                                <div className="form-checkbox__icon icon-check"></div>
                              </div>
                            </div>
                            <div className="sidebar-checkbox__title">All</div>
                            <div className="sidebar-checkbox__count"></div>
                          </div>
                          {duration.map((item, index) => (
                            <div
                              className="sidebar-checkbox__item cursor"
                              key={index}
                              onClick={() => handleFilterDuration(item.range)}
                            >
                              <div className="form-checkbox">
                                <input
                                  type="checkbox"
                                  checked={
                                    filterDuration.toString() ===
                                    item.range.toString()
                                  }
                                  readOnly
                                />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check"></div>
                                </div>
                              </div>
                              <div className="sidebar-checkbox__title">
                                {item.title}
                              </div>
                              <div className="sidebar-checkbox__count">
                                (
                                {
                                  courses.filter(
                                    (itm) =>
                                      itm.duration >= item.range[0] &&
                                      itm.duration <= item.range[1]
                                  ).length
                                }
                                )
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Courses Listing */}
          <div className="row y-gap-30">
            {sortedFilteredData
              .slice((pageNumber - 1) * 12, pageNumber * 12)
              .map((elm, i) => (
                <div key={i} className="col-lg-4 col-md-6">
                  <div className="coursesCard -type-1 rounded-8 bg-white shadow-3">
                    <div className="relative">
                      <div className="coursesCard__image overflow-hidden rounded-top-8">
                        <Image
                          width={510}
                          height={360}
                          className="w-1/1"
                          src={elm.course_image}
                          alt={elm.course_name}
                        />
                        <div className="coursesCard__image_overlay rounded-top-8"></div>
                      </div>
                      <div className="d-flex justify-between py-10 px-10 absolute-full-center z-3">
                        {elm.popular && (
                          <>
                            <div>
                              <div className="px-15 rounded-200 bg-purple-1">
                                <span className="text-11 lh-1 uppercase fw-500 text-white">
                                  Popular
                                </span>
                              </div>
                            </div>

                            <div>
                              <div className="px-15 rounded-200 bg-green-1">
                                <span className="text-11 lh-1 uppercase fw-500 text-dark-1">
                                  Best sellers
                                </span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="h-100 pt-20 pb-15 px-30">
{/*                       <div className="d-flex items-center">
                        <div className="text-14 lh-1 text-yellow-1 mr-10">
                          {elm.rating}
                        </div>
                        <div className="d-flex x-gap-5 items-center">
                          <Star star={elm.rating} />
                        </div>
                        <div className="text-13 lh-1 ml-10">
                          ({elm.ratingCount})
                        </div>
                      </div> */}

                      <div className="text-17 lh-15 fw-500 text-dark-1 mt-10">
                        <Link className="linkCustom" href={`/courses/${elm.id}`}>
                          {elm.course_name}
                        </Link>
                      </div>

                      <div className="d-flex x-gap-10 items-center pt-10">
                        <div className="d-flex items-center">
                          <div className="mr-8">
                            <Image
                              width={16}
                              height={17}
                              src="/assets/img/coursesCards/icons/1.svg"
                              alt="Lessons Icon"
                            />
                          </div>
                          <div className="text-14 lh-1">
                            {elm.lessons} lesson
                          </div>
                        </div>

                        <div className="d-flex items-center">
                          <div className="mr-8">
                            <Image
                              width={16}
                              height={17}
                              src="/assets/img/coursesCards/icons/2.svg"
                              alt="Duration Icon"
                            />
                          </div>
                          <div className="text-14 lh-1">
                            {/* {`${Math.floor(
                            elm.duration / 60
                          )}h ${Math.floor(elm.duration % 60)}m`} */}
                          {elm.duration}
                          </div>
                        </div>

                        <div className="d-flex items-center">
                          <div className="mr-8">
                            <Image
                              width={16}
                              height={17}
                              src="/assets/img/coursesCards/icons/3.svg"
                              alt="Level Icon"
                            />
                          </div>
                          <div className="text-14 lh-1">{elm.skill_level}</div>
                        </div>
                      </div>

                      <div className="coursesCard-footer">
                        <div className="coursesCard-footer__author">
                          {/* <Image
                            width={30}
                            height={30}
                            src={elm.authorImageSrc}
                            alt={elm.authorName}
                          /> */}
                          {/* <div className="">{elm.price}</div> */}
                        </div>

                        <div className="coursesCard-footer__price">
                          {/* {elm.paid ? (
                            <>
                              <div>${elm.price}</div>
                              <div>${elm.price}</div>
                            </>
                          ) : (
                            <>
                              <div></div>
                              <div>Free</div>
                            </>
                          )} */}
                          <div className="">{elm.orignal_price}</div>
                          <div className="">{elm.price}</div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Pagination */}
          <div className="row justify-center pt-90 lg:pt-50">
            <div className="col-auto">
              <PaginationTwo
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                data={sortedFilteredData}
                pageCapacity={12}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
