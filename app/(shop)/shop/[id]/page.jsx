






import PageLinks from '@/components/common/PageLinks'
import Preloader from '@/components/common/Preloader'
import FooterFour from '@/components/layout/footers/FooterFour'



import FooterOne from '@/components/layout/footers/FooterOne'
import Header from '@/components/layout/headers/Header'
import HeaderFour from '@/components/layout/headers/HeaderFour'
import ProductDetails from '@/components/shop/ProductDetails'
import RelatedProducts from '@/components/shop/RelatedProducts'
import React from 'react'
export const metadata = {
  title: 'Shop-details',
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

            <ProductDetails id={params.id} />
            <RelatedProducts/>

            
       
            <FooterFour/>
        </div>

    </div>
  )
}
