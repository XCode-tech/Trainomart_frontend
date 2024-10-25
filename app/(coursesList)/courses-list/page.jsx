"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Correctly import useRouter
import PageLinks from '@/components/common/PageLinks';
import Preloader from '@/components/common/Preloader';
import CourseListFour from '@/components/courseList/CourseListFour';
import FooterFour from '@/components/layout/footers/FooterFour';
import HeaderFour from '@/components/layout/headers/HeaderFour';

export default function Page() {
  const router = useRouter();
  const { searchTerm } = router.query; // Destructure searchTerm directly from router.query
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    // Ensure the router is ready before trying to access the query
    if (searchTerm) {
      setSearchValue(searchTerm); // Set the search value only if searchTerm exists
    }
  }, [searchTerm]);

  console.log("searchTerm", searchTerm )
  return (
    <div className="main-content">
      <Preloader />
      <HeaderFour />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />

        {/* Ensure searchValue is passed even if it's an empty string */}
        <CourseListFour tags={searchValue} />

        <FooterFour />
      </div>
    </div>
  );
}
