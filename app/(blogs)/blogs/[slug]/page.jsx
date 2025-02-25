"use client";

import RelatedBlogs from '@/components/blogs/RelatedBlogs'
import PageLinks from '@/components/common/PageLinks'



import FooterOne from '@/components/layout/footers/FooterOne'
import Header from '@/components/layout/headers/Header'
import React, { useEffect, useState } from 'react'
import HeaderFour from '@/components/layout/headers/HeaderFour'
import BlogDetails from '@/components/blogs/BlogDetails'
import Preloader from '@/components/common/Preloader'
import FooterFour from '@/components/layout/footers/FooterFour'


export default function page({ params }) {
  const [pageItem, setPageItem] = useState(null);
  const [metadata, setMetadata] = useState({
    title: 'Loading...',
    description: 'Loading course description...',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`https://test.trainomart.com/api/blogs/slug/${params.slug}/`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        setMetadata({
          title: data.meta_title || "Default Course Title",
          description: data.meta_description || "About",
        });
        setPageItem(data);
      } catch (error) {
        console.error("Error fetching metadata:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetadata();
  }, [params.slug]);

  // Update the document head after the metadata is fetched
  useEffect(() => {
    if (!isLoading && !error) {
      document.title = metadata.title;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', metadata.description);
      }
    }
  }, [metadata, isLoading, error]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="main-content  ">
      <Preloader />

      <HeaderFour />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />

        <BlogDetails slug={params.slug} pageItem={pageItem} />

        {/* <RelatedBlogs/> */}

        <FooterFour />
      </div>

    </div>
  )
}
