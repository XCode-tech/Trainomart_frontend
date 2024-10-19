   

import PageLinks from '@/components/common/PageLinks'
import Preloader from '@/components/common/Preloader'
import CourseListFour from '@/components/courseList/CourseListFour'
import FooterFour from '@/components/layout/footers/FooterFour'

import FooterOne from '@/components/layout/footers/FooterOne'
import Header from '@/components/layout/headers/Header'
import HeaderFour from '@/components/layout/headers/HeaderFour'
import React from 'react'

export const metadata = {
  title: 'All Coueses',
  description:
    '',
  
}

export default function page() {
  return (
    <div className="main-content  ">
      <Preloader/>
        <HeaderFour/>
        <div className="content-wrapper  js-content-wrapper overflow-hidden">
            <PageLinks/>
            <CourseListFour/>
            <FooterFour/>
        </div>
    </div>
  )
}
