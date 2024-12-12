"use client";

import Star from "../common/Star";
import { coursesData } from "@/data/courses";
import React, { useState, useEffect } from "react";
import PinContent from "./PinContent";
import Overview from "./Overview";
import CourseContent from "./CourseContent";
import Head from "next/head";
import API_URL from "@/data/config";
import { format, addDays, startOfMonth } from "date-fns"; // Import date-fns for date manipulation
import { faq } from "@/data/faq";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const menuItems = [
  { id: 1, href: "#overview", text: "Overview", isActive: true },
  { id: 2, href: "#course-content", text: "Course Content", isActive: false },
];

export default function CourseDetailsOne({ slug }) {
  const [pageItem, setPageItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFaq, setActiveFaq] = useState(0);

  // Function to calculate the start date as the 5th of the next month
  const calculateStartDate = () => {
    const now = new Date();
    const nextMonth = now.getMonth() + 1 === 12 ? 0 : now.getMonth() + 1; // Get next month
    const year = now.getMonth() + 1 === 12 ? now.getFullYear() + 1 : now.getFullYear();
    return new Date(year, nextMonth, 5); // 5th of the next month
  };

  // Function to calculate the end date based on the duration
  const calculateEndDate = (startDate, duration) => {
    if (!duration || !startDate) return null; // Handle missing values

    const durationDays = parseInt(duration, 10); // Parse duration into an integer (assuming it's in days)

    if (isNaN(durationDays)) {
      return null; // If duration is invalid, return null
    }

    const endDate = addDays(startDate, durationDays - 1); // Subtract 1 to get the correct end date
    return format(endDate, "do MMM yyyy"); // Format the end date
  };

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(${API_URL}/courses/slug/${slug});

        if (!response.ok) {
          throw new Error(Error fetching course data: ${response.statusText});
        }

        const data = await response.json();
        setPageItem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCourseDetails();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading course details...</p>
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

  if (!pageItem) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Course not found.</p>
      </div>
    );
  }

  // Get the dynamically calculated start date
  const courseStartDate = calculateStartDate(); // Start date is 5th of next month
  const courseEndDate = calculateEndDate(courseStartDate, pageItem.duration); // Calculate dynamic end date

  return (
    <>
      <Head>
        <title>{pageItem.meta_title || pageItem.course_name} | Your Course Platform</title>
        <meta name="description" content={pageItem.meta_description || pageItem.description} />
        <meta name="keywords" content={pageItem.meta_keywords || "course, online learning"} />
        <meta property="og:title" content={pageItem.meta_title || pageItem.course_name} />
        <meta property="og:description" content={pageItem.meta_description || pageItem.description} />
        <meta property="og:image" content={pageItem.course_image || "/default-course.jpg"} />
      </Head>

      <div id="js-pin-container" className="js-pin-container relative">
        <section className="page-header -type-5 bg-light-6">
          <div className="container">
            <div className="page-header__content pt-90 pb-90">
              <div className="row y-gap-30">
                <div className="col-xl-7 col-lg-8">
                  <div>
                    <h1 className="text-30 lh-14 pr-60 lg:pr-0">
                      {pageItem.course_name || "Untitled Course"}
                    </h1>
                  </div>

                  <div className="d-flex x-gap-30 y-gap-10 items-center flex-wrap pt-20">
                    <div className="d-flex items-center text-light-1">
                      <div className="icon icon-wall-clock text-13"></div>
                      <div className="text-14 ml-8">
                        <b>Duration: {pageItem.duration || "N/A"}</b> <br />
                      </div>
                    </div>

                    <div className="d-flex items-center text-light-1">
                      <div className="icon icon-wall-clock text-13"></div>
                      <div className="text-14 ml-8">
{/*                         <b>
                          New Batch: Starts From {format(courseStartDate, "do MMM")} to {courseEndDate || "N/A"} (9AM-5PM EST)
                        </b>{" "} */}

                        <b>
                          New Batch: Starts From{" "}
                          <span className="blinkingText">
                            {format(courseStartDate, "do MMM")} to {courseEndDate || "N/A"} (9AM-5PM EST)
                          </span>
                        </b>
                        <br />
                      </div>
                    </div>

                    <div className="d-flex items-center text-light-1">
                      <div className="icon icon-person-3 text-13"></div>
                      <div className="text-14 ml-8">
                        <b>Mode Of Training: Virtual</b> <br />
                      </div>
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
                    {menuItems.map((item) => (
                      <div key={item.id}>
                        <a
                          href={item.href}
                          className={pb-12 page-nav-menu__link ${item.isActive ? "is-active" : ""}}
                        >
                          {item.text}
                        </a>
                      </div>
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
        <section className="layout-pt-lg layout-pb-lg bg-light-4">
          <div className="container">
            <div className="row justify-center text-center">
              <div className="col-xl-8 col-lg-9 col-md-11">
                <div className="sectionTitle ">
                  <h2 className="sectionTitle__title ">
                    Frequently Asked Questions.
                  </h2>
    
                  {/* <p className="sectionTitle__text ">
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  </p> */}
                </div>
    
                <div className="accordion -block text-left pt-60 lg:pt-40 js-accordion">
                  {faq.map((elm, i) => (
                    <div
                      onClick={() =>
                        setActiveFaq((pre) => (pre == elm.id ? 0 : elm.id))
                      }
                      key={i}
                      className={accordion__item  ${
                        activeFaq == elm.id ? "is-active" : ""
                      }}
                    >
                      <div className="accordion__button">
                        <div className="accordion__icon">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            className="icon"
                            data-feather="plus"
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            className="icon"
                            data-feather="minus"
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </div>
                        </div>
                        <span className="text-17 fw-500 text-dark-1">
                          {pageItem.faq}
                        </span>
                      </div>
    
                      <div
                        style={activeFaq == elm.id ? { maxHeight: "139px" } : {}}
                        className="accordion__content"
                      >
                        <div className="accordion__content__inner">
                          <p>{elm.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
