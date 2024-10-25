// "use client";

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation'; // Import useRouter
// import PageLinks from '@/components/common/PageLinks';
// import Preloader from '@/components/common/Preloader';
// import CourseListFour from '@/components/courseList/CourseListFour';
// import FooterFour from '@/components/layout/footers/FooterFour';
// import HeaderFour from '@/components/layout/headers/HeaderFour';

// export default function Page() {
//   const router = useRouter();
//   const [searchTerm, setSearchTerm] = useState('');

//   // Ensure the router is ready before trying to access the query
//   useEffect(() => {
//     if (router.isReady) {
//       const searchQuery = router.query.searchTerm; // Accessing searchTerm
//       if (searchQuery) { // Check if searchQuery is defined
//         setSearchTerm(searchQuery);
//       }
//     }
//   }, [router.isReady, router.query]);

//   return (
//     <div className="main-content">
//       <Preloader />
//       <HeaderFour />
//       <div className="content-wrapper js-content-wrapper overflow-hidden">
//         <PageLinks />

//         {/* Ensure searchTerm is passed even if it's an empty string */}
//         <CourseListFour tags={searchTerm} />

//         <FooterFour />
//       </div>
//     </div>
//   );
// }



import { useRouter } from 'next/navigation';
import CourseListFour from '@/components/courseList/CourseListFour';
import PageLinks from '@/components/common/PageLinks';
import Preloader from '@/components/common/Preloader';
import CourseListFour from '@/components/courseList/CourseListFour';
import FooterFour from '@/components/layout/footers/FooterFour';
import HeaderFour from '@/components/layout/headers/HeaderFour';

export default function SearchPage() {
  const router = useRouter();
  const { search } = router.query; // Extract the search parameter

  return (
    <div className="main-content">
      <Preloader />
      <HeaderFour />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />

        <CourseListFour tags={search || ''} /> {/* Pass search term as tags */}
        <FooterFour />
      </div>
     </div>
  );
}
