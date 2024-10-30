




import About from '@/components/about/About'


import Brands from '@/components/common/Brands'
import Instructors from '@/components/common/Instructors'
import ManagingDirector from '@/components/common/ManagingDirector'
import PageLinks from '@/components/common/PageLinks'
import Preloader from '@/components/common/Preloader'
import TestimonialsOne from '@/components/common/TestimonialsOne'
import TestimonialsThree from '@/components/common/TestimonialsThree'
import WeOffer from '@/components/homes/WeOffer'
import WhyCourse from '@/components/homes/WhyCourse'
import WhyCourse2 from '@/components/homes/WhyCourse2'
import FooterFour from '@/components/layout/footers/FooterFour'


import FooterOne from '@/components/layout/footers/FooterOne'
import Header from '@/components/layout/headers/Header'
import HeaderFour from '@/components/layout/headers/HeaderFour'
import React from 'react'

export const metadata = {
  title: 'About',
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
            <About/>
            <div id="we-offer-section">
              <WeOffer />
            </div>

            <TestimonialsThree/>
            <ManagingDirector />
            {/* <Instructors/> */}
            <Brands/>
           

            
            
            <FooterFour/>
        </div>

    </div>
  )
}

