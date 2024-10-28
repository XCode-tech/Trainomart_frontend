"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Pagination from "../common/Pagination";
import Link from "next/link";
import axios from "axios";
import API_URL from "@/data/config";

export default function BlogsThree() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const blogsPerPage = 4;

  // Fetch blogs from the API on component mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${API_URL}/blogs/`);
        setBlogs(response.data); // Assuming response.data is an array of blogs
        setTotalPages(Math.ceil(response.data.length / blogsPerPage));
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  // Calculate the current page's blogs
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <section className="page-header -type-1">
        <div className="container">
          <div className="page-header__content">
            <div className="row justify-center text-center">
              <div className="col-auto">
                <div>
                  <h1 className="page-header__title">Our Blogs</h1>
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
              <div key={elm.id} className="col-lg-10 col-md-11">
                <div className="blogCard -type-3">
                  <div className="row y-gap-30 items-center">
                    <div className="col-lg-6">
                      <div className="blogCard__image">
                        <Image
                          width={510}
                          height={392}
                          className="rounded-8"
                          src={elm.blog_image}
                          alt="image"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="blogCard__content pl-60 lg:pl-40 md:pl-0">
                        <div className="blogCard__category text-14 lh-1 text-purple-1 fw-500">
                          {elm.category}
                        </div>
                        <h4 className="blogCard__title text-24 lh-15 text-dark-4 fw-500 mt-15">
                          <Link className="linkCustom" href={`/blogs/${elm.id}`}>
                            {elm.blog_title}
                          </Link>
                        </h4>
                        <p className="blogCard__text mt-20">{elm.blog_data.split("\r\n")[0]}</p>
                        <div className="blogCard__button d-inline-block mt-20">
                          <Link
                            href={`/blogs/${elm.id}`}
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


        </div>
      </section>
    </>
  );
}
