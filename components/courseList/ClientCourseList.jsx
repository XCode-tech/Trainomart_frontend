"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import CourseListFour from '@/components/courseList/CourseListFour';

export default function ClientCourseList() {
  const [searchTerm, setSearchTerm] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams) {
      const query = searchParams.get('search') || '';
      setSearchTerm(query);
    }
  }, [searchParams]);

  return (
    <div>
      <CourseListFour tags={searchTerm} />
    </div>
  );
}
