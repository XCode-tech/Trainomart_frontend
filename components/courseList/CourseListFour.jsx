"use client";

import React, { useState, useEffect } from "react";
import Star from "../common/Star";
import Image from "next/image";
import Link from "next/link";
import PaginationTwo from "../common/PaginationTwo";
import { useRouter } from "next/router"; // For accessing URL query params
import API_URL from "@/data/config"; // Adjust this to your actual API URL

export default function CourseListFour() {
  const router = useRouter();
  const [courses, setCourses] = useState([]); // State to store fetched courses
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false); // Check if component is mounted on client

  // Wait until component is mounted on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && router.isReady && router.query.tags) {
      const { tags } = router.query; // Extract tags from the URL query

      const fetchCourses = async () => {
        try {
          setLoading(true);
          const response = await fetch(`${API_URL}/courses/?tags=${encodeURIComponent(tags)}`);
          const data = await response.json();
          setCourses(data); // Set courses based on the fetched data
        } catch (error) {
          console.error("Error fetching courses:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCourses();
    }
  }, [isClient, router.isReady, router.query]); // Fetch courses when client-side is mounted and router is ready

  // Pagination handling
  const pageCapacity = 12; // Number of courses to display per page
  const paginatedCourses = courses.slice(
    (pageNumber - 1) * pageCapacity,
    pageNumber * pageCapacity
  );

  if (!isClient) {
    return null; // Prevents server-side render from trying to access the router
  }

  return (
    <>
      <section>
        <div className="container">
          <div className="row y-gap-10">
            {/* Display a loading message while fetching courses */}
            {loading && <div>Loading courses...</div>}

            {/* Display the courses if there are any */}
            {!loading && courses.length > 0 ? (
              paginatedCourses.map((elm, index) => (
                <div key={index} className="col-4">
                  <div className="coursesCard">
                    <div className="h-100 pt-15">
                      <div className="d-flex items-center">
                        <div className="text-14 lh-1 text-yellow-1 mr-10">
                          {elm.rating}
                        </div>
                        <div className="d-flex x-gap-5 items-center">
                          <Star star={elm.rating} />
                        </div>
                        <div className="text-13 lh-1 ml-10">
                          ({elm.ratingCount})
                        </div>
                      </div>

                      <div className="text-17 lh-15 fw-500 text-dark-1 mt-10">
                        <Link
                          className="linkCustom"
                          href={`/courses/${elm.id}`}
                        >
                          {elm.title}
                        </Link>
                      </div>

                      <div className="d-flex x-gap-10 items-center pt-10">
                        <div className="d-flex items-center">
                          <div className="mr-8">
                            <Image
                              width={16}
                              height={17}
                              src="/assets/img/coursesCards/icons/1.svg"
                              alt="icon"
                            />
                          </div>
                          <div className="text-14 lh-1">
                            {elm.lessonCount} lesson
                          </div>
                        </div>

                        <div className="d-flex items-center">
                          <div className="mr-8">
                            <Image
                              width={16}
                              height={17}
                              src="/assets/img/coursesCards/icons/2.svg"
                              alt="icon"
                            />
                          </div>
                          <div className="text-14 lh-1">
                            {`${Math.floor(elm.duration / 60)}h ${Math.floor(
                              elm.duration % 60
                            )}m`}
                          </div>
                        </div>

                        <div className="d-flex items-center">
                          <div className="mr-8">
                            <Image
                              width={16}
                              height={17}
                              src="/assets/img/coursesCards/icons/3.svg"
                              alt="icon"
                            />
                          </div>
                          <div className="text-14 lh-1">{elm.level}</div>
                        </div>
                      </div>

                      <div className="coursesCard-footer">
                        <div className="coursesCard-footer__author">
                          <Image
                            width={30}
                            height={30}
                            src={elm.authorImageSrc}
                            alt="image"
                          />
                          <div>{elm.authorName}</div>
                        </div>

                        <div className="coursesCard-footer__price">
                          {elm.paid ? (
                            <>
                              <div>${elm.originalPrice}</div>
                              <div>${elm.discountedPrice}</div>
                            </>
                          ) : (
                            <>
                              <div></div>
                              <div>Free</div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // If no courses match, display a message
              <div>No courses found for the selected tags.</div>
            )}
          </div>

          {/* Pagination */}
          {courses.length > 0 && (
            <div className="row justify-center pt-90 lg:pt-50">
              <div className="col-auto">
                <PaginationTwo
                  pageNumber={pageNumber}
                  setPageNumber={setPageNumber}
                  data={courses}
                  pageCapacity={pageCapacity}
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
