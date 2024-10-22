"use client";

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import PageLinks from '@/components/common/PageLinks';
import Preloader from '@/components/common/Preloader';
import CourseDetailsOne from '@/components/courseSingle/CourseDetailsOne';
import CourseSlider from '@/components/courseSingle/CourseSlider';
import FooterFour from '@/components/layout/footers/FooterFour';
import HeaderFour from '@/components/layout/headers/HeaderFour';

const DynamicPage = ({ params }) => {
  const [metadata, setMetadata] = useState({ title: '', description: '' });

  useEffect(() => {
    const fetchMetadata = async () => {
      const res = await fetch(`https://test.trainomart.com/api/courses/${params.id}`);
      const data = await res.json();
      setMetadata({ title: data.meta_title , description: data.meta_description  });
    };

    fetchMetadata();
  }, [params.id]);

  return (
    <>
      <Head>
        <title>{metadata.title || 'Loading...'}</title>
        <meta name="description" content={metadata.description || 'Loading description...'} />
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
