"use client";

import PageLinks from '@/components/common/PageLinks'
import Preloader from '@/components/common/Preloader'
import CourseDetailsOne from '@/components/courseSingle/CourseDetailsOne'
import CourseSlider from '@/components/courseSingle/CourseSlider'
import FooterFour from '@/components/layout/footers/FooterFour'
import HeaderFour from '@/components/layout/headers/HeaderFour'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'

export default function Page({ params }) {
  const [metadata, setMetadata] = useState({
    title: 'Loading...',
    description: 'Loading course description...',
  })

  // Fetch metadata from the backend when the component mounts
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const res = await fetch(`https://test.trainomart.com/api/courses/${params.id}/`)
        const data = await res.json()

        setMetadata({
          title: data.meta_title || 'Default Course Title',
          description: data.meta_description || 'Default Course Description',
        })
      } catch (error) {
        console.error('Error fetching metadata:', error)
      }
    }

    fetchMetadata()
  }, [params.id])

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
