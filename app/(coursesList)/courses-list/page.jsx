"use client";

import React, { Suspense } from 'react';
import PageLinks from '@/components/common/PageLinks';
import Preloader from '@/components/common/Preloader';
import FooterFour from '@/components/layout/footers/FooterFour';
import HeaderFour from '@/components/layout/headers/HeaderFour';

// Dynamically load CourseListFour with Suspense to avoid static pre-rendering issues
const ClientCourseList = React.lazy(() => import('@/components/courseList/ClientCourseList'));

export default function Page() {
  return (
    <div className="main-content">
      <Preloader />
      <HeaderFour />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />

        {/* Wrap the client-only component inside a Suspense boundary */}
        <Suspense fallback={<div>Loading courses...</div>}>
          <ClientCourseList />
        </Suspense>

        <FooterFour />
      </div>
    </div>
  );
}
