"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PageLinks from '@/components/common/PageLinks';
import Preloader from '@/components/common/Preloader';
import CourseListFour from '@/components/courseList/CourseListFour';
import FooterFour from '@/components/layout/footers/FooterFour';
import HeaderFour from '@/components/layout/headers/HeaderFour';

function CoursesContent() {
  const searchParams = useSearchParams();
  const [searchTerm, setsearchTerm] = useState('');

  useEffect(() => {
    const searchQuery = searchParams?.get('searchTerm'); 

    if (searchQuery) {
      setsearchTerm(searchQuery);
    }
  }, [searchParams]);

  console.log("Current searchTerm:", searchTerm); // Log after updating state if it exists

  return (
    <div className="content-wrapper js-content-wrapper overflow-hidden">
      <PageLinks />
      <CourseListFour tags={searchTerm} />
      <FooterFour />
    </div>
  );
}

export default function Page() {
  return (
    <div className="main-content">
      <Preloader />
      <HeaderFour />
      <Suspense fallback={<div>Loading...</div>}>
        <CoursesContent />
      </Suspense>
    </div>
  );
}
