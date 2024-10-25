"use client";

import Star from "../common/Star";
import { coursesData } from "@/data/courses";
import React, { useState, useEffect } from "react";
import PinContent from "./PinContent";
import Overview from "./Overview";
import CourseContent from "./CourseContent";
import Head from "next/head";
import API_URL from "@/data/config";
import { format, addDays } from "date-fns";

const menuItems = [
  { id: 1, href: "#overview", text: "Overview", isActive: true },
  { id: 2, href: "#course-content", text: "Course Content", isActive: false },
];

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
    const endDate = addDays(startDate, durationDays - 1);
    return format(endDate, "do MMM yyyy");
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
  if (loading) return <div className="flex justify-center items-center h-screen"><p className="text-xl">Loading course details...</p></div>;
  if (error) return <div className="flex justify-center items-center h-screen"><p className="text-xl text-red-500">Error: {error}</p></div>;
  if (!pageItem) return <div className="flex justify-center items-center h-screen"><p className="text-xl">Course not found.</p></div>;

  // Calculate dynamic start and end dates
  const courseStartDate = calculateStartDate();
  const courseEndDate = calculateEndDate(courseStartDate, pageItem.duration);

  return (
    <>
      <Head>
        <title>{pageItem.meta_title ? pageItem.meta_title : `${pageItem.course_name || "Course"} | Your Course Platform`}</title>
        <meta name="description" content={pageItem.meta_description || pageItem.description || "Course description"} />
        <meta name="keywords" content={pageItem.meta_keywords || "course, online learning"} />
        <meta property="og:title" content={pageItem.meta_title || pageItem.course_name || "Course"} />
        <meta property="og:description" content={pageItem.meta_description || pageItem.description || "Course description"} />
        <meta property="og:image" content={pageItem.course_image || "/default-course.jpg"} />
      </Head>

      <div id="js-pin-container" className="js-pin-container relative">
        <section className="page-header -type-5 bg-light-6">
          <div className="container">
            <div className="page-header__content pt-90 pb-90">
              <div className="row y-gap-30">
                <div className="col-xl-7 col-lg-8">
                  <h1 className="text-30 lh-14 pr-60 lg:pr-0">{pageItem.course_name || "Untitled Course"}</h1>
                  <div className="d-flex x-gap-30 y-gap-10 items-center flex-wrap pt-20">
                    <div className="d-flex items-center text-light-1">
                      <div className="icon icon-wall-clock text-13"></div>
                      <div className="text-14 ml-8"><b>Duration: {pageItem.duration || "N/A"}</b></div>
                    </div>
                    <div className="d-flex items-center text-light-1">
                      <div className="icon icon-wall-clock text-13"></div>
                      <div className="text-14 ml-8"><b>New Batch: Starts From {format(courseStartDate, "do MMM")} to {courseEndDate || "N/A"} (9AM-5PM EST)</b></div>
                    </div>
                    <div className="d-flex items-center text-light-1">
                      <div className="icon icon-person-3 text-13"></div>
                      <div className="text-14 ml-8"><b>Mode Of Training: Virtual</b></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <PinContent pageItem={pageItem} />
        <section className="layout-pt-md layout-pb-md">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="page-nav-menu -line">
                  <div className="d-flex x-gap-30">
                    {menuItems.map(item => (
                      <a key={item.id} href={item.href} className={`pb-12 page-nav-menu__link ${item.isActive ? "is-active" : ""}`}>
                        {item.text}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="pt-60">
                  <Overview data={pageItem} />
                  <CourseContent data={pageItem} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
