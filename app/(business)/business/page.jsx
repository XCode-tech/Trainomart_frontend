




import About from '@/components/about/About'
import Business from '@/components/business/business'
import RootLayout from '@/app/layout'


import Brands from '@/components/common/Brands'
import Instructors from '@/components/common/Instructors'
import PageLinks from '@/components/common/PageLinks'
import Preloader from '@/components/common/Preloader'
import TestimonialsOne from '@/components/common/TestimonialsOne'
import TestimonialsTwo from '@/components/common/TestimonialsTwo'
import WhyCourse2 from '@/components/homes/WhyCourse2'
import FooterFour from '@/components/layout/footers/FooterFour'


import FooterOne from '@/components/layout/footers/FooterOne'
import Header from '@/components/layout/headers/Header'
import HeaderFour from '@/components/layout/headers/HeaderFour'
import React from 'react'

export const metadata = {
  title: 'Trainomart for Business - Corporate Training & Skill Development',
  description:
    'Empower your workforce with Trainomart’s corporate training solutions! Upskill teams with expert-led courses in AI, cloud, IT, and more. Get started today!',
  canonical: 'https://www.trainomart.com/business',

}

export default function page() {
  return (
    <RootLayout metadata={metadata}>

      <div className="main-content  ">
        <Preloader/>
  
          <HeaderFour/>
          <div className="content-wrapper js-content-wrapper overflow-hidden">
              <PageLinks/>
              <Business/>
              <TestimonialsTwo/>
              <WhyCourse2/>
  
              {/* <Instructors/> */}
              <Brands/>
             
  
              
              
              <FooterFour/>
          </div>
  
      </div>
    </RootLayout>

  )
}

