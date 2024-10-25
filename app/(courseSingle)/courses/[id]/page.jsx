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
  const [pageItem, setPageItem] = useState(null);
  const [metadata, setMetadata] = useState({ title: 'Loading...', description: 'Loading course description...' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`https://test.trainomart.com/api/courses/${params.id}/`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        
        const data = await res.json();
        setMetadata({
          title: data.meta_title || 'Default Course Title',
          description: data.meta_description || 'Default Course Description',
        });
      } catch (error) {
        console.error('Error fetching metadata:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetadata();
  }, [params.id]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;


  // Log the meta title and description to the console
  console.log("Meta Title From page.jsx:", pageItem.meta_title || `${pageItem.meta_title} | Your Course Platform`);
  console.log("Meta Description From page.jsx:", pageItem.meta_description || pageItem.meta_description);

  return (
    <>
      <Head>
        <title>{metadata.meta_title}</title>
        <meta name="description" content={metadata.meta_description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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
