"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import API_URL from "@/data/config";

export default function CoursesList() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search"); // Get the search query from the URL
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (searchQuery) {
      fetchCoursesByTags(searchQuery); // Fetch courses when the page loads with the search query
    }
  }, [searchQuery]);

  const fetchCoursesByTags = async (tags) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/courses/?search=${encodeURIComponent(tags)}`);
      if (!response.ok) {
        throw new Error("Failed to fetch courses by tags");
      }
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Search Results for: {searchQuery}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course.id}>{course.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
