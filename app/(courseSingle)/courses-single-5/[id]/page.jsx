





import PageLinks from '@/components/common/PageLinks'
import Preloader from '@/components/common/Preloader'
import CourseDetailsFive from '@/components/courseSingle/CourseDetailsFive'


import CourseSlider from '@/components/courseSingle/CourseSlider'
import FooterOne from '@/components/layout/footers/FooterOne'
import HeaderFour from '@/components/layout/headers/HeaderFour'
import Header from '@/components/layout/headers/Header'
import React from 'react'
import FooterFour from '@/components/layout/footers/FooterFour'


export const metadata = {
  title: 'Couese-single-5',
  description:
    'Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.',
  
}

export default function page({ params }) {
  return (
    <div  className="main-content  ">
      <Preloader/>
        <HeaderFour/>
        <div  className="content-wrapper  js-content-wrapper">
            <PageLinks/>
            <CourseDetailsFive id={params.id} />
            <CourseSlider/>
            <FooterFour/>
        </div>


    </div>
  )
}
