"use client";

import Star from "../common/Star";
import { useState, useEffect, useMemo } from "react";
import PinContent from "./PinContent";
import Overview from "./Overview";
import CourseContent from "./CourseContent";
import Head from "next/head";
import API_URL from "@/data/config";
import { format, addDays } from "date-fns";

const menuItems = [
  { id: 1, href: "#overview", text: "Overview" },
  { id: 2, href: "#course-content", text: "Course Content" },
];

export default function CourseDetailsOne({ id }) {
  const [pageItem, setPageItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeMenu, setActiveMenu] = useState(menuItems[0].id);

  const courseStartDate = useMemo(() => {
    const now = new Date();
    const nextMonth = now.getMonth() + 1 === 12 ? 0 : now.getMonth() + 1;
    const year = now.getMonth() + 1 === 12 ? now.getFullYear() + 1 : now.getFullYear();
    return new Date(year, nextMonth, 5);
  }, []);

  const courseEndDate = useMemo(() => {
    if (!pageItem?.duration) return null;
    return format(addDays(courseStartDate, parseInt(pageItem.duration, 10) - 1), "do MMM yyyy");
  }, [courseStartDate, pageItem?.duration]);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/courses/${id}`);
        if (!response.ok) throw new Error(`Error fetching course data: ${response.statusText}`);
        
        const data = await response.json();
        setPageItem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCourseDetails();
  }, [id]);

  if (loading) return <p>Loading course details...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!pageItem) return <p>Course not found.</p>;

  // Log the meta title and description to the console
  console.log("Meta Title From CourseDetailsOne.jsx:", pageItem.meta_title || `${pageItem.course_name} | Your Course Platform`);
  console.log("Meta Description From CourseDetailsOne.jsx:", pageItem.meta_description || pageItem.description);

  return (
    <>
      <Head>
        <title>{pageItem.meta_title || `${pageItem.course_name} | Your Course Platform`}</title>
        <meta name="description" content={pageItem.meta_description || pageItem.description} />
      </Head>

      <div id="js-pin-container" className="js-pin-container relative">
        <section className="page-header -type-5 bg-light-6">
          <div className="container">
            <div className="page-header__content pt-90 pb-90">
              <h1>{pageItem.course_name || "Untitled Course"}</h1>
              <p>Duration: {pageItem.duration || "N/A"}</p>
              <p>New Batch: Starts {format(courseStartDate, "do MMM")} to {courseEndDate || "N/A"}</p>
              <p>Mode of Training: Virtual</p>
            </div>
          </div>
        </section>
        <PinContent pageItem={pageItem} />

        <section className="layout-pt-md layout-pb-md">
          <div className="container">
            <div className="page-nav-menu -line">
              {menuItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveMenu(item.id)}
                  className={`pb-12 page-nav-menu__link ${activeMenu === item.id ? "is-active" : ""}`}
                >
                  {item.text}
                </a>
              ))}
            </div>
            <Overview data={pageItem} />
            <CourseContent data={pageItem} />
          </div>
        </section>
      </div>
    </>
  );
}
