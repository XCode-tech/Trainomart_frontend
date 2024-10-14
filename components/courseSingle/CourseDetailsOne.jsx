"use client";

import Star from "../common/Star";
import { coursesData } from "@/data/courses";
import React, { useState, useEffect } from "react";
import PinContent from "./PinContent";
import Overview from "./Overview";
import CourseContent from "./CourseContent";
// import Instractor from "./Instractor";
// import Reviews from "./Reviews";
import Head from "next/head";
import Image from "next/image";
import API_URL from "@/data/config";

const menuItems = [
  { id: 1, href: "#overview", text: "Overview", isActive: true },
  { id: 2, href: "#course-content", text: "Course Content", isActive: false },
  // { id: 3, href: "#instructors", text: "Instructors", isActive: false },
  // { id: 4, href: "#reviews", text: "Reviews", isActive: false },
];

export default function CourseDetailsOne({ id }) {
  const [pageItem, setPageItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/courses/${id}`);

        if (!response.ok) {
          throw new Error(`Error fetching course data: ${response.statusText}`);
        }

        const data = await response.json();
        setPageItem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourseDetails();
    }
  }, [id]);

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

  return (
    <>
      <Head>
        <title>{pageItem.course_name} | Your Course Platform</title>
        <meta
          name="description"
          content={pageItem.description || "Course description"}
        />
        <meta property="og:title" content={pageItem.course_name} />
        <meta
          property="og:description"
          content={pageItem.description || "Course description"}
        />
        <meta
          property="og:image"
          content={pageItem.course_image || "/default-course.jpg"}
        />
      </Head>

      <div id="js-pin-container" className="js-pin-container relative">
        {/* Page Header Section */}
        <section className="page-header -type-5 bg-light-6">
          <div className="page-header__bg">
            <div
              className="bg-image js-lazy"
              data-bg="img/event-single/bg.png"
            ></div>
          </div>

          <div className="container">
            <div className="page-header__content pt-90 pb-90">
              <div className="row y-gap-30">
                <div className="col-xl-7 col-lg-8">
                  <div className="d-flex x-gap-15 y-gap-10 pb-20">
                    <div>
                      <div className="badge px-15 py-8 text-11 bg-green-1 text-dark-1 fw-400">
                        BEST SELLER
                      </div>
                    </div>
                    <div>
                      <div className="badge px-15 py-8 text-11 bg-orange-1 text-white fw-400">
                        NEW
                      </div>
                    </div>
                    <div>
                      <div className="badge px-15 py-8 text-11 bg-purple-1 text-white fw-400">
                        POPULAR
                      </div>
                    </div>
                  </div>

                  <div>
                    <h1 className="text-30 lh-14 pr-60 lg:pr-0">
                      {pageItem.course_name || "Untitled Course"}
                    </h1>
                  </div>

                  {/* <p className="col-xl-9 mt-20">
                    {pageItem.description || "No description available."}
                  </p> */}

                  <div className="d-flex x-gap-30 y-gap-10 items-center flex-wrap pt-20">
                    {/* <div className="d-flex items-center">
                      <div className="text-14 lh-1 text-yellow-1 mr-10">
                        {pageItem.rating}
                      </div>
                      <div className="d-flex x-gap-5 items-center">
                        <Star star={pageItem.rating} textSize={"text-11"} />
                      </div>
                      <div className="text-14 lh-1 text-light-1 ml-10">
                        ({pageItem.ratingCount})
                      </div>
                    </div> */}

                    <div className="d-flex items-center text-light-1">
                      <div className="icon icon-wall-clock text-13"></div>
                      <div className="text-14 ml-8">
                        Duration..{pageItem.duration || 0} 
                      </div>
                    </div>

{/*                     <div className="d-flex items-center text-light-1">
                      <div className="icon icon-wall-clock text-13"></div>
                      <div className="text-14 ml-8">
                        Last updated{" "}
                        {new Date(pageItem.last_updated).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "long",
                          }
                        )}
                      </div>
                    </div>
                  </div> */}

                  {/* <div className="d-flex items-center pt-20">
                    <div className="relative w-30 h-30 rounded-full overflow-hidden">
                      <Image
                        src={pageItem.course_image || "/default-author.jpg"}
                        alt={`Profile image of ${pageItem.authorName || ""
                          }`}
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                    </div>
                    <div className="text-14 lh-1 ml-10">
                      {pageItem.authorName || "Instructor Name"}
                    </div>
                  </div> */}
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
                          className={`pb-12 page-nav-menu__link ${item.isActive ? "is-active" : ""
                            }`}
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
                  {/* <Instractor data={pageItem} /> */}
                  {/* <Reviews data={pageItem} /> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
