"use client";

import React, { useState, useEffect } from "react";
import CourceCard from "../courseCards/CourseCard";
import API_URL from "@/data/config";

export default function Courses() {
  const [coursesData, setCoursesData] = useState([]); // For storing the API data
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("All Categories");
  const [categories, setCategories] = useState([]); // Store categories from API if necessary
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch data from API
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/courses`); // Replace with your API URL
        if (!response.ok) {
          throw new Error("Failed to fetch courses data");
        }
        const data = await response.json();
        setCoursesData(data);
        setFiltered(data); // Initially show all courses
        // Assuming the API response contains course categories, you can derive categories here
        const courseCategories = ["All Categories", ...new Set(data.map((course) => course.category))];
        setCategories(courseCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Filter courses when category changes
  useEffect(() => {
    if (category === "All Categories") {
      setFiltered(coursesData);
    } else {
      const filteredData = coursesData.filter((course) => course.category === category);
      setFiltered(filteredData);
    }
  }, [category, coursesData]);

  // Handle loading and error states
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <section className="layout-pt-lg layout-pb-lg">
      <div className="row justify-center text-center">
        <div className="col-auto">
          <div className="sectionTitle">
            <h2 className="sectionTitle__title sm:text-24">Our Courses</h2>
            <p className="sectionTitle__text">
              {/* 10,000+ unique online course list designs */}
            </p>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="tabs__controls flex-wrap pt-50 d-flex justify-center x-gap-10 js-tabs-controls">
        {categories.map((elm, i) => (
          <div onClick={() => setCategory(elm)} key={i}>
            <button
              className={`tabs__button px-15 py-8 rounded-8 js-tabs-button ${
                category === elm ? "tabActive" : ""
              }`}
              type="button"
            >
              {elm}
            </button>
          </div>
        ))}
      </div>

      {/* Course Cards */}
      <div
        className="pt-60 m-auto row y-gap-30 container pl-0 pr-0"
        data-aos="fade-right"
        data-aos-offset="80"
        data-aos-duration={800}
      >
        {filtered.length > 0
          ? filtered.map((course, index) => (
              <CourceCard
                key={index}
                data={course}
                index={index}
                data-aos="fade-right"
                data-aos-duration={(index + 1) * 300}
              />
            ))
          : <p>No courses found for this category.</p>}
      </div>
    </section>
  );
}
