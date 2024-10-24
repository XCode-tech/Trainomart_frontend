"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation'; // Correct hook for extracting search params
import PageLinks from '@/components/common/PageLinks';
import Preloader from '@/components/common/Preloader';
import CourseListFour from '@/components/courseList/CourseListFour';
import FooterFour from '@/components/layout/footers/FooterFour';
import HeaderFour from '@/components/layout/headers/HeaderFour';

export default function Page() {
  const searchParams = useSearchParams();  // Using useSearchParams to get the query parameter
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const searchQuery = searchParams.get('search') || '';  // Get 'search' query parameter from URL
    setSearchTerm(searchQuery);  // Update the state with the search query
  }, [searchParams]);

  return (
    <div className="main-content">
      <Preloader />
      <HeaderFour />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />

        {/* Ensure searchTerm is passed to CourseListFour */}
        <Suspense fallback={<div>Loading courses...</div>}>
          <CourseListFour tags={searchTerm} />
        </Suspense>

        <FooterFour />
      </div>
    </div>
  );
}
