







import BlogsThree from '@/components/blogs/BlogsThree'
import PageLinks from '@/components/common/PageLinks'
import Preloader from '@/components/common/Preloader'
import FooterFour from '@/components/layout/footers/FooterFour'

import FooterOne from '@/components/layout/footers/FooterOne'
import Header from '@/components/layout/headers/Header'
import HeaderFour from '@/components/layout/headers/HeaderFour'
import React from 'react'

export const metadata = {
  title: 'Trainomart Blogs - Latest Insights on Training & Certification',
  description:
    'Stay updated with Trainomart’s latest blogs on career growth, online training, certification courses, and industry trends. Explore expert insights now!',
  Canonical_tag: 'https://www.trainomart.com/blogs-list/',
}

export default function page() {
  return (
    <div className="main-content  ">
      <Preloader/>

        <HeaderFour/>
        <div className="content-wrapper js-content-wrapper overflow-hidden">
            <PageLinks/>

            <BlogsThree/>
           
            
            <FooterFour/>
        </div>

    </div>
  )
}


