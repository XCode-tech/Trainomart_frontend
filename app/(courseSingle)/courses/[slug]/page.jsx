"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head"; // Import for SEO
import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";
import CourseDetailsOne from "@/components/courseSingle/CourseDetailsOne";
import CourseSlider from "@/components/courseSingle/CourseSlider";
import FooterFour from "@/components/layout/footers/FooterFour";
import HeaderFour from "@/components/layout/headers/HeaderFour";
import Faq1 from "@/components/common/Faq1";

export default function Page({ params }) {
  const [pageItem, setPageItem] = useState(null);
  const [metadata, setMetadata] = useState({
    title: 'Loading...',
    description: 'Loading course description...',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`https://test.trainomart.com/api/courses/slug/${params.slug}/`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        setMetadata({
          title: data.meta_title || "Default Course Title",
          description: data.meta_description || "Default Course Description",
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
  }, [params.slug]);

  // Update the document head after the metadata is fetched
  useEffect(() => {
    if (!isLoading && !error) {
      document.title = metadata.title;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', metadata.description);
      }
    }
  }, [metadata, isLoading, error]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <Preloader />
      <div className="main-content">
        <HeaderFour />
        <div className="content-wrapper js-content-wrapper">
          <PageLinks />
          <CourseDetailsOne slug={params.slug} pageItem={pageItem} />
          <CourseSlider />
          <Faq1 slug={params.slug} pageItem={pageItem} />
          <FooterFour />
        </div>
      </div>
    </>
  );
}
