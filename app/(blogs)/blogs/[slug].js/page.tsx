








import RelatedBlogs from '@/components/blogs/RelatedBlogs'
import PageLinks from '@/components/common/PageLinks'



import FooterOne from '@/components/layout/footers/FooterOne'
import Header from '@/components/layout/headers/Header'
import React from 'react'
import HeaderFour from '@/components/layout/headers/HeaderFour'
import BlogDetails from '@/components/blogs/BlogDetails'
import Preloader from '@/components/common/Preloader'
import FooterFour from '@/components/layout/footers/FooterFour'

export const metadata = {
  title: 'Blog-details',
  description:
    '',
  
}


export default function page({ params }) {
  return (
    <div className="main-content  ">
      <Preloader/>

        <HeaderFour/>
        <div className="content-wrapper js-content-wrapper overflow-hidden">
            <PageLinks/>

            <BlogDetails slug={params.slug} />

            {/* <RelatedBlogs/> */}
       
            <FooterFour/>
        </div>

    </div>
  )
}
