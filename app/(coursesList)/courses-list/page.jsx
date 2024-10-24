"use client";

import React, { Suspense } from 'react';
import PageLinks from '@/components/common/PageLinks';
import Preloader from '@/components/common/Preloader';
import FooterFour from '@/components/layout/footers/FooterFour';
import HeaderFour from '@/components/layout/headers/HeaderFour';

// Dynamically import the client-side search component
const ClientCourseList = React.lazy(() => import('@/components/courseList/ClientCourseList'));

export default function Page() {
  return (
    <div className="main-content">
      <Preloader />
      <HeaderFour />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />

        {/* Wrap client-only component inside Suspense */}
        <Suspense fallback={<div>Loading courses...</div>}>
          <ClientCourseList />
        </Suspense>

        <FooterFour />
      </div>
    </div>
  );
}
