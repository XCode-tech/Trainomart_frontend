"use client";

import React, { Suspense, useState } from 'react';
import PageLinks from '@/components/common/PageLinks';
import Preloader from '@/components/common/Preloader';
import CourseListFour from '@/components/courseList/CourseListFour';
import FooterFour from '@/components/layout/footers/FooterFour';
import HeaderFour from '@/components/layout/headers/HeaderFour';

// Define a client-side only component for search params
function ClientSideSearch() {
  const [searchTerm, setSearchTerm] = useState('');

  const SearchComponent = React.lazy(() => import('@/components/courseList/SearchComponent')); // Lazy load the component

  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchComponent setSearchTerm={setSearchTerm} /> {/* Pass the setter */}
      <CourseListFour tags={searchTerm} /> {/* Pass searchTerm */}
    </Suspense>
  );
}

export default function Page() {
  return (
    <div className="main-content">
      <Preloader />
      <HeaderFour />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />

        {/* Render client-side search logic and course list in a Suspense boundary */}
        <ClientSideSearch />

        <FooterFour />
      </div>
    </div>
  );
}
