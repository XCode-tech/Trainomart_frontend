"use client"; // Ensure this is client-side only

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SearchComponent({ setSearchTerm }) {
  const searchParams = useSearchParams();  // Hook to get search params

  useEffect(() => {
    const searchQuery = searchParams.get('search') || '';  // Get 'search' query parameter from the URL
    setSearchTerm(searchQuery);  // Update the parent component's searchTerm state
  }, [searchParams]);

  return null;  // This component only handles search query logic
}
