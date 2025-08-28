'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { 
  Bell, 
  Check, 
  X, 
  Clock, 
  AlertCircle, 
  Calendar, 
  MessageSquare,
  Pill,
  FileText,
  Settings,
  Filter
} from 'lucide-react';
import { mockAuth } from '@/lib/mock-data';

interface Notification {
  id: string;
  type: 'appointment' | 'message' | 'prescription' | 'system' | 'request' | 'payment';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
  actionLabel?: string;
}

export default function Notifications() {
  const currentUser = mockAuth.currentUser;
  const [filter, setFilter] = useState<'all' | 'unread' | 'appointment' | 'message' | 'prescription'>('all');

  // Mock notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'appointment',
      title: 'Upcoming Appointment',
      message: 'You have an appointment with Dr. Sarah Smith in 30 minutes',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      isRead: false,
      priority: 'high',
      actionUrl: '/video-call',
      actionLabel: 'Join Call'
    },
    {
      id: '2',
      type: 'prescription',
      title: 'Prescription Ready',
      message: 'Your prescription for Amoxicillin is ready for pickup at CVS Pharmacy',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'message',
      title: 'New Message',
      message: 'Dr. Johnson sent you a message about your lab results',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      isRead: true,
      priority: 'medium',
      actionUrl: '/message-provider',
      actionLabel: 'View Message'
    },
    {
      id: '4',
      type: 'request',
      title: 'Request Update',
      message: 'Your prescription request has been approved and sent to pharmacy',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      isRead: true,
      priority: 'low'
    },
    {
      id: '5',
      type: 'system',
      title: 'Account Update',
      message: 'Your profile information has been successfully updated',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      isRead: true,
      priority: 'low'
    },
    {
      id: '6',
      type: 'payment',
      title: 'Payment Processed',
      message: 'Payment of $65.00 has been successfully processed for your consultation',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      isRead: true,
      priority: 'low'
    }
  ]);

  const getNotificationIcon = (type: string, priority: string) => {
    const iconClass = priority === 'high' ? 'text-red-500' : priority === 'medium' ? 'text-yellow-500' : 'text-gray-500';
    
    switch (type) {
      case 'appointment':
        return <Calendar className={`h-5 w-5 ${iconClass}`} />;
      case 'message':
        return <MessageSquare className={`h-5 w-5 ${iconClass}`} />;
      case 'prescription':
        return <Pill className={`h-5 w-5 ${iconClass}`} />;
      case 'request':
        return <FileText className={`h-5 w-5 ${iconClass}`} />;
      case 'system':
        return <Settings className={`h-5 w-5 ${iconClass}`} />;
      case 'payment':
        return <AlertCircle className={`h-5 w-5 ${iconClass}`} />;
      default:
        return <Bell className={`h-5 w-5 ${iconClass}`} />;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    
    if (diff < 60 * 1000) return 'Just now';
    if (diff < 60 * 60 * 1000) return `${Math.floor(diff / (60 * 1000))} minutes ago`;
    if (diff < 24 * 60 * 60 * 1000) return `${Math.floor(diff / (60 * 60 * 1000))} hours ago`;
    if (diff < 7 * 24 * 60 * 60 * 1000) return `${Math.floor(diff / (24 * 60 * 60 * 1000))} days ago`;
    
    return timestamp.toLocaleDateString();
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.isRead;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (!currentUser) {
    return <Layout><div>Please log in to view notifications.</div></Layout>;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Bell className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
              <p className="text-sm text-gray-500">
                {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
              </p>
            </div>
          </div>
          
          {unreadCount > 0 && (
            <Button onClick={markAllAsRead} variant="outline" size="sm">
              <Check className="h-4 w-4 mr-2" />
              Mark all as read
            </Button>
          )}
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 flex-wrap gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter:</span>
              {[
                { key: 'all', label: 'All', count: notifications.length },
                { key: 'unread', label: 'Unread', count: unreadCount },
                { key: 'appointment', label: 'Appointments', count: notifications.filter(n => n.type === 'appointment').length },
                { key: 'message', label: 'Messages', count: notifications.filter(n => n.type === 'message').length },
                { key: 'prescription', label: 'Prescriptions', count: notifications.filter(n => n.type === 'prescription').length }
              ].map(({ key, label, count }) => (
                <Button
                  key={key}
                  variant={filter === key ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(key as typeof filter)}
                  className="text-xs"
                >
                  {label} {count > 0 && `(${count})`}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No notifications found</p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map(notification => (
              <Card key={notification.id} className={`transition-all duration-200 hover:shadow-md ${
                !notification.isRead ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : 'border-l-4 border-l-transparent'
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type, notification.priority)}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className={`text-sm font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                              {notification.title}
                            </h3>
                            {!notification.isRead && (
                              <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-xs text-gray-500 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            {notification.priority === 'high' && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Urgent
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          {notification.actionUrl && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.location.href = notification.actionUrl!}
                            >
                              {notification.actionLabel || 'View'}
                            </Button>
                          )}
                          {!notification.isRead && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Notification Settings</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Email Notifications</p>
                <p className="text-xs text-gray-500">Receive notifications via email</p>
              </div>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">SMS Notifications</p>
                <p className="text-xs text-gray-500">Receive urgent notifications via SMS</p>
              </div>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Push Notifications</p>
                <p className="text-xs text-gray-500">Browser push notifications</p>
              </div>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}