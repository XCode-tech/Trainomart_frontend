"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import API_URL from "@/data/config";

export default function BlogDetails({ id }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(`${API_URL}/blogs/${id}`);
        const blogData = await response.json();
        setData(blogData);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogData();
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>Blog not found</p>;
  }

  // Function to format blog content
  const formatBlogContent = (text) => {
    // Split by \r\n
    return text.split(/\r?\n/).map((line, index) => {
      // Check if the line is empty, return a <br /> tag for spacing
      if (line.trim() === "") {
        return <br key={index} />;
      }

      // Check if the line contains 'Introduction' and wrap it in <h4>
      if (line.includes("Introduction")) {
        return (
          <h4 key={index} className="fw-bold">{line}</h4>
        );
      }

      // Check if the line contains ':'
      const colonIndex = line.indexOf(':');
      if (colonIndex !== -1) {
        const beforeColon = line.slice(0, colonIndex + 1); // Include ':' in the bold text
        const afterColon = line.slice(colonIndex + 1); // Text after ':'

        return (
          <p key={index}>
            <strong>{beforeColon}</strong>{afterColon}
          </p>
        );
      }

      // Return line as a normal paragraph if no special formatting needed
      return <p key={index}>{line}</p>;
    });
  };

  return (
    <>
      <section className="page-header -type-1">
        <div className="container">
          <div className="page-header__content">
            <div className="row justify-center text-center">
              <div className="col-auto">
                <div>
                  <div className="text-14 text-purple-1 uppercase fw-500 mb-8">
                    {data.category.toUpperCase()}
                  </div>

                  <h1 className="page-header__title lh-14">
                    {data.blog_title}
                  </h1>

                  <p className="page-header__text">{data.date}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-md">
        <div className="container">
          <div
            className="ratio ratio-16:9 rounded-8 bg-image js-lazy"
            style={{ backgroundImage: `url(${data.blog_image})` }}
            data-bg="img/blog/blog-single/images.png"
          ></div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="blogSection">
            <div className="blogCard">
              <div className="row justify-center">
                <div className="col-xl-8 col-lg-9 col-md-11">
                  <div className="blogCard__content">
                    <h4 className="text-24 text-center fw-500">{data.blog_title}</h4>
                    <div className="mt-30">{formatBlogContent(data.blog_data)}</div>

                    {/* Render additional sections like images, author info, etc., here */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
