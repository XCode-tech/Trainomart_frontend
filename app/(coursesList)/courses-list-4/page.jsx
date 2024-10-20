"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API_URL from "@/data/config";
import Star from "../common/Star"; // Adjust based on your actual file structure
import PaginationTwo from "../common/PaginationTwo"; // Adjust based on your actual file structure

export default function CourseListFive() {
  const router = useRouter();
  const { tags } = router.query; // Get the tags from the URL query parameter
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

  // Filtering logic
  useEffect(() => {
    const filteredCourses = courses.filter((elm) => {
      const price = parseFloat(elm.price) || 0;

      // Price Filter
      if (filterPrice === "Free" && price !== 0) return false;
      if (filterPrice === "Paid" && price === 0) return false;

      // Instructors Filter
      if (filterInstructors.length > 0 && !filterInstructors.includes(elm.authorName)) return false;

      // Categories Filter
      if (filterCategories.length > 0 && !filterCategories.includes(elm.category)) return false;

      // Levels Filter
      if (filterLevels.length > 0 && !filterLevels.includes(elm.level)) return false;

      // Language Filter
      if (filterLanguage.length > 0 && !filterLanguage.includes(elm.language)) return false;

      // Rating Range Filter
      if (filterRatingRange.length > 0 && (elm.rating < filterRatingRange[0] || elm.rating > filterRatingRange[1])) return false;

      // Duration Filter
      if (filterDuration.length > 0 && (elm.duration < filterDuration[0] || elm.duration > filterDuration[1])) return false;

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

  // Filter handler functions
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
  <div>
    {/* Render filtered courses here */}
    {sortedFilteredData.length > 0 ? (
      sortedFilteredData.map((course, index) => (
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
