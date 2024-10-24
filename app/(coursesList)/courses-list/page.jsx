"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';  // Import useRouter
import PageLinks from '@/components/common/PageLinks';
import Preloader from '@/components/common/Preloader';
import CourseListFour from '@/components/courseList/CourseListFour';
import FooterFour from '@/components/layout/footers/FooterFour';
import HeaderFour from '@/components/layout/headers/HeaderFour';

export default function Page() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');  // Initialize searchTerm state

  // Use useEffect to wait for the router to be ready before accessing the query params
  useEffect(() => {
    if (router.isReady) {
      // Set searchTerm from query if it's available
      setSearchTerm(router.query.searchTerm || '');
    }
  }, [router.isReady, router.query.searchTerm]);

  return (
    <div className="main-content">
      <Preloader />
      <HeaderFour />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />
        
        {/* Pass searchTerm as a prop to CourseListFour only after it's set */}
        <CourseListFour tags={searchTerm} />  

        <FooterFour />
      </div>
    </div>
  );
}
