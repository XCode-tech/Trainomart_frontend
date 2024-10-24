"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';  // Correct hook for extracting search params
import PageLinks from '@/components/common/PageLinks';
import Preloader from '@/components/common/Preloader';
import CourseListFour from '@/components/courseList/CourseListFour';
import FooterFour from '@/components/layout/footers/FooterFour';
import HeaderFour from '@/components/layout/headers/HeaderFour';

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('');

  // Wrap in Suspense
  function SearchComponent() {
    const searchParams = useSearchParams();  // Use searchParams inside this component
    useEffect(() => {
      const searchQuery = searchParams.get('search') || '';  // Get 'search' query parameter from URL
      setSearchTerm(searchQuery);  // Update the state with the search query
    }, [searchParams]);

    console.log("searchTerm :", searchTerm)
    return null;  // No need to return anything, just set the searchTerm state
  }

  return (
    <div className="main-content">
      <Preloader />
      <HeaderFour />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />

        {/* Ensure searchTerm is passed to CourseListFour */}
        <Suspense fallback={<div>Loading search...</div>}>
          <SearchComponent />  {/* Suspense wrapping the search logic */}
        </Suspense>

        <Suspense fallback={<div>Loading courses...</div>}>
          <CourseListFour tags={searchTerm} />  {/* Pass searchTerm to CourseListFour */}
        </Suspense>

        <FooterFour />
      </div>
    </div>
  );
}
