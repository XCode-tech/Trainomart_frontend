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
