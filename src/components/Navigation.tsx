'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Users, 
  LogOut,
  User,
  Bell,
  Menu,
  X,
  MessageSquare,
  Pill,
  FlaskConical,
  Activity,
  BarChart3,
  UserPlus,
  Calendar,
  Home,
  Shield,
  FileText,
  Video,
  FolderOpen,
  Stethoscope,
  ChevronDown,
  Plus
} from 'lucide-react';
import Image from 'next/image';
import { mockAuth } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface NavigationProps {
  onLogout: () => void;
}

interface NavigationItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

const Navigation: React.FC<NavigationProps> = ({ onLogout }) => {
  const pathname = usePathname();
  const currentUser = mockAuth.currentUser;
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!currentUser) return null;

  // Count pending requests for notification badge
  const pendingRequestsCount = 0; // This would come from actual state management

  // Original navigation items (keep in main navigation)
  const providerNavItems: NavigationItem[] = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/requests', label: 'New Requests', icon: Bell, badge: pendingRequestsCount },
    { href: '/activity', label: 'Activity Summary', icon: Activity },
    { href: '/patients', label: 'Patients', icon: Users },
    { href: '/practice-metrics', label: 'Practice Metrics', icon: BarChart3 },
    { href: '/invite-patients', label: 'Invite Patients', icon: UserPlus },
    { href: '/profile', label: 'My Profile', icon: User },
  ];

  const patientNavItems: NavigationItem[] = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/prescription-request', label: 'Prescription Request', icon: Pill },
    { href: '/lab-test-request', label: 'Lab Tests Request', icon: FlaskConical },
    { href: '/message-provider', label: 'Message Provider', icon: MessageSquare },
    { href: '/my-visits', label: 'My Visits', icon: Calendar },
    { href: '/my-information', label: 'My Information', icon: User },
  ];

  // New features for dropdown (added in recent enhancement)
  const providerMoreItems: NavigationItem[] = [
    { href: '/schedule', label: 'Schedule', icon: Calendar },
    { href: '/prescriptions', label: 'Prescriptions', icon: Pill },
    { href: '/video-call', label: 'Video Calls', icon: Video },
    { href: '/medical-history', label: 'Medical History', icon: Stethoscope },
    { href: '/documents', label: 'Documents', icon: FolderOpen },
    { href: '/notifications', label: 'Notifications', icon: Bell },
  ];

  const patientMoreItems: NavigationItem[] = [
    { href: '/prescriptions', label: 'My Prescriptions', icon: Pill },
    { href: '/medical-history', label: 'Medical History', icon: Stethoscope },
    { href: '/documents', label: 'My Documents', icon: FolderOpen },
    { href: '/notifications', label: 'Notifications', icon: Bell },
  ];

  const navItems = currentUser.role === 'provider' ? providerNavItems : patientNavItems;
  const moreItems = currentUser.role === 'provider' ? providerMoreItems : patientMoreItems;

  return (
    <nav className="bg-white shadow-sm border-b border-emerald-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center flex-1 min-w-0">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/dashboard" className="hover:opacity-80 transition-opacity">
                <Image 
                  src="/xpress-health-logo.svg" 
                  alt="XPress Health Logo" 
                  width={140} 
                  height={35}
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            <div className="hidden lg:ml-6 lg:flex lg:space-x-1 items-center flex-1 min-w-0">
              {navItems.filter(item => item.href !== '/profile').map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'inline-flex items-center px-1.5 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap relative',
                      isActive
                        ? 'text-emerald-700 bg-emerald-50'
                        : 'text-gray-500 hover:text-emerald-600 hover:bg-emerald-50',
                      item.label === 'New Requests' && item.badge && item.badge > 0
                        ? 'text-red-600 hover:text-red-700'
                        : ''
                    )}
                  >
                    <Icon className="h-4 w-4 mr-1" />
                    {item.label}
                    {item.badge && item.badge > 0 && (
                      <span className="ml-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
              
              {/* More Features Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setMoreDropdownOpen(!moreDropdownOpen);
                  }}
                  className={cn(
                    'inline-flex items-center px-1.5 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap',
                    moreItems.some(item => pathname === item.href)
                      ? 'text-emerald-700 bg-emerald-50'
                      : 'text-gray-500 hover:text-emerald-600 hover:bg-emerald-50'
                  )}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  More Features
                  <ChevronDown className={cn("h-4 w-4 ml-1 transition-transform", moreDropdownOpen ? "rotate-180" : "")} />
                </button>
                
                {moreDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-xl border border-gray-200 z-[9999] ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
                        Advanced Features
                      </div>
                      {moreItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMoreDropdownOpen(false)}
                            className={cn(
                              'flex items-center px-3 py-2 text-sm transition-colors',
                              isActive
                                ? 'text-emerald-700 bg-emerald-50'
                                : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                            )}
                          >
                            <Icon className="h-4 w-4 mr-3" />
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            
            <Link 
              href="/profile"
              className="hidden lg:flex items-center space-x-2 hover:bg-emerald-50 rounded-md px-2 py-1 transition-colors ml-2"
            >
              <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-emerald-600" />
              </div>
            </Link>
            
            <button
              onClick={onLogout}
              className="hidden lg:inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden xl:inline ml-2">Logout</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-emerald-50 border-t border-emerald-100">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
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
            
            {/* Advanced Features Section in Mobile */}
            <div className="border-t border-emerald-200 pt-3 mt-3">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Advanced Features
              </div>
              {moreItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
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
            
            {/* Legal Links */}
            <div className="border-t border-emerald-200 pt-3 mt-3">
              <Link
                href="/privacy"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-emerald-600 hover:bg-emerald-100 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Shield className="h-4 w-4 mr-3" />
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-emerald-600 hover:bg-emerald-100 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FileText className="h-4 w-4 mr-3" />
                Terms of Service
              </Link>
            </div>
            
            {/* Mobile user info and logout */}
            <div className="border-t border-emerald-200 pt-3 mt-3">
              <div className="flex items-center px-3 py-2 text-sm text-gray-700">
                <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                  <User className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <div className="font-medium">{currentUser.name}</div>
                  <div className="text-xs text-gray-500 capitalize">{currentUser.role}</div>
                </div>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-emerald-600 hover:bg-emerald-100 rounded-md transition-colors"
              >
                <LogOut className="h-4 w-4 mr-3" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation; 