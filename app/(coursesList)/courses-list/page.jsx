// pages/search/[searchTerm].jsx
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
  const [searchTerm, setSearchTerm] = useState('');

  // Ensure the router is ready before trying to access the query
  useEffect(() => {
    if (router.isReady) {
      const { searchTerm } = router.query; // Get searchTerm from the router
      setSearchTerm(searchTerm || ''); // Set the search term or empty string if undefined
    }
  }, [router.isReady, router.query]);

  return (
    <div className="main-content">
      <Preloader />
      <HeaderFour />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />
        
        {/* Pass searchTerm as tags prop to CourseListFour */}
        <CourseListFour tags={searchTerm} />

        <FooterFour />
      </div>
    </div>
  );
}
