'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Navigation from './Navigation';
import Footer from './Footer';
import { mockAuth } from '@/lib/mock-data';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = mockAuth.isAuthenticated();
    
    if (!isAuthenticated && pathname !== '/') {
      router.push('/');
    } else if (isAuthenticated && pathname === '/') {
      router.push('/dashboard');
    }
    
    setIsLoading(false);
  }, [pathname, router]);

  const handleLogout = () => {
    mockAuth.logout();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Don't show navigation on landing/login page
  if (pathname === '/') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation onLogout={handleLogout} />
      <main className="flex-1 max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 