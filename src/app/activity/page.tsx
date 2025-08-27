'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { mockAuth, mockRequests } from '@/lib/mock-data';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Image from 'next/image';
import { 
  Activity, 
  Clock, 
  CheckCircle, 
  Users, 
  TrendingUp,
  Calendar,
  MessageSquare,
  Pill,
  FlaskConical,
  AlertCircle
} from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

type TimeFilter = '24h' | '7d' | '30d';

export default function ActivitySummary() {
  const currentUser = mockAuth.currentUser;
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('24h');

  if (!currentUser || currentUser.role !== 'provider') {
    return null;
  }

  // Filter requests based on time period
  const getDateThreshold = (filter: TimeFilter) => {
    const now = new Date();
    switch (filter) {
      case '24h':
        return new Date(now.getTime() - 24 * 60 * 60 * 1000);
      case '7d':
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      case '30d':
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      default:
        return new Date(now.getTime() - 24 * 60 * 60 * 1000);
    }
  };

  const threshold = getDateThreshold(timeFilter);
  const recentActivity = mockRequests.filter(request => 
    request.updatedAt >= threshold
  );

  const myRequests = mockRequests.filter(r => r.providerId === currentUser.id);
  const recentMyActivity = recentActivity.filter(r => r.providerId === currentUser.id);

  // Mock recent activity data
  const activityEvents = [
    {
      id: '1',
      type: 'request_accepted',
      message: 'Accepted prescription request from John Doe',
      time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      icon: <Pill className="h-4 w-4 text-blue-600" />,
      patient: 'John Doe'
    },
    {
      id: '2',
      type: 'consultation_completed',
      message: 'Completed consultation with Mary Smith',
      time: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      icon: <MessageSquare className="h-4 w-4 text-green-600" />,
      patient: 'Mary Smith'
    },
    {
      id: '3',
      type: 'lab_order',
      message: 'Ordered lab tests for Alex Jones',
      time: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      icon: <FlaskConical className="h-4 w-4 text-purple-600" />,
      patient: 'Alex Jones'
    },
    {
      id: '4',
      type: 'urgent_request',
      message: 'Received urgent consultation request',
      time: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      icon: <AlertCircle className="h-4 w-4 text-red-600" />,
      patient: 'Emergency Patient'
    },
    {
      id: '5',
      type: 'prescription_sent',
      message: 'Sent prescription to CVS Pharmacy',
      time: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      icon: <CheckCircle className="h-4 w-4 text-green-600" />,
      patient: 'Sarah Wilson'
    }
  ].filter(event => event.time >= threshold);

  const getActivityStats = () => {
    return {
      totalRequests: recentActivity.length,
      acceptedRequests: recentMyActivity.length,
      completedRequests: recentMyActivity.filter(r => r.status === 'completed').length,
      activePatients: new Set(myRequests.map(r => r.patientId)).size
    };
  };

  const stats = getActivityStats();

  return (
    <Layout>
      <div className="space-y-8">
        {/* XPress Health Logo Header */}
        <div className="flex items-center justify-center mb-8">
          <Image 
            src="/xpress-health-logo.svg" 
            alt="XPress Health Logo" 
            width={200} 
            height={50}
            className="h-12 w-auto"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Activity Summary</h1>
            <p className="text-gray-600">Overview of your recent practice activity</p>
          </div>
          
          {/* Time Filter */}
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            {(['24h', '7d', '30d'] as TimeFilter[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  timeFilter === filter
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {filter === '24h' ? 'Last 24h' : filter === '7d' ? 'Last 7 days' : 'Last 30 days'}
              </button>
            ))}
          </div>
        </div>

        {/* Activity Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalRequests}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Accepted</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.acceptedRequests}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completedRequests}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Users className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Patients</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activePatients}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              </div>
            </CardHeader>
            <CardContent>
              {activityEvents.length === 0 ? (
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">No recent activity</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activityEvents.map((event) => (
                    <div key={event.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        {event.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{event.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDateTime(event.time)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">View Schedule</h4>
                      <p className="text-sm text-gray-600">Check your upcoming appointments</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Manage Patients</h4>
                      <p className="text-sm text-gray-600">View and manage your patient list</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Practice Metrics</h4>
                      <p className="text-sm text-gray-600">View detailed practice analytics</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Summary */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Performance Summary</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stats.acceptedRequests > 0 ? Math.round((stats.completedRequests / stats.acceptedRequests) * 100) : 0}%
                </div>
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-xs text-gray-500 mt-1">Requests completed vs accepted</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {currentUser.rating}
                </div>
                <p className="text-sm font-medium text-gray-600">Patient Rating</p>
                <p className="text-xs text-gray-500 mt-1">Average patient satisfaction</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {stats.activePatients}
                </div>
                <p className="text-sm font-medium text-gray-600">Active Patients</p>
                <p className="text-xs text-gray-500 mt-1">Patients under your care</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}