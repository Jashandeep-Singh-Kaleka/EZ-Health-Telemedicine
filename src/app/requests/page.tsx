'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { mockAuth, mockRequests, mockProviders } from '@/lib/mock-data';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { 
  Bell, 
  MapPin, 
  Clock, 
  User, 
  AlertCircle,
  CheckCircle,
  X,
  Filter
} from 'lucide-react';
import { formatDateTime, getUrgencyColor, getAgeFromDate, matchProvidersToRequest } from '@/lib/utils';
import { MedicalRequest } from '@/lib/types';

export default function Requests() {
  const currentUser = mockAuth.currentUser;
  const [filter, setFilter] = useState<'all' | 'pending' | 'matched'>('pending');
  const [acceptingRequest, setAcceptingRequest] = useState<string | null>(null);

  if (!currentUser || currentUser.role !== 'provider') {
    return null;
  }

  // Get all requests that could be matched to this provider
  const allRequests = mockRequests.filter(request => {
    // Filter based on specialty match and other criteria
    const hasMatchingSpecialty = currentUser.specialties.some(specialty =>
      specialty.toLowerCase().includes(request.specialty.toLowerCase()) ||
      request.specialty.toLowerCase().includes(specialty.toLowerCase())
    );
    
    const acceptsInsurance = !request.insurance || currentUser.acceptedInsurance.includes(request.insurance);
    
    return hasMatchingSpecialty && acceptsInsurance;
  });

  const filteredRequests = allRequests.filter(request => {
    if (filter === 'pending') return request.status === 'pending';
    if (filter === 'matched') return request.status === 'matched' && !request.providerId;
    return true;
  });

  const handleAcceptRequest = async (requestId: string) => {
    setAcceptingRequest(requestId);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update request status (in a real app, this would be an API call)
    const request = mockRequests.find(r => r.id === requestId);
    if (request) {
      request.status = 'accepted';
      request.providerId = currentUser.id;
      request.provider = currentUser;
      request.updatedAt = new Date();
    }
    
    setAcceptingRequest(null);
  };

  const getMatchQuality = (request: MedicalRequest) => {
    const matches = matchProvidersToRequest([currentUser], request);
    if (matches.length === 0) return 'No Match';
    
    // Simple scoring based on specialty match and distance
    const hasExactSpecialty = currentUser.specialties.includes(request.specialty);
    const zipDistance = Math.abs(parseInt(currentUser.zipCode) - parseInt(request.zipCode));
    
    if (hasExactSpecialty && zipDistance < 10) return 'Perfect Match';
    if (hasExactSpecialty || zipDistance < 20) return 'Good Match';
    return 'Possible Match';
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Patient Requests</h1>
            <p className="text-gray-600">Review and accept patient requests in your specialty area.</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="pending">Pending Requests</option>
              <option value="matched">Matched to Me</option>
              <option value="all">All Requests</option>
            </select>
          </div>
        </div>

        {/* Request Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Bell className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {allRequests.filter(r => r.status === 'pending').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Matched</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {allRequests.filter(r => r.status === 'matched').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">My Patients</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {mockRequests.filter(r => r.providerId === currentUser.id).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Bell className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
                <p className="text-gray-500">
                  {filter === 'pending' 
                    ? "There are no pending requests in your specialty area right now."
                    : "No requests match your current filter."}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredRequests.map((request) => {
              const matchQuality = getMatchQuality(request);
              const patientAge = getAgeFromDate(request.patient.dateOfBirth);
              
              return (
                <Card key={request.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {request.patient.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Age {patientAge} • {request.patient.insurance || 'No insurance'}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getUrgencyColor(request.urgency)}`}>
                              {request.urgency} priority
                            </span>
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700">
                              {matchQuality}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium text-gray-700">Specialty</p>
                            <p className="text-sm text-gray-600">{request.specialty}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Type</p>
                            <p className="text-sm text-gray-600 capitalize">{request.type.replace('-', ' ')}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Location</p>
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="h-3 w-3 mr-1" />
                              Zip {request.zipCode}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Requested</p>
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatDateTime(request.createdAt)}
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-1">Symptoms</p>
                          <p className="text-sm text-gray-600 font-medium">{request.symptoms}</p>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-1">Description</p>
                          <p className="text-sm text-gray-600">{request.description}</p>
                        </div>

                        {request.preferredDateTime && (
                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-1">Preferred Time</p>
                            <p className="text-sm text-gray-600">
                              {formatDateTime(request.preferredDateTime)}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="ml-6 flex flex-col space-y-2">
                        {request.status === 'pending' && (
                          <Button
                            onClick={() => handleAcceptRequest(request.id)}
                            loading={acceptingRequest === request.id}
                            className="whitespace-nowrap"
                          >
                            Accept Request
                          </Button>
                        )}
                        
                        {request.status === 'matched' && request.providerId === currentUser.id && (
                          <div className="flex items-center text-green-600 text-sm font-medium">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Accepted
                          </div>
                        )}
                        
                        {request.urgency === 'urgent' && (
                          <div className="flex items-center text-red-600 text-xs">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Urgent - Immediate attention needed
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </Layout>
  );
} 