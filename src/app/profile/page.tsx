'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { mockAuth } from '@/lib/mock-data';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Award,
  Shield,
  FileText,
  Edit,
  Save,
  X
} from 'lucide-react';
import { formatDate, getAgeFromDate } from '@/lib/utils';

export default function Profile() {
  const currentUser = mockAuth.currentUser;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(currentUser || {});

  if (!currentUser) {
    return null;
  }

  const handleSave = () => {
    // In a real app, this would make an API call to update the user
    Object.assign(currentUser, formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(currentUser);
    setIsEditing(false);
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            <p className="text-gray-600">Manage your account information and preferences.</p>
          </div>
          
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="h-24 w-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-12 w-12 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">{currentUser.name}</h2>
                <p className="text-sm text-gray-500 capitalize mb-2">{currentUser.role}</p>
                
                {currentUser.role === 'provider' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center text-sm text-gray-600">
                      <Award className="h-4 w-4 mr-1" />
                      Rating: {currentUser.rating}/5.0
                    </div>
                    <div className="flex items-center justify-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      {currentUser.yearsExperience} years experience
                    </div>
                  </div>
                )}
                
                {currentUser.role === 'patient' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      Age {getAgeFromDate(currentUser.dateOfBirth)}
                    </div>
                  </div>
                )}
                
                <div className="mt-4 text-xs text-gray-500">
                  Member since {formatDate(currentUser.createdAt)}
                </div>
              </CardContent>
            </Card>

            {/* Specialties (Provider) */}
            {currentUser.role === 'provider' && (
              <Card className="mt-6">
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Specialties</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {currentUser.specialties.map((specialty, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <Shield className="h-4 w-4 mr-2" />
                        {specialty}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <div className="flex items-center text-sm text-gray-900">
                        <User className="h-4 w-4 mr-2 text-gray-400" />
                        {currentUser.name}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.email || ''}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <div className="flex items-center text-sm text-gray-900">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        {currentUser.email}
                      </div>
                    )}
                  </div>

                  {currentUser.role === 'patient' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={formData.phone || ''}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <div className="flex items-center text-sm text-gray-900">
                            <Phone className="h-4 w-4 mr-2 text-gray-400" />
                            {currentUser.phone}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date of Birth
                        </label>
                        {isEditing ? (
                          <input
                            type="date"
                            value={formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString().split('T')[0] : ''}
                            onChange={(e) => handleChange('dateOfBirth', new Date(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <div className="flex items-center text-sm text-gray-900">
                            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                            {formatDate(currentUser.dateOfBirth)}
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Zip Code
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.zipCode || ''}
                        onChange={(e) => handleChange('zipCode', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <div className="flex items-center text-sm text-gray-900">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        {currentUser.zipCode}
                      </div>
                    )}
                  </div>

                  {currentUser.role === 'provider' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        License Number
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.licenseNumber || ''}
                          onChange={(e) => handleChange('licenseNumber', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <div className="flex items-center text-sm text-gray-900">
                          <FileText className="h-4 w-4 mr-2 text-gray-400" />
                          {currentUser.licenseNumber}
                        </div>
                      )}
                    </div>
                  )}

                  {currentUser.role === 'patient' && currentUser.insurance && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Insurance Provider
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.insurance || ''}
                          onChange={(e) => handleChange('insurance', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <div className="flex items-center text-sm text-gray-900">
                          <Shield className="h-4 w-4 mr-2 text-gray-400" />
                          {currentUser.insurance}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Provider-specific fields */}
                {currentUser.role === 'provider' && (
                  <div className="border-t pt-6">
                    <h4 className="text-md font-semibold text-gray-900 mb-4">Professional Information</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Years of Experience
                        </label>
                        {isEditing ? (
                          <input
                            type="number"
                            value={formData.yearsExperience || 0}
                            onChange={(e) => handleChange('yearsExperience', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <div className="text-sm text-gray-900">
                            {currentUser.yearsExperience} years
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Availability Status
                        </label>
                        {isEditing ? (
                          <select
                            value={formData.isAvailable ? 'available' : 'unavailable'}
                            onChange={(e) => handleChange('isAvailable', e.target.value === 'available')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                          </select>
                        ) : (
                          <div className="text-sm text-gray-900">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              currentUser.isAvailable 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {currentUser.isAvailable ? 'Available' : 'Unavailable'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Licensed States
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {currentUser.licenseStates.map((state, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            {state}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Accepted Insurance
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {currentUser.acceptedInsurance.map((insurance, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                            {insurance}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Patient Emergency Contact */}
                {currentUser.role === 'patient' && currentUser.emergencyContact && (
                  <div className="border-t pt-6">
                    <h4 className="text-md font-semibold text-gray-900 mb-4">Emergency Contact</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Name
                        </label>
                        <div className="text-sm text-gray-900">
                          {currentUser.emergencyContact.name}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone
                        </label>
                        <div className="text-sm text-gray-900">
                          {currentUser.emergencyContact.phone}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Relationship
                        </label>
                        <div className="text-sm text-gray-900">
                          {currentUser.emergencyContact.relationship}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
} 