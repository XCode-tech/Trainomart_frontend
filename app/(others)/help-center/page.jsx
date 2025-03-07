










import Faq from '@/components/common/Faq'
import PageLinks from '@/components/common/PageLinks'
import Preloader from '@/components/common/Preloader'
import RootLayout from '@/app/layout'

import FooterFour from '@/components/layout/footers/FooterFour'
import HeaderFour from '@/components/layout/headers/HeaderFour'
import HelpCenter from '@/components/others/HelpCenter'
import Terms from '@/components/terms/Terms'
import React from 'react'
export const metadata = {
  title: 'Help Center - Trainomart Support & FAQs',
  description:
    'Need assistance? Visit Trainomart’s Help Center for FAQs, course support, and technical guidance. Get quick solutions to all your queries!',
  canonical: 'https://www.trainomart.com/help-center',
}




export default function page() {
  return (
    <RootLayout metadata={metadata}>

      <div className="main-content  ">
        <Preloader />

        <HeaderFour />
        <div className="content-wrapper js-content-wrapper overflow-hidden">
          <PageLinks />
          <HelpCenter />
          <Faq />
          <FooterFour />
        </div>

      </div>
    </RootLayout>

  )
}
