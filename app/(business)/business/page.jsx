




import About from '@/components/about/About'
import Business from '@/components/business/business'


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
  title: 'Business',
  description:
    '',
  
}

export default function page() {
  return (
    <div className="main-content  ">
      <Preloader/>

        <HeaderFour/>
        <div className="content-wrapper js-content-wrapper overflow-hidden">
            <PageLinks/>
            <Business/>
            <WhyCourse2/>
            

            <TestimonialsTwo/>
            {/* <Instructors/> */}
            <Brands/>
           

            
            
            <FooterFour/>
        </div>

    </div>
  )
}

