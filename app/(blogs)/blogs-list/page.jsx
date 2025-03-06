import BlogsThree from '@/components/blogs/BlogsThree'
import PageLinks from '@/components/common/PageLinks'
import Preloader from '@/components/common/Preloader'
import FooterFour from '@/components/layout/footers/FooterFour'
import HeaderFour from '@/components/layout/headers/HeaderFour'
import RootLayout from '@/app/layout' // Import RootLayout

export const metadata = {
  title: 'Trainomart Blogs - Latest Insights on Training & Certification',
  description:
    'Stay updated with Trainomart’s latest blogs on career growth, online training, certification courses, and industry trends. Explore expert insights now!',
  canonical: 'https://www.trainomart.com/blogs-list/',
}

export default function Page() {
  return (
    <RootLayout metadata={metadata}>
      <div className="main-content">
        <Preloader />
        <HeaderFour />
        <div className="content-wrapper js-content-wrapper overflow-hidden">
          <PageLinks />
          <BlogsThree />
          <FooterFour />
        </div>
      </div>
    </RootLayout>
  );
}
