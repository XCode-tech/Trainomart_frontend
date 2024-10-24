"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'; // Correctly use next/navigation hook for client-side usage
import CourseListFour from '@/components/courseList/CourseListFour';

export default function ClientOnlyCourseList() {
  const [searchTerm, setSearchTerm] = useState('');
  const searchParams = useSearchParams(); // This should only be used client-side

  useEffect(() => {
    if (searchParams) {
      // Safely extract search term from URL query parameters
      const query = searchParams.get('search') || '';
      setSearchTerm(query); // Set search term from query params
    }
  }, [searchParams]);

  return (
    <div>
      {/* Pass the search term to the CourseListFour component */}
      <CourseListFour tags={searchTerm} />
    </div>
  );
}
