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
import RootLayout from '@/app/layout'

export default function Page({ params }) {
  const [pageItem, setPageItem] = useState(null);
  const [metadata, setMetadata] = useState({
    title: 'Loading...',
    description: 'Loading course description...',
    canonical: '',
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
        console.log("Fetched Data:", data);

        setMetadata({
          title: data.meta_title || "Default Course Title",
          description: data.meta_description || "Default Course Description",
          canonical: data.Canonical_tag || "",
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

  // Update meta tags dynamically
  useEffect(() => {
    if (!isLoading && !error) {
      document.title = metadata.title;

      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', metadata.description);

      let canonicalTag = document.querySelector('link[rel="canonical"]');
      if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.rel = "canonical";
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.setAttribute('href', metadata.canonical);
    }
  }, [metadata, isLoading, error]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <RootLayout metadata={metadata}>
      <div className="main-content">
        <Preloader />
        <HeaderFour />
        <div className="content-wrapper js-content-wrapper overflow-hidden">
          <PageLinks />
          <BlogDetails slug={params.slug} pageItem={pageItem} />
          {/* <RelatedBlogs/> */}
          <FooterFour />
        </div>
      </div>
    </RootLayout>
  );
}
