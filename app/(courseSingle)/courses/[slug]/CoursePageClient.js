"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head"; 
import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";
import CourseDetailsOne from "@/components/courseSingle/CourseDetailsOne";
import CourseSlider from "@/components/courseSingle/CourseSlider";
import FooterFour from "@/components/layout/footers/FooterFour";
import HeaderFour from "@/components/layout/headers/HeaderFour";
import Faq1 from "@/components/common/Faq1";

export default function CoursePageClient({ slug }) {
  const [pageItem, setPageItem] = useState(null);
  const [metadata, setMetadata] = useState({
    title: "Loading...",
    description: "Loading course description...",
    canonical: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`https://test.trainomart.com/api/courses/slug/${slug}/`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  
        const data = await res.json();
        console.log("Fetched Metadata:", data); // ✅ Debug API Response
  
        setMetadata({
          title: data.meta_title || "Default Course Title",
          description: data.meta_description || "Default Course Description",
          canonical: data.canonical_tag || "Course", // ✅ Check if this field exists
        });
  
        setPageItem(data);
      } catch (error) {
        console.error("Error fetching metadata:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchMetadata();
  }, [slug]);


  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      {/* ✅ Move SEO metadata inside `next/head` */}
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {metadata.canonical && <link rel="canonical" href={metadata.canonical} />}
      </Head>

      <Preloader />
      <div className="main-content">
        <HeaderFour />
        <div className="content-wrapper js-content-wrapper">
          <PageLinks />
          <CourseDetailsOne slug={slug} pageItem={pageItem} />
          <CourseSlider />
          <Faq1 slug={slug} pageItem={pageItem} />
          <FooterFour />
        </div>
      </div>
    </>
  );
}
