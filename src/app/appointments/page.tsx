'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { mockAuth, mockRequests } from '@/lib/mock-data';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { 
  Calendar, 
  Clock, 
  User, 
  Video,
  MessageCircle,
  Plus,
  Filter,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { formatDateTime, formatTime, getStatusColor } from '@/lib/utils';

export default function Appointments() {
  const currentUser = mockAuth.currentUser;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'week' | 'month'>('week');

  if (!currentUser) {
    return null;
  }

  // Get appointments based on user role
  const appointments = currentUser.role === 'provider' 
    ? mockRequests.filter(request => 
        request.providerId === currentUser.id && 
        ['accepted', 'in-progress', 'completed'].includes(request.status)
      )
    : mockRequests.filter(request => 
        request.patientId === currentUser.id && 
        ['accepted', 'in-progress', 'completed'].includes(request.status)
      );

  // Generate upcoming appointments (mock scheduled times)
  const upcomingAppointments = appointments.map((request, index) => {
    const scheduledDate = new Date();
    scheduledDate.setDate(scheduledDate.getDate() + index + 1);
    scheduledDate.setHours(9 + (index * 2), 0, 0, 0);
    
    return {
      ...request,
      scheduledAt: scheduledDate,
      duration: 30, // 30 minutes
      status: index === 0 ? 'scheduled' : index === 1 ? 'in-progress' : 'scheduled'
    };
  });

  const todayAppointments = upcomingAppointments.filter(apt => {
    const today = new Date();
    const aptDate = new Date(apt.scheduledAt);
    return aptDate.toDateString() === today.toDateString();
  });

  const nextAppointment = upcomingAppointments
    .filter(apt => new Date(apt.scheduledAt) > new Date())
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())[0];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {currentUser.role === 'provider' ? 'My Appointments' : 'My Appointments'}
            </h1>
            <p className="text-gray-600">
              {currentUser.role === 'provider' 
                ? 'Manage your patient appointments and schedule.' 
                : 'View your upcoming medical appointments.'}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => setView('week')}
                className={`px-3 py-2 text-sm font-medium ${
                  view === 'week' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setView('month')}
                className={`px-3 py-2 text-sm font-medium ${
                  view === 'month' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Month
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Today</p>
                  <p className="text-2xl font-bold text-gray-900">{todayAppointments.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Upcoming</p>
                  <p className="text-2xl font-bold text-gray-900">{upcomingAppointments.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Video className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Video Calls</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {upcomingAppointments.filter(a => a.type === 'consultation').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <User className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {currentUser.role === 'provider' ? 'Patients' : 'Providers'}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Set(upcomingAppointments.map(a => 
                      currentUser.role === 'provider' ? a.patientId : a.providerId
                    )).size}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Appointment */}
        {nextAppointment && (
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Next Appointment</h3>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">
                      {currentUser.role === 'provider' 
                        ? nextAppointment.patient.name 
                        : nextAppointment.provider?.name || 'Provider TBD'}
                    </h4>
                    <p className="text-sm text-gray-600">{nextAppointment.specialty}</p>
                    <p className="text-sm text-gray-500">
                      {formatDateTime(nextAppointment.scheduledAt)} • {nextAppointment.duration} minutes
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button>
                    <Video className="h-4 w-4 mr-2" />
                    Join Call
                  </Button>
                  <Button variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Appointments List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">All Appointments</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    const newDate = new Date(currentDate);
                    newDate.setDate(newDate.getDate() - 7);
                    setCurrentDate(newDate);
                  }}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-sm font-medium px-3">
                  {currentDate.toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </span>
                <button
                  onClick={() => {
                    const newDate = new Date(currentDate);
                    newDate.setDate(newDate.getDate() + 7);
                    setCurrentDate(newDate);
                  }}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {upcomingAppointments.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments scheduled</h3>
                <p className="text-gray-500">
                  {currentUser.role === 'patient' 
                    ? "Request care to schedule your first appointment."
                    : "Accept patient requests to schedule appointments."}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => {
                  const otherUser = currentUser.role === 'provider' 
                    ? appointment.patient 
                    : appointment.provider;
                    
                  return (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">
                            {otherUser?.name || 'TBD'}
                          </h4>
                          <p className="text-xs text-gray-600">{appointment.specialty}</p>
                          <p className="text-xs text-gray-500">
                            {formatDateTime(appointment.scheduledAt)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            <Video className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageCircle className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
} 