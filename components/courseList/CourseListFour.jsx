"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PaginationTwo from "../common/PaginationTwo";
import API_URL from "@/data/config";

export default function CourseListFour({ tags = "" }) { // Default to an empty string
  const [coursesData, setCoursesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortedFilteredData, setSortedFilteredData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  // Fetching courses from API on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        console.log('tags:', tags);  
        const response = await fetch(`${API_URL}/courses/?search=${encodeURIComponent(tags)}`);
        const data = await response.json();
        setCoursesData(data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourses();
  }, [tags]);

  console.log("CoursesData : ", coursesData)

  // Filtering logic
  useEffect(() => {
    setFilteredData(coursesData);
    setPageNumber(1);
  }, [coursesData]);
  
  // Sorting logic
  useEffect(() => {
    setSortedFilteredData(filteredData);
  }, [filteredData]);
  return (
    <>
      <section className="page-header -type-1">
        <div className="container">
          <div className="page-header__content">
            <h1 className="page-header__title">Courses</h1>
            <p className="page-header__text">
              Browse through our latest offerings.
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
              .map((coursesData, i) => (
                <div key={i} className="col-xl-3 col-lg-4 col-md-6">
                  <div className="coursesCard -type-1">
                    <div className="relative">
                      <div className="coursesCard__image overflow-hidden rounded-8">
                        <Image
                          width={510}
                          height={360}
                          className="w-1/1"
                          src={coursesData.course_image}
                          alt={coursesData.course_name}
                        />
                      </div>
                    </div>

                    <div className="h-100 pt-15">
                      <div className="text-17 lh-15 fw-500 text-dark-1 mt-10">
                        <Link href={`/courses/${coursesData.id}`}>
                          {coursesData.course_name}
                        </Link>
                      </div>

                      <div className="d-flex x-gap-10 items-center pt-10">
                        <div className="text-14 lh-1">
                          {coursesData.lessons} lessons
                        </div>
                        <div className="text-14 lh-1">{coursesData.duration}</div>
                        <div className="text-14 lh-1">{coursesData.skill_level}</div>
                      </div>

                      <div className="coursesCard-footer">
                        <div className="coursesCard-footer__price">
                          {coursesData.price ? (
                            <>
                              <div>${coursesData.orignal_price}</div>
                              <div>${coursesData.price}</div>
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
