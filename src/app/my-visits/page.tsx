'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { mockAuth, mockRequests } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { 
  Calendar, 
  Clock, 
  User, 
  Video,
  MessageCircle,
  FileText,
  Pill,
  FlaskConical,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Eye
} from 'lucide-react';
import { formatDateTime, getStatusColor } from '@/lib/utils';

type TabType = 'upcoming' | 'completed' | 'records';

export default function MyVisits() {
  const currentUser = mockAuth.currentUser;
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');

  if (!currentUser) {
    return null;
  }

  // Get all requests for the patient
  const allRequests = mockRequests.filter(request => 
    request.patientId === currentUser.id
  );

  // Separate into categories
  const upcomingVisits = allRequests.filter(request => 
    ['pending', 'matched', 'accepted', 'in-progress'].includes(request.status)
  );

  const completedVisits = allRequests.filter(request => 
    request.status === 'completed'
  );

  // Mock medical records
  const medicalRecords = [
    {
      id: '1',
      date: new Date('2024-01-15'),
      type: 'Lab Results',
      title: 'Complete Blood Count',
      provider: 'Dr. Sarah Smith',
      status: 'Normal',
      hasFile: true
    },
    {
      id: '2', 
      date: new Date('2024-01-10'),
      type: 'Prescription',
      title: 'Lisinopril 10mg',
      provider: 'Dr. Sarah Smith',
      status: 'Active',
      hasFile: false
    },
    {
      id: '3',
      date: new Date('2024-01-05'),
      type: 'Visit Summary',
      title: 'Annual Physical Exam',
      provider: 'Dr. Sarah Smith',
      status: 'Completed',
      hasFile: true
    }
  ];

  const getRequestIcon = (type: string) => {
    switch (type) {
      case 'prescription-request':
        return <Pill className="h-5 w-5 text-blue-600" />;
      case 'lab-test-request':
        return <FlaskConical className="h-5 w-5 text-purple-600" />;
      case 'general-consultation':
        return <MessageCircle className="h-5 w-5 text-green-600" />;
      default:
        return <User className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-blue-600" />;
    }
  };

  const getTypeDisplayName = (type: string) => {
    switch (type) {
      case 'prescription-request':
        return 'Prescription Request';
      case 'lab-test-request':
        return 'Lab Test Request';
      case 'general-consultation':
        return 'General Consultation';
      default:
        return type;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Visits</h1>
          <p className="text-gray-600 mt-2">
            View your appointments, consultations, and medical records
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Upcoming Visits</p>
                  <p className="text-2xl font-bold text-gray-900">{upcomingVisits.length}</p>
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
                  <p className="text-sm font-medium text-gray-600">Completed Visits</p>
                  <p className="text-2xl font-bold text-gray-900">{completedVisits.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Medical Records</p>
                  <p className="text-2xl font-bold text-gray-900">{medicalRecords.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'upcoming'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Upcoming ({upcomingVisits.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'completed'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Completed ({completedVisits.length})
            </button>
            <button
              onClick={() => setActiveTab('records')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'records'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Medical Records ({medicalRecords.length})
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          {activeTab === 'upcoming' && (
            <>
              {upcomingVisits.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming visits</h3>
                    <p className="text-gray-500 mb-6">
                      Submit a request to start your healthcare journey with us.
                    </p>
                    <div className="flex justify-center space-x-4">
                      <Button onClick={() => window.location.href = '/prescription-request'}>
                        Request Prescription
                      </Button>
                      <Button variant="outline" onClick={() => window.location.href = '/lab-test-request'}>
                        Request Lab Tests
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                upcomingVisits.map((visit) => (
                  <Card key={visit.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="p-3 bg-gray-100 rounded-lg">
                            {getRequestIcon(visit.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {getTypeDisplayName(visit.type)}
                              </h3>
                              <div className="flex items-center space-x-1">
                                {getStatusIcon(visit.status)}
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(visit.status)}`}>
                                  {visit.status}
                                </span>
                              </div>
                            </div>
                            <p className="text-gray-600 mb-2">{visit.symptoms}</p>
                            <p className="text-sm text-gray-500 mb-3">{visit.description}</p>
                            <div className="flex items-center text-sm text-gray-500 space-x-4">
                              <span>Submitted: {formatDateTime(visit.createdAt)}</span>
                              {visit.provider && (
                                <span>Provider: {visit.provider.name}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          {visit.status === 'accepted' && (
                            <>
                              <Button size="sm">
                                <Video className="h-4 w-4 mr-1" />
                                Join Call
                              </Button>
                              <Button size="sm" variant="outline">
                                <MessageCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          {visit.status === 'pending' && (
                            <Button size="sm" variant="outline" disabled>
                              Awaiting Provider
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </>
          )}

          {activeTab === 'completed' && (
            <>
              {completedVisits.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <CheckCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No completed visits yet</h3>
                    <p className="text-gray-500">
                      Your completed visits will appear here.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                completedVisits.map((visit) => (
                  <Card key={visit.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="p-3 bg-green-100 rounded-lg">
                            {getRequestIcon(visit.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {getTypeDisplayName(visit.type)}
                              </h3>
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                Completed
                              </span>
                            </div>
                            <p className="text-gray-600 mb-2">{visit.symptoms}</p>
                            <div className="flex items-center text-sm text-gray-500 space-x-4">
                              <span>Completed: {formatDateTime(visit.updatedAt)}</span>
                              {visit.provider && (
                                <span>Provider: {visit.provider.name}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </>
          )}

          {activeTab === 'records' && (
            <>
              {medicalRecords.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No medical records</h3>
                    <p className="text-gray-500">
                      Your medical records and test results will appear here.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                medicalRecords.map((record) => (
                  <Card key={record.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="p-3 bg-purple-100 rounded-lg">
                            <FileText className="h-5 w-5 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="text-lg font-semibold text-gray-900">{record.title}</h3>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                record.status === 'Normal' ? 'bg-green-100 text-green-800' :
                                record.status === 'Active' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {record.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{record.type}</p>
                            <div className="flex items-center text-sm text-gray-500 space-x-4">
                              <span>Date: {formatDateTime(record.date)}</span>
                              <span>Provider: {record.provider}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          {record.hasFile && (
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}