import RootLayout from '@/app/layout'
import Faq from "@/components/common/Faq";
import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";
import ContactOne from "@/components/contacts/ContactOne";
import FooterFour from "@/components/layout/footers/FooterFour";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import HeaderFour from "@/components/layout/headers/HeaderFour";
import React from "react";

export const metadata = {
  title:
    "Contact Trainomart - Get in Touch for Training & Support",
  description:
    "Have questions? Contact Trainomart for expert guidance on training courses, certifications, and career growth. Reach out today!",
  canonical: 'https://www.trainomart.com/contact',

};

export default function page() {
  return (
    <RootLayout metadata={metadata}>

      <div className="main-content  ">
        <Preloader />
  
        <HeaderFour />
        <div className="content-wrapper js-content-wrapper overflow-hidden">
          <ContactOne />
          <Faq />
  
          <FooterFour />
        </div>
      </div>
    </RootLayout>

  );
}
