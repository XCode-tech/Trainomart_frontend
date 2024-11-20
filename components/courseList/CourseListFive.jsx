"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PaginationTwo from "../common/PaginationTwo";
import API_URL from "@/data/config";

export default function CourseListFive() {
  const [courses, setCourses] = useState([]); // State to store fetched courses
  const [filteredCourses, setFilteredCourses] = useState([]); // State to store filtered courses
  const [categories, setCategories] = useState([]); // State to store categories
  const [selectedCategory, setSelectedCategory] = useState("All Categories"); // State to manage the selected category
  const [pageNumber, setPageNumber] = useState(1);

  // Fetch courses and categories from the API when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${API_URL}/courses/`);
        const data = await response.json();
        setCourses(data); // Store fetched courses in state
        setFilteredCourses(data); // Initially show all courses
        console.log("data : ", data)
        // Assuming categories are part of the course data
        const courseCategories = ["All Categories", ...new Set(data.map((course) => course.category))];
        setCategories(courseCategories); // Set unique categories
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  // Filter courses when the selected category changes
  useEffect(() => {
    if (selectedCategory === "All Categories") {
      setFilteredCourses(courses); // Show all courses
    } else {
      const filteredData = courses.filter((course) => course.category === selectedCategory);
      setFilteredCourses(filteredData); // Filter courses by selected category
    }
  }, [selectedCategory, courses]);

  return (
    <>
      <section className="page-header -type-1">
        <div className="container">
          <div className="page-header__content">
            <div className="row">
              <div className="col-auto">
                <div>
                  <h1 className="page-header__title">Our Course Portfolio</h1>
                </div>
                <div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="container pt-5">
        <div className="tabs__controls flex-wrap d-flex justify-center x-gap-10 js-tabs-controls">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`tabs__button px-15 py-8 rounded-8 ${
                selectedCategory === category ? "tabActive" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              <b>{category}</b>
            </button>
          ))}
        </div>
      </div>

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="accordion js-accordion">
            <div className={`accordion__item`}>
              <div className="row y-gap-20 items-center justify-between pb-30">
                <div className="col-auto">
                  <div className="text-14 lh-12">
                    Showing{" "}
                    <span className="text-dark-1 fw-500">
                      {filteredCourses.length}
                    </span>{" "}
                    total results
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Courses Listing */}
          <div className="row y-gap-30">
            {filteredCourses
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
                    </div>

                    <div className="h-100 pt-20 pb-15 px-30">
                      <div className="text-17 lh-15 fw-500 text-dark-1 mt-10">
                        <Link className="linkCustom" href={`/courses/slug/${elm.slug}`}>
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
                        <div className="coursesCard-footer__author"></div>
                        <div className="coursesCard-footer__price">
                          <div className="">${elm.orignal_price}</div>
                          <div className="">${elm.price}</div>
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
                data={filteredCourses} // Pass filtered courses to pagination
                pageCapacity={12}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
