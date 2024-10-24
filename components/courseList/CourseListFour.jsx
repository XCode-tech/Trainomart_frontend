"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PaginationTwo from "../common/PaginationTwo";
import { useSearchParams } from "next/navigation"; // Import useSearchParams hook for accessing query parameters
import API_URL from "@/data/config";

export default function CourseListFour() {
  const searchParams = useSearchParams(); // Initialize useSearchParams
  const searchTerm = searchParams.get("search") || ""; // Get the 'search' parameter from the URL
  const [coursesData, setCoursesData] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error handling
  const [pageNumber, setPageNumber] = useState(1);

  // Fetch courses when the search term changes
  useEffect(() => {
    const fetchCourses = async () => {
      if (!searchTerm) {
        setCoursesData([]); // Clear data when no search term is provided
        return;
      }

      setLoading(true);
      setError('');

      try {
        console.log("Searching for courses with searchTerm:", searchTerm);
        const response = await fetch(`${API_URL}/courses/?search=${encodeURIComponent(searchTerm)}`);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setCoursesData(data); // Save the fetched course data
      } catch (error) {
        console.error("Error fetching course data:", error);
        setError("Error fetching courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [searchTerm]);

  // If no search term is provided
  if (!searchTerm) {
    return <div className="container pt-4">Please enter a search term to find courses.</div>;
  }

  // If loading courses
  if (loading) {
    return <div className="container pt-4">Loading courses...</div>;
  }

  // If an error occurs
  if (error) {
    return <div className="container pt-4 text-red-500">{error}</div>;
  }

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
                  {coursesData.length}
                </span>{" "}
                total results
              </div>
            </div>
          </div>

          <div className="row y-gap-30">
            {coursesData
              .slice((pageNumber - 1) * 12, pageNumber * 12) // Paginate the data (12 items per page)
              .map((course, i) => (
                <div key={i} className="col-xl-3 col-lg-4 col-md-6">
                  <div className="coursesCard -type-1">
                    <div className="relative">
                      <div className="coursesCard__image overflow-hidden rounded-8">
                        <Image
                          width={510}
                          height={360}
                          className="w-1/1"
                          src={course.course_image}
                          alt={course.course_name}
                        />
                      </div>
                    </div>

                    <div className="h-100 pt-15">
                      <div className="text-17 lh-15 fw-500 text-dark-1 mt-10">
                        <Link href={`/courses/${course.id}`}>
                          {course.course_name}
                        </Link>
                      </div>

                      <div className="d-flex x-gap-10 items-center pt-10">
                        <div className="text-14 lh-1">
                          {course.lessons} lessons
                        </div>
                        <div className="text-14 lh-1">{course.duration}</div>
                        <div className="text-14 lh-1">{course.skill_level}</div>
                      </div>

                      <div className="coursesCard-footer">
                        <div className="coursesCard-footer__price">
                          {course.price ? (
                            <>
                              <div>${course.original_price}</div>
                              <div>${course.price}</div>
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
                data={coursesData}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
