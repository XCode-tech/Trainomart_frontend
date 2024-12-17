// import HomeOne from "@/components/homes/home";
import  Header  from "../components/layout/headers/Header";
// import MobileMenu from "@/components/layout/component/MobileMenu";

import HomeHero from "../components/homes/heros/HomeHero";
import HeroFour from "@/components/homes/heros/HeroFour";
import HeaderFour from "@/components/layout/headers/HeaderFour";
import Brands from "../components/common/Brands";
import Categories from "../components/homes/categories/Categories";
import Courses from "../components/homes/courses/Courses";
import TestimonialsOne from "../components/common/TestimonialsOne";
import FeaturesOne from "../components/homes/features/FeaturesOne";
import WhyCourse from "../components/homes/WhyCourse";
import Instructors from "../components/common/Instructors";
import GetApp from "../components/homes/getApp/GetApp";
import Blog from "../components/homes/blogs/Blog";
import Join from "../components/homes/join/Join";
import FooterOne from "../components/layout/footers/FooterOne";
import Preloader from "@/components/common/Preloader";
import FooterFour from "@/components/layout/footers/FooterFour";
import CategoriesFour from "@/components/homes/categories/CategoriesFour";

export const metadata = {
  title: 'Home',
  description:
    '',
  
}

export default function HomePage() {
  return (
    
    <>
    <Preloader/>
    <HeaderFour />
    <div dangerouslySetInnerHTML={{
      __html: `
      <!-- Meta Pixel Code -->
      <script>
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '845551474356300');
        fbq('track', 'PageView');
      </script>
      <noscript><img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=845551474356300&ev=PageView&noscript=1" />
      </noscript>
      <!-- End Meta Pixel Code -->
    ` }} />

    <div className="content-wrapper  js-content-wrapper overflow-hidden">
    
      <HeroFour />
      <Courses/>
      {/* <CategoriesFour /> */}
      <TestimonialsOne/>
      <FeaturesOne/>
      <WhyCourse/>
      <Brands/>

      {/* <Instructors/> */}
      <GetApp/>
      {/* <Blog/> */}
      {/* <Join/> */}
      <FooterFour/>
      
      
    </div>
  </>
  );
}
