import About from '@/components/about/About';

import Brands from '@/components/common/Brands';
import Instructors from '@/components/common/Instructors';
import ManagingDirector from '@/components/common/ManagingDirector';
import PageLinks from '@/components/common/PageLinks';
import Preloader from '@/components/common/Preloader';
import TestimonialsThree from '@/components/common/TestimonialsThree';
import WeOffer from '@/components/homes/WeOffer';
import FooterFour from '@/components/layout/footers/FooterFour';
import HeaderFour from '@/components/layout/headers/HeaderFour';
import React from 'react';
import Head from 'next/head';

export const metadata = {
  title: 'About Trainomart - Empowering Careers with Expert Training',
  description:
    'Discover Trainomart’s mission to provide top-tier online training & certification courses. Learn from industry experts & boost your career with us!',
  canonical: 'https://www.trainomart.com/about'
};

export default function Page() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="canonical" href={metadata.canonical} />
      </Head>
      
      <div className="main-content">
        <Preloader />
        <HeaderFour />
        <div className="content-wrapper js-content-wrapper overflow-hidden">
          <PageLinks />
          <About />
          <div id="we-offer-section">
            <WeOffer />
          </div>
          <TestimonialsThree />
          <ManagingDirector />
          <Brands />
          <FooterFour />
        </div>
      </div>
    </>
  );
}

