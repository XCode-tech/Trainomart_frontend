"use client";

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import PageLinks from '@/components/common/PageLinks';
import Preloader from '@/components/common/Preloader';
import CourseDetailsOne from '@/components/courseSingle/CourseDetailsOne';
import CourseSlider from '@/components/courseSingle/CourseSlider';
import FooterFour from '@/components/layout/footers/FooterFour';
import HeaderFour from '@/components/layout/headers/HeaderFour';

export default function Page({ params }) {
  // Metadata state
  const [metadata, setMetadata] = useState({
    title: 'Loading...',
    description: 'Loading course description...',
  });

  // Fetch metadata from backend
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const res = await fetch(`https://test.trainomart.com/api/courses/${params.id}/`);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        // Set the fetched metadata
        const newMetadata = {
          title: data.meta_title || 'Default Course Title',
          description: data.meta_description || 'Default Course Description',
        };

        console.log('Setting Metadata:', newMetadata);
        setMetadata(newMetadata);
      } catch (error) {
        console.error('Error fetching metadata:', error);
      }
    };

    fetchMetadata();
  }, [params.id]);

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://test.trainomart.com/api/courses/${params.id}/`} />
      </Head>

      <Preloader />
      <div className="main-content">
        <HeaderFour />
        <div className="content-wrapper js-content-wrapper">
          <PageLinks />
          <CourseDetailsOne id={params.id} />
          <CourseSlider />
          <FooterFour />
        </div>
      </div>
    </>
  );
}
