"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function BlogDetails({ slug }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(`https://test.trainomart.com/api/blogs/slug/${slug}`);
        const blogData = await response.json();
        setData(blogData);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogData();
  }, [slug]);

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

      // Check if line starts with a numeric value followed by space and has a colon
      const numericStartPattern = /^\d+\s+(.+?):/;
      const match = line.match(numericStartPattern);
      if (match) {
        const headerText = match[1]; // Text between numeric start and colon
        const remainingText = line.slice(match[0].length); // Remaining text after colon

        return (
          <div key={index}>
            <h3 className="mt-40 mb-10">{headerText}</h3>
            <p>{remainingText}</p>
          </div>
        );
      }

      // Check if the line contains 'Introduction' and wrap it in <h4>
      if (line.includes("Introduction")) {
        return (
          <h3 key={index} className="fw-bold mt-20 mb-10">{line}</h3>
        );
      }

      // Check if the line contains ':'
      const colonIndex = line.indexOf(':');
      if (colonIndex !== -1) {
        const beforeColon = line.slice(0, colonIndex + 1); // Include ':' in the bold text
        const afterColon = line.slice(colonIndex + 1); // Text after ':'

        return (
          <p className="mt-30 mb-10 text-18" key={index}>
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
{/*           <div
            className="ratio ratio-16:9 rounded-8 bg-image js-lazy"
            style={{ backgroundImage: `url(${data.blog_image})` }}
            data-bg="img/blog/blog-single/images.png"
          ></div> */}
          <img
            src={data.blog_image || "img/blog/blog-single/images.png"}
            alt="Blog Image"
            className="ratio ratio-16:9 rounded-8 js-lazy"
          />
          <Image
            width={510}
            height={392}
            className="rounded-8"
            src={data.blog_image}
            alt="image"
          />

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
