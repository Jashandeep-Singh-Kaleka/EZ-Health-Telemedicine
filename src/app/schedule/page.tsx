'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { 
  Calendar, 
  Plus, 
  Video, 
  User,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { mockAuth, mockPatients } from '@/lib/mock-data';

interface TimeSlot {
  time: string;
  available: boolean;
  appointmentId?: string;
  patientName?: string;
  type?: 'consultation' | 'follow-up' | 'prescription-review';
}

interface DaySchedule {
  date: Date;
  slots: TimeSlot[];
}

export default function Schedule() {
  const currentUser = mockAuth.currentUser;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewType, setViewType] = useState<'week' | 'day'>('week');
  
  // Mock schedule data
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const baseSlots = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
    ];
    
    baseSlots.forEach((time, index) => {
      // Mock some appointments
      const hasAppointment = Math.random() < 0.3;
      slots.push({
        time,
        available: !hasAppointment,
        appointmentId: hasAppointment ? `apt-${index}` : undefined,
        patientName: hasAppointment ? mockPatients[index % mockPatients.length]?.name : undefined,
        type: hasAppointment ? ['consultation', 'follow-up', 'prescription-review'][index % 3] as 'consultation' | 'follow-up' | 'prescription-review' : undefined
      });
    });
    
    return slots;
  };

  const getWeekDays = (startDate: Date) => {
    const days: DaySchedule[] = [];
    const start = new Date(startDate);
    start.setDate(start.getDate() - start.getDay()); // Start from Sunday
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      days.push({
        date,
        slots: generateTimeSlots()
      });
    }
    
    return days;
  };

  const weekDays = getWeekDays(selectedDate);
  const today = new Date();
  
  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + (direction === 'next' ? 7 : -7));
    setSelectedDate(newDate);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const isPastDate = (date: Date) => {
    return date < today;
  };

  const handleBookSlot = (date: Date, time: string) => {
    // In real app, would open booking modal
    alert(`Booking appointment for ${formatDate(date)} at ${time}`);
  };

  const handleJoinCall = () => {
    // In real app, would join video call
    window.location.href = '/video-call';
  };

  if (!currentUser) {
    return <Layout><div>Please log in to view schedule.</div></Layout>;
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <Calendar className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {currentUser.role === 'provider' ? 'My Schedule' : 'Book Appointment'}
              </h1>
              <p className="text-sm text-gray-500">
                {currentUser.role === 'provider' 
                  ? 'Manage your appointments and availability'
                  : 'Schedule a consultation with your provider'
                }
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant={viewType === 'week' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setViewType('week')}
            >
              Week
            </Button>
            <Button
              variant={viewType === 'day' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setViewType('day')}
            >
              Day
            </Button>
            {currentUser.role === 'provider' && (
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Block Time
              </Button>
            )}
          </div>
        </div>

        {/* Calendar Navigation */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={() => navigateWeek('prev')}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous Week
              </Button>
              
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  {selectedDate.toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </h2>
                <p className="text-sm text-gray-500">
                  Week of {formatDate(weekDays[0].date)}
                </p>
              </div>
              
              <Button variant="ghost" size="sm" onClick={() => navigateWeek('next')}>
                Next Week
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Schedule */}
        <Card>
          <CardContent className="p-0">
            <div className="grid grid-cols-8 divide-x divide-gray-200">
              {/* Time column */}
              <div className="p-4 bg-gray-50">
                <div className="h-12 flex items-center">
                  <span className="text-sm font-medium text-gray-500">Time</span>
                </div>
                {generateTimeSlots().map((slot, index) => (
                  <div key={index} className="h-16 flex items-center border-t border-gray-100">
                    <span className="text-xs text-gray-500">{slot.time}</span>
                  </div>
                ))}
              </div>

              {/* Days columns */}
              {weekDays.map((day, dayIndex) => (
                <div key={dayIndex} className="min-h-full">
                  {/* Day header */}
                  <div className={`p-4 text-center border-b border-gray-200 ${
                    isToday(day.date) ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50'
                  }`}>
                    <div className={`text-sm font-medium ${
                      isToday(day.date) ? 'text-indigo-700' : 'text-gray-900'
                    }`}>
                      {formatDate(day.date)}
                    </div>
                    {isToday(day.date) && (
                      <div className="text-xs text-indigo-600 font-medium">Today</div>
                    )}
                  </div>

                  {/* Time slots */}
                  <div className="divide-y divide-gray-100">
                    {day.slots.map((slot, slotIndex) => (
                      <div key={slotIndex} className="h-16 p-2">
                        {slot.available ? (
                          <button
                            onClick={() => handleBookSlot(day.date, slot.time)}
                            disabled={isPastDate(day.date)}
                            className={`w-full h-full rounded border-2 border-dashed text-xs font-medium transition-colors ${
                              isPastDate(day.date)
                                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                                : 'border-emerald-200 text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50'
                            }`}
                          >
                            {isPastDate(day.date) ? 'Past' : 'Available'}
                          </button>
                        ) : (
                          <div className="w-full h-full bg-blue-100 rounded p-2 border border-blue-200">
                            <div className="text-xs font-medium text-blue-800 truncate">
                              {slot.patientName}
                            </div>
                            <div className="text-xs text-blue-600 capitalize">
                              {slot.type?.replace('-', ' ')}
                            </div>
                            {currentUser.role === 'provider' && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="mt-1 h-5 px-1 text-xs text-blue-600 hover:text-blue-800"
                                onClick={() => handleJoinCall()}
                              >
                                <Video className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Appointments Summary */}
        {currentUser.role === 'provider' && (
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Today&apos;s Appointments</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {weekDays
                .find(day => isToday(day.date))
                ?.slots.filter(slot => !slot.available)
                .map((appointment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{appointment.patientName}</p>
                        <p className="text-sm text-gray-500 capitalize">
                          {appointment.type?.replace('-', ' ')} • {appointment.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button size="sm" onClick={() => handleJoinCall()}>
                        <Video className="h-4 w-4 mr-1" />
                        Join Call
                      </Button>
                    </div>
                  </div>
                )) || <p className="text-gray-500">No appointments scheduled for today.</p>}
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}