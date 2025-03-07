

import PageLinks from '@/components/common/PageLinks'
import Preloader from '@/components/common/Preloader'
import CourseListFive from '@/components/courseList/CourseListFive'
import FooterFour from '@/components/layout/footers/FooterFour'

import FooterOne from '@/components/layout/footers/FooterOne'
import Header from '@/components/layout/headers/Header'
import HeaderFour from '@/components/layout/headers/HeaderFour'
import React from 'react'

export const metadata = {
  title: "Courses Trainomart - Empowering Careers with Expert Training",
  description:
    "Discover Trainomart’s mission to provide top-tier online training & certification courses. Learn from industry experts & boost your career with us!",
  alternates: {
    canonical: "https://www.trainomart.com/courses/",
  },
};


export default function page() {
  return (
    <div className="main-content  ">
      <Preloader/>
        <HeaderFour/>
        <div className="content-wrapper  js-content-wrapper overflow-hidden">
            <PageLinks/>
            <CourseListFive/>
            <FooterFour/>
        </div>
    </div>
  )
}
