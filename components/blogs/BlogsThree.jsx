"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Head from "next/head";

export default function BlogsThree() {
  const [blogs, setBlogs] = useState([]); // Store all blogs
  const [currentPage, setCurrentPage] = useState(1); // Current active page
  const blogsPerPage = 4; // Blogs to show per page

  // Fetch blogs from the API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("https://test.trainomart.com/api/blogs/");
        const fetchedBlogs = response.data;

        // Sort blogs based on the 'created_at' field (assuming it exists)
        const sortedBlogs = fetchedBlogs.sort((a, b) => 
          new Date(b.created_at) - new Date(a.created_at)
        );

        setBlogs(sortedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  // Calculate total pages based on blogs length
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  // Calculate blogs for the current page
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Handle page change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Head>
        <title>Course Platform | Learn and Grow</title>
        <meta name="description" content={"Discover Trainomart’s mission to provide top-tier online training & certification courses. Learn from industry experts & boost your career with us!"} />
{/*         <meta name="keywords" content={pageItem.meta_keywords || "course, online learning, education, training"} />
        <meta property="og:title" content={pageItem.meta_title || pageItem.course_name || "Course Platform | Learn and Grow"} />
        <meta property="og:description" content={pageItem.meta_description || pageItem.description || "Learn the best courses to advance your career."} />
        <meta property="og:image" content={pageItem.course_image || "/default-course.jpg"} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageItem.meta_title || pageItem.course_name || "Course Platform | Learn and Grow"} />
        <meta name="twitter:description" content={pageItem.meta_description || pageItem.description || "Learn the best courses to advance your career."} />
        <meta name="twitter:image" content={pageItem.course_image || "/default-course.jpg"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <section className="page-header -type-1">
        <div className="container">
          <div className="page-header__content">
            <div className="row justify-center text-center">
              <div className="col-auto">
                <div>
                  <h1 className="page-header__title">Latest News</h1>
                </div>
                <div>
                  <p className="page-header__text">
                    We’re on a mission to deliver engaging, curated courses at a
                    reasonable price.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-30 justify-center">
            {currentBlogs.map((elm) => (
              <div key={elm.slug} className="col-lg-10 col-md-11">
                <div className="blogCard -type-3">
                  <div className="row y-gap-30 items-center">
                    <div className="col-lg-6">
                      <div className="blogCard__image">
                        <Image
                          width={510}
                          height={392}
                          className="rounded-8"
                          src={elm.blog_image}
                          alt={elm.blog_title || "image"}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="blogCard__content pl-60 lg:pl-40 md:pl-0">
                        <div className="blogCard__category text-14 lh-1 text-purple-1 fw-500">
{/*                           {elm.category} */}
                        </div>
                        <h4 className="blogCard__title text-24 lh-15 text-dark-4 fw-500 mt-15">
                          <Link className="linkCustom" href={`/blogs/${elm.slug}`}>
                            {elm.blog_title}
                          </Link>
                        </h4>
                        <p className="blogCard__text mt-20">
                          {elm.blog_data.split("\r\n")[0]}
                        </p>
                        <div className="blogCard__button d-inline-block mt-20">
                          <Link
                            href={`/blogs/${elm.slug}`}
                            className="button -sm -purple-3 text-purple-1"
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* MUI Pagination */}
          <div className="row justify-center pt-60 lg:pt-40">
            <div className="col-auto">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
