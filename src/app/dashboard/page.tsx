'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { mockAuth } from '@/lib/mock-data';

export default function Dashboard() {
  const currentUser = mockAuth.currentUser;
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    // Redirect to the appropriate first page based on role
    if (currentUser.role === 'provider') {
      router.replace('/requests');
    } else {
      router.replace('/prescription-request');
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return null;
  }

  // This component will redirect, so we show a loading state
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>
  );
}