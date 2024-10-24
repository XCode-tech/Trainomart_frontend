"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'; // Only used on the client
import CourseListFour from '@/components/courseList/CourseListFour';

export default function ClientCourseList() {
  const [searchTerm, setSearchTerm] = useState('');
  const searchParams = useSearchParams();

  // Fetch the search query on client-side rendering
  useEffect(() => {
    const searchQuery = searchParams.get('search') || ''; // Extract 'search' query param
    setSearchTerm(searchQuery);
  }, [searchParams]);

  return (
    <div>
      {/* Pass searchTerm to CourseListFour */}
      <CourseListFour tags={searchTerm} />
    </div>
  );
}
