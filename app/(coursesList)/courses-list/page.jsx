"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PageLinks from '@/components/common/PageLinks';
import Preloader from '@/components/common/Preloader';
import CourseListFour from '@/components/courseList/CourseListFour';
import FooterFour from '@/components/layout/footers/FooterFour';
import HeaderFour from '@/components/layout/headers/HeaderFour';

export default function Page() {
  const searchParams = useSearchParams();
  const [searchTerm, setsearchTerm] = useState('');

  useEffect(() => {
    // Retrieve search term from URL query parameters
    const searchQuery = searchParams.get('searchTerm'); 

    if (searchQuery && searchQuery.length > 0) {
      setsearchTerm(searchQuery);
    } else {
      console.log("No search term found in query.");
    }
  }, [searchParams]);

  console.log("searchTerm on page.jsx:", searchTerm); // Log the search term

  return (
    <div className="main-content">
      <Preloader />
      <HeaderFour />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />
        {/* Ensure search is passed even if it's an empty string */}
        <CourseListFour tags={searchTerm} />
        <FooterFour />
      </div>
    </div>
  );
}
