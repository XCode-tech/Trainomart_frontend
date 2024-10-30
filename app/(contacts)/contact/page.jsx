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
    "Contact",
  description:
    "",
};

export default function page() {
  return (
    <div className="main-content  ">
      <Preloader />

      <HeaderFour />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <ContactOne />
        <Faq />

        <FooterFour />
      </div>
    </div>
  );
}
