"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";

export default function BlogDetails({ slug }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageItem, setPageItem] = useState(null)


  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(`https://test.trainomart.com/api/blogs/slug/${slug}`);
        const blogData = await response.json();
        setData(blogData);
        setPageItem(blogData)
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

    // Ensure the image URL is absolute
  const blogImageUrl = data.blog_image.startsWith("http")
    ? data.blog_image
    : `https://test.trainomart.com/${data.blog_image}`;


  return (
    <>
      <Head>
        <title>{pageItem.meta_title || pageItem.course_name || "Course Platform | Learn and Grow"}</title>
        <meta name="description" content={pageItem.meta_description || pageItem.description || "Learn the best courses to advance your career."} />
        <link rel="canonical" href={pageItem.Canonical_tag || 'https://www.trainomart.com'} key="canonical" />
        <meta name="keywords" content={pageItem.meta_keywords || "course, online learning, education, training"} />
        <meta property="og:title" content={pageItem.meta_title || pageItem.course_name || "Course Platform | Learn and Grow"} />
        <meta property="og:description" content={pageItem.meta_description || pageItem.description || "Learn the best courses to advance your career."} />
        <meta property="og:image" content={pageItem.course_image || "/default-course.jpg"} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageItem.meta_title || pageItem.course_name || "Course Platform | Learn and Grow"} />
        <meta name="twitter:description" content={pageItem.meta_description || pageItem.description || "Learn the best courses to advance your career."} />
        <meta name="twitter:image" content={pageItem.course_image || "/default-course.jpg"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
          <div>
            <Image
              width={510}
              height={392}
              className="ratio ratio-16:9 rounded-8 bg-image js-lazy"
              src={blogImageUrl}
              alt="Blog image"
            />
          </div>
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
