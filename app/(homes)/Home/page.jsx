




import React from 'react'
import HeaderFour from '@/components/layout/headers/HeaderFour'
import HeroFour from '@/components/homes/heros/HeroFour'
import Brands from '@/components/common/Brands'
import RootLayout from '@/app/layout'

import CategoriesFour from '@/components/homes/categories/CategoriesFour'
import CoursesFour from '@/components/homes/courses/CoursesFour'
import LearningPath from '@/components/homes/LearningPath/LearningPath'
import FeaturedCourses from '@/components/homes/courses/FeaturedCourses'
import LandJob from '@/components/homes/landJob/LandJob'
import TestimonialsFour from '@/components/homes/testimonials/TestimonialsFour'
import AchievementsTwo from '@/components/homes/achievements/AchievementsTwo'
import InstractorFour from '@/components/homes/instractors/InstractorFour'
import EventsFour from '@/components/homes/events/EventsFour'
import LearningSelection from '@/components/homes/LearningSelection'
import FooterFour from '@/components/layout/footers/FooterFour'
import Preloader from '@/components/common/Preloader'


export const metadata = {
  title: 'Trainomart - Best Online Training & Certification Courses',
  description:
    'Enhance your skills with TrainoMart’s top-rated online training and certification courses. Learn from industry experts and boost your career today! Enroll Now.',
  canonical: 'https://www.trainomart.com/',
}



export default function page() {
  return (
    <>
      <RootLayout metadata={metadata}>
        <div className='main-content'>
          <Preloader />
          <HeaderFour />
        </div>
        <div className="content-wrapper  js-content-wrapper overflow-hidden">
          <HeroFour />
          <Brands />
          <CategoriesFour />
          <CoursesFour />
          <LearningPath />
          <FeaturedCourses />
          <LandJob />
          <TestimonialsFour />
          <AchievementsTwo />
          <InstractorFour />
          <EventsFour />
          <LearningSelection />
          <FooterFour />

        </div>
      </RootLayout>
    </>
  )
}
