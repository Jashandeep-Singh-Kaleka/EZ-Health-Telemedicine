'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { mockAuth, mockRequests } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { 
  Users, 
  Bell, 
  Activity, 
  BarChart3, 
  UserPlus,
  Pill,
  FlaskConical,
  MessageSquare,
  Calendar,
  User,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export default function Dashboard() {
  const currentUser = mockAuth.currentUser;
  const router = useRouter();

  if (!currentUser) {
    return null;
  }

  // Get pending requests count for providers
  const pendingRequestsCount = currentUser.role === 'provider' 
    ? mockRequests.filter(r => r.status === 'pending').length 
    : 0;

  const myRequestsCount = currentUser.role === 'patient'
    ? mockRequests.filter(r => r.patientId === currentUser.id).length
    : 0;

  const patientNavigation = [
    {
      title: 'Prescription Request',
      description: 'Request a prescription refill or new medication',
      icon: <Pill className="h-8 w-8 text-blue-600" />,
      path: '/prescription-request',
      color: 'blue',
      stats: 'Quick & Easy',
      urgent: false
    },
    {
      title: 'Lab Test Request', 
      description: 'Order laboratory tests and diagnostic services',
      icon: <FlaskConical className="h-8 w-8 text-purple-600" />,
      path: '/lab-test-request',
      color: 'purple',
      stats: 'Same Day Results',
      urgent: false
    },
    {
      title: 'Message Provider',
      description: 'Consult with healthcare providers about your concerns',
      icon: <MessageSquare className="h-8 w-8 text-green-600" />,
      path: '/message-provider',
      color: 'green',
      stats: '24/7 Available',
      urgent: false
    },
    {
      title: 'My Visits',
      description: 'View your appointment history and medical records',
      icon: <Calendar className="h-8 w-8 text-indigo-600" />,
      path: '/my-visits',
      color: 'indigo',
      stats: `${myRequestsCount} Records`,
      urgent: false
    },
    {
      title: 'My Information',
      description: 'Update your personal and medical information',
      icon: <User className="h-8 w-8 text-gray-600" />,
      path: '/my-information',
      color: 'gray',
      stats: 'Keep Updated',
      urgent: false
    }
  ];

  const providerNavigation = [
    {
      title: 'New Requests',
      description: 'Review and accept patient requests for care',
      icon: <Bell className="h-8 w-8 text-red-600" />,
      path: '/requests',
      color: 'red',
      stats: `${pendingRequestsCount} Pending`,
      urgent: pendingRequestsCount > 0
    },
    {
      title: 'Activity Summary',
      description: 'Overview of your daily practice activities',
      icon: <Activity className="h-8 w-8 text-blue-600" />,
      path: '/activity',
      color: 'blue',
      stats: "Today's Overview",
      urgent: false
    },
    {
      title: 'My Patients',
      description: 'Manage your current and past patients',
      icon: <Users className="h-8 w-8 text-green-600" />,
      path: '/patients',
      color: 'green',
      stats: 'Active Cases',
      urgent: false
    },
    {
      title: 'Practice Metrics',
      description: 'View analytics and performance insights',
      icon: <BarChart3 className="h-8 w-8 text-purple-600" />,
      path: '/practice-metrics',
      color: 'purple',
      stats: 'Growth Tracking',
      urgent: false
    },
    {
      title: 'Invite Patients',
      description: 'Grow your practice by inviting new patients',
      icon: <UserPlus className="h-8 w-8 text-indigo-600" />,
      path: '/invite-patients',
      color: 'indigo',
      stats: 'Expand Practice',
      urgent: false
    }
  ];

  const navigation = currentUser.role === 'provider' ? providerNavigation : patientNavigation;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image 
                src="/xpress-health-logo.svg" 
                alt="XPress Health Logo" 
                width={200} 
                height={50}
                className="h-10 w-auto"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                <p className="text-xs text-gray-500 capitalize">{currentUser.role}</p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  mockAuth.logout();
                  router.push('/');
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome back, {currentUser.name}
          </h1>
          <p className="text-lg text-gray-600">
            {currentUser.role === 'provider' 
              ? 'Manage your practice and provide excellent patient care'
              : 'Access your healthcare services and manage your health'}
          </p>
        </div>

        {/* Quick Stats for Providers */}
        {currentUser.role === 'provider' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Bell className={`h-6 w-6 ${pendingRequestsCount > 0 ? 'text-red-500' : 'text-gray-400'}`} />
                </div>
                <div className={`text-2xl font-bold ${pendingRequestsCount > 0 ? 'text-red-600' : 'text-gray-900'}`}>
                  {pendingRequestsCount}
                </div>
                <div className="text-sm text-gray-600">New Requests</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {mockRequests.filter(r => r.providerId === currentUser.id).length}
                </div>
                <div className="text-sm text-gray-600">Total Patients</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">4.8</div>
                <div className="text-sm text-gray-600">Avg Rating</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation Cards */}
        <div className="space-y-4">
          {navigation.map((item) => (
            <Card 
              key={item.path} 
              className={`hover:shadow-lg transition-all cursor-pointer ${
                item.urgent ? 'ring-2 ring-red-200 bg-red-50' : ''
              }`}
            >
              <CardContent className="p-6">
                <div 
                  className="flex items-center justify-between"
                  onClick={() => router.push(item.path)}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 bg-${item.color}-100 rounded-lg ${
                      item.urgent ? 'animate-pulse' : ''
                    }`}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {item.title}
                        {item.urgent && (
                          <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            URGENT
                          </span>
                        )}
                      </h3>
                      <p className="text-gray-600 mb-2">{item.description}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>{item.stats}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <ArrowRight className="h-6 w-6 text-gray-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                {currentUser.role === 'provider' 
                  ? 'Contact support for technical assistance or patient care questions.'
                  : 'Contact our support team if you have questions about your care.'}
              </p>
              <Button variant="outline">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}