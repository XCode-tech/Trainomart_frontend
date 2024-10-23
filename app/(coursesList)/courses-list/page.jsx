import React, { useState } from 'react';
import PageLinks from '@/components/common/PageLinks';
import Preloader from '@/components/common/Preloader';
import CourseListFour from '@/components/courseList/CourseListFour';
import FooterFour from '@/components/layout/footers/FooterFour';
import HeaderFour from '@/components/layout/headers/HeaderFour';

export const metadata = {
  title: 'All Courses',
  description:
    'Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.',
};

export default function Page() {
  // State for the search term
  const [searchTerm, setSearchTerm] = useState('');

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);  // Update searchTerm state when the user types
  };

  return (
    <div className="main-content">
      <Preloader />
      <HeaderFour />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />
        
        {/* Add a search input field to capture the user's search query */}
        <div className="container pt-4">
          <input
            type="text"
            placeholder="Search for courses..."
            value={searchTerm}
            onChange={handleSearchChange} // Update search term as user types
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Pass searchTerm as a prop to CourseListFour */}
        <CourseListFour tags={searchTerm} />

        <FooterFour />
      </div>
    </div>
  );
}
