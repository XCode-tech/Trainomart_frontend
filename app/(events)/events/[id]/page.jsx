






import PageLinks from '@/components/common/PageLinks'
import Preloader from '@/components/common/Preloader'
import EventDetails from '@/components/events/EventDetails'


import FooterOne from '@/components/layout/footers/FooterOne'
import Header from '@/components/layout/headers/Header'
import HeaderFour from '@/components/layout/headers/HeaderFour'
import React from 'react'
export const metadata = {
  title: 'Event-details',
  description:
    'Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.',
  
}
export default function page({ params }) {
  return (
    <div className="main-content  ">
      <Preloader/>

        <HeaderFour/>
        <div className="content-wrapper js-content-wrapper overflow-hidden">
            <PageLinks/>

            <EventDetails id={params.id} />
       
            <FooterOne/>
        </div>

    </div>
  )
}
