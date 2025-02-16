










import NotFound from '@/components/not-found/NotFound'
import PageLinks from '@/components/common/PageLinks'
import Preloader from '@/components/common/Preloader'
import EventsOne from '@/components/events/EventsOne'
import FooterOne from '@/components/layout/footers/FooterOne'
import Header from '@/components/layout/headers/Header'
import HeaderFour from '@/components/layout/headers/HeaderFour'

import React from 'react'
export const metadata = {
  title: 'Page not found',
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
            <NotFound/>
            <FooterFour/>
        </div>

    </div>
  )
}
