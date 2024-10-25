"use client";

import React, { useState, useEffect } from "react";
import { format, addDays } from "date-fns";
import Head from "next/head";
import API_URL from "@/data/config";

export default function CourseDetailsOne({ id }) {
  const [pageItem, setPageItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const calculateStartDate = () => {
    const now = new Date();
    const nextMonth = now.getMonth() + 1 === 12 ? 0 : now.getMonth() + 1;
    const year = now.getMonth() + 1 === 12 ? now.getFullYear() + 1 : now.getFullYear();
    return new Date(year, nextMonth, 5);
  };

  const calculateEndDate = (startDate, duration) => {
    if (!duration || !startDate) return null;
    const durationDays = parseInt(duration, 10);
    if (isNaN(durationDays)) return null;
    return format(addDays(startDate, durationDays - 1), "do MMM yyyy");
  };

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/courses/${id}`);
        if (!response.ok) throw new Error(`Error fetching course data: ${response.statusText}`);
        const data = await response.json();
        
        console.log("Fetched course data:", data); // Log the fetched data
        setPageItem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCourseDetails();
  }, [id]);

  // Handle loading, error, and null pageItem states
  if (loading) return <div>Loading course details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!pageItem) return <div>Course not found.</div>;

  // Calculate dynamic start and end dates
  const courseStartDate = calculateStartDate();
  const courseEndDate = calculateEndDate(courseStartDate, pageItem.duration);

  return (
    <>
      <Head>
{/*         <title>{pageItem.meta_title ? pageItem.meta_title : "Default Course Title"}</title> */}
        <meta name="description" content={pageItem.meta_description || "Default Description"} />
        <meta name="keywords" content={pageItem.meta_keywords || "default, keywords"} />
        <meta property="og:title" content={pageItem.meta_title || "Default OG Title"} />
        <meta property="og:description" content={pageItem.meta_description || "Default OG Description"} />
        <meta property="og:image" content={pageItem.course_image || "/default-course.jpg"} />
      </Head>
      <div>
        <h1>{pageItem.course_name || "Untitled Course"}</h1>
        <p>Duration: {pageItem.duration || "N/A"}</p>
        <p>Start Date: {format(courseStartDate, "do MMM")}</p>
        <p>End Date: {courseEndDate || "N/A"}</p>
      </div>
    </>
  );
}
