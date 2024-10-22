"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PaginationTwo from "../common/PaginationTwo";
import Star from "../common/Star";
import API_URL from "@/data/config";

export default function CourseListFour() {
  const [coursesData, setCoursesData] = useState([]);
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

  // Fetching courses from API on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${API_URL}/courses/?search=${encodeURIComponent(tags)}`); // Replace with your API URL
        const data = await response.json();
        setCoursesData(data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourses();
  }, []);

  // Filtering logic
  useEffect(() => {
    const refItems = coursesData.filter((elm) => {
      if (filterPrice === "All") {
        return true;
      } else if (filterPrice === "Free") {
        return !elm.paid;
      } else if (filterPrice === "Paid") {
        return elm.paid;
      }
    });

    let filteredArrays = [];

    if (filterInstructors.length > 0) {
      const filtered = refItems.filter((elm) =>
        filterInstructors.includes(elm.authorName),
      );
      filteredArrays = [...filteredArrays, filtered];
    }
    if (filterCategories.length > 0) {
      const filtered = refItems.filter((elm) =>
        filterCategories.includes(elm.category),
      );
      filteredArrays = [...filteredArrays, filtered];
    }
    if (filterLevels.length > 0) {
      const filtered = refItems.filter((elm) =>
        filterLevels.includes(elm.level),
      );
      filteredArrays = [...filteredArrays, filtered];
    }
    if (filterLanguage.length > 0) {
      const filtered = refItems.filter((elm) =>
        filterLanguage.includes(elm.language),
      );
      filteredArrays = [...filteredArrays, filtered];
    }
    if (filterRatingRange.length > 0) {
      const filtered = refItems.filter(
        (elm) =>
          elm.rating >= filterRatingRange[0] &&
          elm.rating <= filterRatingRange[1],
      );
      filteredArrays = [...filteredArrays, filtered];
    }
    if (filterDuration.length > 0) {
      const filtered = refItems.filter(
        (elm) =>
          elm.duration >= filterDuration[0] &&
          elm.duration <= filterDuration[1],
      );
      filteredArrays = [...filteredArrays, filtered];
    }

    const commonItems = refItems.filter((item) =>
      filteredArrays.every((array) => array.includes(item)),
    );
    setFilteredData(commonItems);
    setPageNumber(1);
  }, [
    coursesData,
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
    if (currentSortingOption === "Default") {
      setSortedFilteredData(filteredData);
    } else if (currentSortingOption === "Rating (asc)") {
      setSortedFilteredData(
        [...filteredData].sort((a, b) => a.rating - b.rating),
      );
    } else if (currentSortingOption === "Rating (dsc)") {
      setSortedFilteredData(
        [...filteredData].sort((a, b) => b.rating - a.rating),
      );
    } else if (currentSortingOption === "Price (asc)") {
      setSortedFilteredData(
        [...filteredData].sort((a, b) => a.discountedPrice - b.discountedPrice),
      );
    } else if (currentSortingOption === "Price (dsc)") {
      setSortedFilteredData(
        [...filteredData].sort((a, b) => b.discountedPrice - a.discountedPrice),
      );
    } else if (currentSortingOption === "Duration (asc)") {
      setSortedFilteredData(
        [...filteredData].sort((a, b) => a.duration - b.duration),
      );
    } else if (currentSortingOption === "Duration (dsc)") {
      setSortedFilteredData(
        [...filteredData].sort((a, b) => b.duration - a.duration),
      );
    }
  }, [currentSortingOption, filteredData]);

  return (
    <>
      <section className="page-header -type-1">
        <div className="container">
          <div className="page-header__content">
            <h1 className="page-header__title">User Interface Courses</h1>
            <p className="page-header__text">
              Write an introductory description of the category.
            </p>
          </div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-20 items-center justify-between pb-30">
            <div className="col-12">
              <div className="text-14 lh-12">
                Showing{" "}
                <span className="text-dark-1 fw-500">
                  {filteredData.length}
                </span>{" "}
                total results
              </div>
            </div>
          </div>

          <div className="row y-gap-30">
            {sortedFilteredData
              .slice((pageNumber - 1) * 12, pageNumber * 12)
              .map((elm, i) => (
                <div key={i} className="col-xl-3 col-lg-4 col-md-6">
                  <div className="coursesCard -type-1 ">
                    <div className="relative">
                      <div className="coursesCard__image overflow-hidden rounded-8">
                        <Image
                          width={510}
                          height={360}
                          className="w-1/1"
                          src={elm.course_image}
                          alt="course image"
                        />
                      </div>
                    </div>

                    <div className="h-100 pt-15">
                      
                      <div className="text-17 lh-15 fw-500 text-dark-1 mt-10">
                        <Link href={`/courses/${elm.id}`}>
                          {elm.title}{" "}
                        </Link>
                      </div>

                      <div className="d-flex x-gap-10 items-center pt-10">
                        <div className="text-14 lh-1">{elm.lesson} lessons</div>
                        <div className="text-14 lh-1">{elm.duration}</div>
                        <div className="text-14 lh-1">{elm.skill_level}</div>
                      </div>

                      <div className="coursesCard-footer">
                        

                        <div className="coursesCard-footer__price">
                          {elm.paid ? (
                            <>
                              <div>${elm.orignal_price}</div>
                              <div>${elm.price}</div>
                            </>
                          ) : (
                            <div>Free</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="row justify-center pt-90 lg:pt-50">
            <div className="col-auto">
              <PaginationTwo
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                data={sortedFilteredData}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
