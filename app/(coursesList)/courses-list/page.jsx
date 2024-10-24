"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';  // Import useRouter to read query params
import PageLinks from '@/components/common/PageLinks';
import Preloader from '@/components/common/Preloader';
import CourseListFour from '@/components/courseList/CourseListFour';
import FooterFour from '@/components/layout/footers/FooterFour';
import HeaderFour from '@/components/layout/headers/HeaderFour';

export default function Page() {
  const router = useRouter();
  const { searchTerm } = router.query;  // Read the search term from query params

  return (
    <div className="main-content">
      <Preloader />
      <HeaderFour />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />
        
        {/* Pass searchTerm as a prop to CourseListFour */}
        <CourseListFour tags={searchTerm} />  

        <FooterFour />
      </div>
    </div>
  );
}
