"use client";

import React, { useEffect, useState } from "react";
import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";
import CourseDetailsOne from "@/components/courseSingle/CourseDetailsOne";
import CourseSlider from "@/components/courseSingle/CourseSlider";
import FooterFour from "@/components/layout/footers/FooterFour";
import HeaderFour from "@/components/layout/headers/HeaderFour";
import Faq1 from "@/components/common/Faq1";

export default function CoursePageClient({ slug }) {
  const [pageItem, setPageItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`https://test.trainomart.com/api/courses/slug/${slug}/`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        setPageItem(data);
      } catch (error) {
        console.error("Error fetching course data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
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
