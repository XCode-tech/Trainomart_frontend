










import Faq from '@/components/common/Faq'
import PageLinks from '@/components/common/PageLinks'
import Preloader from '@/components/common/Preloader'

import FooterFour from '@/components/layout/footers/FooterFour'
import HeaderFour from '@/components/layout/headers/HeaderFour'
import HelpCenter from '@/components/others/HelpCenter'
import Terms from '@/components/terms/Terms'
import React from 'react'
export const metadata = {
  title: 'Help-center',
  description:
    'Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.',
  
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
