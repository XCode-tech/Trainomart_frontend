"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import PageLinks from '@/components/common/PageLinks';
import Preloader from '@/components/common/Preloader';
import CourseListFour from '@/components/courseList/CourseListFour';
import FooterFour from '@/components/layout/footers/FooterFour';
import HeaderFour from '@/components/layout/headers/HeaderFour';

export default function Page() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  // Ensure the router is ready before trying to access the query
  useEffect(() => {
    if (router.isReady) {
      const searchQuery = router.query.searchTerm || ''; // If searchTerm is undefined, set it to an empty string
      setSearchTerm(searchQuery);
    }
  }, [router.isReady, router.query]);

  return (
    <div className="main-content">
      <Preloader />
      <HeaderFour />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />

        {/* Ensure searchTerm is passed even if it's an empty string */}
{/*         <CourseListFour/> */}

      <Suspense fallback={<div>Loading courses...</div>}>
        <CourseListFour tags={searchTerm} />
      </Suspense>

        <FooterFour />
      </div>
    </div>
  );
}
