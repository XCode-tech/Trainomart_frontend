"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API_URL from "@/data/config";

export default function CourseListFour() {
  const router = useRouter();
  const { tags } = router.query; // Get the tags from the URL query parameter
  const [courses, setCourses] = useState([]); // State to store fetched courses

  // Fetch courses from the API when the component mounts or tags change
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Only fetch courses if tags are present
        if (tags) {
          const response = await fetch(`${API_URL}/courses/?tags=${encodeURIComponent(tags)}`);
          const data = await response.json();
          setCourses(data); // Store fetched courses in state
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, [tags]); // Run this effect whenever `tags` changes

  return (
    <div>
      {/* Render courses here */}
      {courses.length > 0 ? (
        courses.map((course, index) => (
          <div key={index}>
            {/* Render course details */}
            <h2>{course.courseName}</h2>
            <p>{course.description}</p>
            <p>Price: {course.price}</p>
            {/* Add more course details as needed */}
          </div>
        ))
      ) : (
        <p>No courses found matching your criteria.</p>
      )}
    </div>
  );
}
