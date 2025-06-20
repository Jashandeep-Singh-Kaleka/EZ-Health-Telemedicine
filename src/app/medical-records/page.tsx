'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { mockAuth, mockRequests } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { 
  FileText, 
  Download, 
  Eye, 
  User,
  Activity,
  Pill,
  Search,
  Filter
} from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

export default function MedicalRecords() {
  const currentUser = mockAuth.currentUser;
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'visits' | 'prescriptions' | 'tests' | 'documents'>('all');

  if (!currentUser || currentUser.role !== 'patient') {
    return null;
  }

  // Get patient's medical history from completed requests
  const medicalHistory = mockRequests
    .filter(request => request.patientId === currentUser.id && request.status === 'completed')
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  // Mock medical records data
  const medicalRecords = [
    // Medical Visits
    ...medicalHistory.map((request) => ({
      id: `visit-${request.id}`,
      type: 'visit' as const,
      title: `${request.specialty} - ${request.symptoms}`,
      date: request.updatedAt,
      provider: request.provider?.name || 'Dr. Unknown',
      status: 'completed',
      description: `Consultation for ${request.symptoms}. Treatment provided and follow-up scheduled.`,
      category: 'Medical Visit',
      documents: [`visit-summary-${request.id}.pdf`, `treatment-plan-${request.id}.pdf`]
    })),
    
    // Prescriptions
    {
      id: 'rx-001',
      type: 'prescription' as const,
      title: 'Lisinopril 10mg',
      date: new Date('2024-01-15'),
      provider: 'Dr. Smith',
      status: 'active',
      description: 'Blood pressure medication. Take once daily in the morning.',
      category: 'Prescription',
      refillsRemaining: 3,
      instructions: 'Take 1 tablet by mouth daily',
      quantity: '30 tablets'
    },
    {
      id: 'rx-002',
      type: 'prescription' as const,
      title: 'Metformin 500mg',
      date: new Date('2024-01-10'),
      provider: 'Dr. Johnson',
      status: 'active',
      description: 'Diabetes medication. Take twice daily with meals.',
      category: 'Prescription',
      refillsRemaining: 2,
      instructions: 'Take 1 tablet by mouth twice daily with food',
      quantity: '60 tablets'
    },
    
    // Test Results
    {
      id: 'test-001',
      type: 'test' as const,
      title: 'Complete Blood Count (CBC)',
      date: new Date('2024-01-12'),
      provider: 'Dr. Smith',
      status: 'normal',
      description: 'Blood test to check overall health and detect disorders.',
      category: 'Lab Test',
      results: {
        'White Blood Cells': '7.5 K/uL (Normal)',
        'Red Blood Cells': '4.8 M/uL (Normal)',
        'Hemoglobin': '14.2 g/dL (Normal)',
        'Hematocrit': '42% (Normal)'
      }
    },
    {
      id: 'test-002',
      type: 'test' as const,
      title: 'Lipid Panel',
      date: new Date('2024-01-08'),
      provider: 'Dr. Smith',
      status: 'attention',
      description: 'Cholesterol and triglyceride levels assessment.',
      category: 'Lab Test',
      results: {
        'Total Cholesterol': '245 mg/dL (High)',
        'LDL Cholesterol': '165 mg/dL (High)',
        'HDL Cholesterol': '45 mg/dL (Low)',
        'Triglycerides': '180 mg/dL (Borderline High)'
      }
    },
    
    // Documents
    {
      id: 'doc-001',
      type: 'document' as const,
      title: 'Annual Physical Exam Report',
      date: new Date('2024-01-01'),
      provider: 'Dr. Smith',
      status: 'completed',
      description: 'Comprehensive annual physical examination and health assessment.',
      category: 'Medical Report',
      fileSize: '2.1 MB',
      fileType: 'PDF'
    },
    {
      id: 'doc-002',
      type: 'document' as const,
      title: 'Vaccination Record',
      date: new Date('2023-12-15'),
      provider: 'EZ Health Clinic',
      status: 'completed',
      description: 'Complete vaccination history and immunization records.',
      category: 'Immunization',
      fileSize: '1.3 MB',
      fileType: 'PDF'
    }
  ];

  // Filter records
  const filteredRecords = medicalRecords.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'visits' && record.type === 'visit') ||
                         (filterType === 'prescriptions' && record.type === 'prescription') ||
                         (filterType === 'tests' && record.type === 'test') ||
                         (filterType === 'documents' && record.type === 'document');

    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string, type: string) => {
    if (type === 'test') {
      switch (status) {
        case 'normal':
          return 'text-green-600 bg-green-50';
        case 'attention':
          return 'text-yellow-600 bg-yellow-50';
        case 'abnormal':
          return 'text-red-600 bg-red-50';
        default:
          return 'text-gray-600 bg-gray-50';
      }
    }
    
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50';
      case 'completed':
        return 'text-blue-600 bg-blue-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'visit':
        return <User className="h-5 w-5" />;
      case 'prescription':
        return <Pill className="h-5 w-5" />;
      case 'test':
        return <Activity className="h-5 w-5" />;
      case 'document':
        return <FileText className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'visit':
        return 'text-blue-600 bg-blue-100';
      case 'prescription':
        return 'text-green-600 bg-green-100';
      case 'test':
        return 'text-purple-600 bg-purple-100';
      case 'document':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  // Statistics
  const stats = {
    totalRecords: medicalRecords.length,
    visits: medicalRecords.filter(r => r.type === 'visit').length,
    prescriptions: medicalRecords.filter(r => r.type === 'prescription').length,
    tests: medicalRecords.filter(r => r.type === 'test').length,
    documents: medicalRecords.filter(r => r.type === 'document').length
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
            <p className="text-gray-600">View and manage your complete medical history and documents.</p>
          </div>
          
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search medical records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as typeof filterType)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Records</option>
              <option value="visits">Medical Visits</option>
              <option value="prescriptions">Prescriptions</option>
              <option value="tests">Test Results</option>
              <option value="documents">Documents</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{stats.totalRecords}</div>
              <div className="text-sm text-gray-600">Total Records</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.visits}</div>
              <div className="text-sm text-gray-600">Visits</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.prescriptions}</div>
              <div className="text-sm text-gray-600">Prescriptions</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.tests}</div>
              <div className="text-sm text-gray-600">Test Results</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">{stats.documents}</div>
              <div className="text-sm text-gray-600">Documents</div>
            </CardContent>
          </Card>
        </div>

        {/* Records List */}
        <div className="space-y-4">
          {filteredRecords.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No records found</h3>
                <p className="text-gray-500">
                  {searchTerm || filterType !== 'all' 
                    ? "No records match your search criteria."
                    : "Your medical records will appear here as you receive care."}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredRecords.map((record) => (
              <Card key={record.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${getTypeColor(record.type)}`}>
                        {getTypeIcon(record.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{record.title}</h3>
                        <p className="text-sm text-gray-600 mb-1">{record.category}</p>
                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                          <span>{formatDateTime(record.date)}</span>
                          <span>Provider: {record.provider}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(record.status, record.type)}`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{record.description}</p>

                  {/* Prescription Details */}
                  {record.type === 'prescription' && 'refillsRemaining' in record && (
                    <div className="bg-green-50 p-3 rounded-lg mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Instructions:</span>
                          <p className="text-gray-600">{record.instructions}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Quantity:</span>
                          <p className="text-gray-600">{record.quantity}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Refills Remaining:</span>
                          <p className="text-gray-600">{record.refillsRemaining}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Test Results */}
                  {record.type === 'test' && 'results' in record && (
                    <div className="bg-gray-50 p-3 rounded-lg mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Test Results:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        {Object.entries(record.results).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-700">{key}:</span>
                            <span className={
                              value.includes('High') || value.includes('Low') || value.includes('Abnormal')
                                ? 'text-red-600 font-medium'
                                : 'text-gray-900'
                            }>
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Documents */}
                  {record.type === 'document' && 'fileSize' in record && (
                    <div className="bg-blue-50 p-3 rounded-lg mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-blue-600" />
                          <span className="text-gray-700">File Type: {record.fileType}</span>
                          <span className="text-gray-700">Size: {record.fileSize}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Visit Documents */}
                  {record.type === 'visit' && 'documents' in record && (
                    <div className="bg-blue-50 p-3 rounded-lg mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Related Documents:</h4>
                      <div className="flex flex-wrap gap-2">
                        {record.documents.map((doc, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            <FileText className="h-3 w-3 mr-1" />
                            {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    {record.type === 'prescription' && record.status === 'active' && (
                      <Button size="sm">
                        <Pill className="h-4 w-4 mr-1" />
                        Request Refill
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
} 