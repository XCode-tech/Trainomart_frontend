"use client";

import React, { useState, useEffect } from 'react';

const CourseListFive = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [filters, setFilters] = useState({
    region: 'All',
    brand: 'All',
    priceRange: 'All',
    duration: 'All',
  });

  useEffect(() => {
    // Fetch courses from API
    const fetchCourses = async () => {
      const res = await fetch('http://localhost:8080/courses');
      const data = await res.json();
      setCourses(data);
      setFilteredCourses(data);
    };
    fetchCourses();
  }, []);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Handle search change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Apply filters and search query
  useEffect(() => {
    let updatedCourses = [...courses];

    // Filter by region
    if (filters.region !== 'All') {
      updatedCourses = updatedCourses.filter(course => course.region === filters.region);
    }

    // Filter by brand
    if (filters.brand !== 'All') {
      updatedCourses = updatedCourses.filter(course => course.brand === filters.brand);
    }

    // Filter by price
    if (filters.priceRange !== 'All') {
      if (filters.priceRange === 'Low to High') {
        updatedCourses.sort((a, b) => a.price - b.price);
      } else if (filters.priceRange === 'High to Low') {
        updatedCourses.sort((a, b) => b.price - a.price);
      }
    }

    // Filter by duration
    if (filters.duration !== 'All') {
      if (filters.duration === 'Short') {
        updatedCourses = updatedCourses.filter(course => course.duration <= 10);
      } else if (filters.duration === 'Long') {
        updatedCourses = updatedCourses.filter(course => course.duration > 10);
      }
    }

    // Filter by search query
    if (searchQuery) {
      updatedCourses = updatedCourses.filter(course =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCourses(updatedCourses);
  }, [filters, searchQuery, courses]);

  // Handle sorting
  useEffect(() => {
    let sortedCourses = [...filteredCourses];

    if (sortOption === 'Price Low to High') {
      sortedCourses.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'Price High to Low') {
      sortedCourses.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'Duration') {
      sortedCourses.sort((a, b) => a.duration - b.duration);
    } else if (sortOption === 'Name A-Z') {
      sortedCourses.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'Name Z-A') {
      sortedCourses.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredCourses(sortedCourses);
  }, [sortOption, filteredCourses]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>

      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search courses"
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 border rounded"
        />

        {/* Filters */}
        <select name="region" value={filters.region} onChange={handleFilterChange} className="p-2 border rounded">
          <option value="All">All Regions</option>
          <option value="UK">UK</option>
          <option value="USA">USA</option>
        </select>

        <select name="brand" value={filters.brand} onChange={handleFilterChange} className="p-2 border rounded">
          <option value="All">All Brands</option>
          <option value="Brand A">Brand A</option>
          <option value="Brand B">Brand B</option>
        </select>

        <select name="priceRange" value={filters.priceRange} onChange={handleFilterChange} className="p-2 border rounded">
          <option value="All">All Prices</option>
          <option value="Low to High">Price: Low to High</option>
          <option value="High to Low">Price: High to Low</option>
        </select>

        <select name="duration" value={filters.duration} onChange={handleFilterChange} className="p-2 border rounded">
          <option value="All">All Durations</option>
          <option value="Short">Short (<= 10 hours)</option>
          <option value="Long">Long (> 10 hours)</option>
        </select>

        {/* Sort */}
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="p-2 border rounded">
          <option value="">Sort by</option>
          <option value="Price Low to High">Price Low to High</option>
          <option value="Price High to Low">Price High to Low</option>
          <option value="Duration">Duration</option>
          <option value="Name A-Z">Name A-Z</option>
          <option value="Name Z-A">Name Z-A</option>
        </select>
      </div>

      {/* Course List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map((course) => (
          <div key={course.id} className="p-4 border rounded shadow">
            <h2 className="text-lg font-bold">{course.name}</h2>
            <p>Price: ${course.price}</p>
            <p>Duration: {course.duration} hours</p>
            <p>Region: {course.region}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseListFive;
