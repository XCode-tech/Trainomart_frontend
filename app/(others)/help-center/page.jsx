










import Faq from '@/components/common/Faq'
import PageLinks from '@/components/common/PageLinks'
import Preloader from '@/components/common/Preloader'

import FooterFour from '@/components/layout/footers/FooterFour'
import HeaderFour from '@/components/layout/headers/HeaderFour'
import HelpCenter from '@/components/others/HelpCenter'
import Terms from '@/components/terms/Terms'
import React from 'react'
export const metadata = {
  title: 'Help Center - Trainomart Support & FAQs',
  description:
    'Need assistance? Visit Trainomart’s Help Center for FAQs, course support, and technical guidance. Get quick solutions to all your queries!',
  
}

export default function page() {
  return (
    <div className="main-content  ">
      <Preloader/>

        <HeaderFour/>
        <div className="content-wrapper js-content-wrapper overflow-hidden">
            <PageLinks/>
            <HelpCenter/>
            <Faq/>
            <FooterFour/>
        </div>

    </div>
  )
}
