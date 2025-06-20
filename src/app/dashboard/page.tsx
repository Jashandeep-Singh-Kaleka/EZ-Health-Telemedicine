'use client';

import React from 'react';
import Layout from '@/components/Layout';
import { mockAuth, mockRequests } from '@/lib/mock-data';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { 
  Users, 
  Calendar, 
  Bell, 
  TrendingUp, 
  Clock,
  Heart,
  FileText,
  Activity
} from 'lucide-react';
import { formatDateTime, getUrgencyColor, getStatusColor } from '@/lib/utils';

export default function Dashboard() {
  const currentUser = mockAuth.currentUser;

  if (!currentUser) {
    return null;
  }

  if (currentUser.role === 'provider') {
    const myRequests = mockRequests.filter(r => r.providerId === currentUser.id);
    const pendingRequests = mockRequests.filter(r => !r.providerId && r.status === 'pending');
    const todayAppointments = myRequests.filter(r => r.status === 'accepted');

    return (
      <Layout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {currentUser.name}
            </h1>
            <p className="text-gray-600">Here&apos;s what&apos;s happening with your practice today.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Patients</p>
                    <p className="text-2xl font-bold text-gray-900">{myRequests.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Today&apos;s Appointments</p>
                    <p className="text-2xl font-bold text-gray-900">{todayAppointments.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Bell className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">New Requests</p>
                    <p className="text-2xl font-bold text-gray-900">{pendingRequests.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Rating</p>
                    <p className="text-2xl font-bold text-gray-900">{currentUser.rating}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Requests */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Recent Patient Requests</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myRequests.slice(0, 3).map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{request.patient.name}</p>
                        <p className="text-sm text-gray-600">{request.symptoms}</p>
                        <p className="text-xs text-gray-500">{formatDateTime(request.createdAt)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getUrgencyColor(request.urgency)}`}>
                          {request.urgency}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Pending Requests in Your Area</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingRequests.slice(0, 3).map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{request.specialty}</p>
                        <p className="text-sm text-gray-600">{request.symptoms}</p>
                        <p className="text-xs text-gray-500">Zip: {request.zipCode}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getUrgencyColor(request.urgency)}`}>
                          {request.urgency}
                        </span>
                        <Clock className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  // Patient Dashboard
  const myRequests = mockRequests.filter(r => r.patientId === currentUser.id);
  const activeRequests = myRequests.filter(r => ['pending', 'matched', 'accepted'].includes(r.status));
  const completedRequests = myRequests.filter(r => r.status === 'completed');

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {currentUser.name}
          </h1>
          <p className="text-gray-600">Manage your health and appointments.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{activeRequests.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Activity className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{completedRequests.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{myRequests.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Your Recent Requests</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myRequests.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">No requests yet. Request care when you need it!</p>
                </div>
              ) : (
                myRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <p className="font-medium text-gray-900">{request.specialty}</p>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getUrgencyColor(request.urgency)}`}>
                          {request.urgency}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{request.symptoms}</p>
                      {request.provider && (
                        <p className="text-sm text-blue-600 mt-1">Assigned to: {request.provider.name}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">{formatDateTime(request.createdAt)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
} 