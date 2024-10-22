import PageLinks from '@/components/common/PageLinks'
import Preloader from '@/components/common/Preloader'
import CourseDetailsOne from '@/components/courseSingle/CourseDetailsOne'
import CourseSlider from '@/components/courseSingle/CourseSlider'
import FooterFour from '@/components/layout/footers/FooterFour'
import HeaderFour from '@/components/layout/headers/HeaderFour'
import React from 'react'
import Head from 'next/head'

export default function Page({ metadata, params }) {
  return (
    <>
      <Head>
        <title>{metadata.meta_title}</title>
        <meta name="description" content={metadata.meta_description} />
        <meta property="og:title" content={metadata.meta_title} />
        <meta property="og:description" content={metadata.meta_description} />
        {/* Add other meta tags as needed */}
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
  )
}

// Fetch metadata from your backend based on the course ID
export async function getServerSideProps(context) {
  const { id } = context.params
  const res = await fetch(`https://test.trainomart.com/api/courses/${id}/`)
  const data = await res.json()

  // Assuming the response contains a title and description for SEO
  const metadata = {
    title: data.meta_title || 'Default Course Title',
    description: data.meta_description || 'Default description for the course',
  }

  return {
    props: {
      metadata,
      params: context.params,
    },
  }
}
