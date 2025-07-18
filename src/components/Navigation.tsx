'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Users, 
  Calendar, 
  FileText, 
  LogOut,
  User,
  Heart,
  Bell,
  Home,
  CreditCard,
  MapPin
} from 'lucide-react';
import Image from 'next/image';
import { mockAuth } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface NavigationProps {
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onLogout }) => {
  const pathname = usePathname();
  const currentUser = mockAuth.currentUser;

  if (!currentUser) return null;

  const providerNavItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/requests', label: 'New Requests', icon: Bell },
    { href: '/patients', label: 'My Patients', icon: Users },
    { href: '/appointments', label: 'Appointments', icon: Calendar },
    { href: '/billing', label: 'Billing', icon: CreditCard },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  const patientNavItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/request-care', label: 'Request Care', icon: Heart },
    { href: '/appointments', label: 'My Appointments', icon: Calendar },
    { href: '/medical-records', label: 'Medical Records', icon: FileText },
    { href: '/pharmacies', label: 'Local Pharmacies', icon: MapPin },
    { href: '/checkout', label: 'Checkout', icon: CreditCard },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  const navItems = currentUser.role === 'provider' ? providerNavItems : patientNavItems;

  return (
    <nav className="bg-white shadow-sm border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Image 
                src="/xpress-health-logo.svg" 
                alt="XPress Health Logo" 
                width={160} 
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                      isActive
                        ? 'text-emerald-700 bg-emerald-50'
                        : 'text-gray-500 hover:text-emerald-600 hover:bg-emerald-50'
                    )}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="hidden md:block">
                <div className="text-sm font-medium text-gray-900">{currentUser.name}</div>
                <div className="text-xs text-gray-500 capitalize">{currentUser.role}</div>
              </div>
            </div>
            
            <button
              onClick={onLogout}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-emerald-50">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive
                    ? 'text-emerald-700 bg-emerald-100'
                    : 'text-gray-500 hover:text-emerald-600 hover:bg-emerald-100'
                )}
              >
                <Icon className="h-4 w-4 mr-3" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 