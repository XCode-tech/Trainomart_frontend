"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import PaginationTwo from "../common/PaginationTwo";
import API_URL from "@/data/config";

export default function CourseListFive({ coursesData }) {
  const [sortedFilteredData, setSortedFilteredData] = useState([]); // Initialize to empty array
  const [currentSortingOption, setCurrentSortingOption] = useState("Best match");
  const [filterOpen, setFilterOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  // Fetch data on component mount
  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(`${API_URL}/courses`);
        const data = await response.json();
        setSortedFilteredData(data); // Ensure data is set correctly
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }

    fetchCourses();
  }, []);

  // Filter data logic
  const filteredData = sortedFilteredData.filter((course) => {
    // Implement your filtering logic, for now it's returning all courses
    return course; // Modify this as per your filtering needs
  });

  // Sort data logic
  const sortedData = filteredData.sort((a, b) => {
    // Implement your sorting logic based on the selected option
    return a.title.localeCompare(b.title); // Example: sorting by course title alphabetically
  });

  // Pagination logic
  const itemsPerPage = 10;
  const currentPageData = sortedData.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage);

  return (
    <>
      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row">
            {/* Filter and Sorting UI */}
            <div className="col-lg-12">
              <div className="d-flex justify-content-between align-items-center mb-20">
                <h2>Courses</h2>
                {/* Add your filter/sorting UI */}
                <select
                  value={currentSortingOption}
                  onChange={(e) => setCurrentSortingOption(e.target.value)}
                >
                  <option value="Best match">Best match</option>
                  <option value="Price (low to high)">Price (low to high)</option>
                  <option value="Price (high to low)">Price (high to low)</option>
                  {/* Add more sorting options as needed */}
                </select>
              </div>
            </div>
          </div>

          {/* Render Courses */}
          <div className="row y-gap-20">
            {currentPageData && currentPageData.length > 0 ? (
              currentPageData.map((course, i) => (
                <div className="col-lg-4 col-md-6" key={i}>
                  {/* Course card */}
                  <div className="course-card -type-5">
                    {/* Replace with your image path */}
                    <div className="course-card__image">
                      <img src={`/images/courses/${course.image}`} alt={course.title} />
                    </div>
                    <div className="course-card__content mt-20">
                      <h4 className="course-card__title">
                        <Link href={`/courses/${course.slug}`}>
                          <a>{course.title}</a>
                        </Link>
                      </h4>
                      <p>{course.description}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No courses found.</div> // Fallback if no data
            )}
          </div>

          {/* Pagination Component */}
          <PaginationTwo
            total={sortedData.length} // Total number of filtered and sorted items
            currentPage={pageNumber}
            onPageChange={(page) => setPageNumber(page)} // Update page number when page changes
          />
        </div>
      </section>
    </>
  );
}
