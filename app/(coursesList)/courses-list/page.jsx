"use client";

import React, { Suspense } from 'react';
import PageLinks from '@/components/common/PageLinks';
import Preloader from '@/components/common/Preloader';
import FooterFour from '@/components/layout/footers/FooterFour';
import HeaderFour from '@/components/layout/headers/HeaderFour';

// Lazy load the client-side only component
const ClientOnlyCourseList = React.lazy(() => import('@/components/courseList/ClientOnlyCourseList'));

export default function Page() {
  return (
    <div className="main-content">
      <Preloader />
      <HeaderFour />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />

        {/* Wrap the dynamically loaded component in Suspense */}
        <Suspense fallback={<div>Loading courses...</div>}>
          <ClientOnlyCourseList />
        </Suspense>

        <FooterFour />
      </div>
    </div>
  );
}
