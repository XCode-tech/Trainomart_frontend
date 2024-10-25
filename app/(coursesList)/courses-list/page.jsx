"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PageLinks from '@/components/common/PageLinks';
import Preloader from '@/components/common/Preloader';
import CourseListFour from '@/components/courseList/CourseListFour';
import FooterFour from '@/components/layout/footers/FooterFour';
import HeaderFour from '@/components/layout/headers/HeaderFour';

export default function Page() {
  const router = useRouter();
  const [searchTerm, setsearchTerm] = useState('');
  console.log("Router is ready:", router.searchTerm); // Log the query to check its structure

  useEffect(() => {
    // Check if router is ready
    if (router.isReady) {
      console.log("Router is ready:", router.searchTerm); // Log the query to check its structure
      const searchQuery = router.query.searchTerm; // Access the search query parameter

      // Check if searchQuery is defined and is a string
      if (typeof searchQuery === 'string' && searchQuery.length > 0) {
        setsearch(searchQuery);
      } else {
        console.log("No search term found in query.");
      }
    }
  }, [router.isReady, router.query]);

  console.log("search:", search); // Log the search term
  

  return (
    <div className="main-content">
      <Preloader />
      <HeaderFour />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />
        {/* Ensure search is passed even if it's an empty string */}
        <CourseListFour tags={search} />
        <FooterFour />
      </div>
    </div>
  );
}
