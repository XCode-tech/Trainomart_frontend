"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import CourseListFour from '@/components/courseList/CourseListFour';

export default function ClientOnlyCourseList() {
  const [searchTerm, setSearchTerm] = useState('');
  const searchParams = useSearchParams(); // Use searchParams only on the client

  useEffect(() => {
    if (searchParams) {
      const query = searchParams.get('search') || ''; // Get search term from query params
      setSearchTerm(query); // Set the search term
    }
  }, [searchParams]);

  return (
    <div>
      {/* Pass searchTerm as a prop to CourseListFour */}
      <CourseListFour tags={searchTerm} />
    </div>
  );
}
