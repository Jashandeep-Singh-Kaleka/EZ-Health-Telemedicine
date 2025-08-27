'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { mockAuth } from '@/lib/mock-data';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  Edit3,
  Save,
  X,
  UserCheck,
  Heart,
  Shield
} from 'lucide-react';

interface EditableField {
  field: string;
  isEditing: boolean;
}

export default function MyInformation() {
  const currentUser = mockAuth.currentUser;
  const [editableField, setEditableField] = useState<EditableField>({ field: '', isEditing: false });
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: (currentUser as any)?.phone || '',
    zipCode: (currentUser as any)?.zipCode || '',
    emergencyContactName: (currentUser as any)?.emergencyContact?.name || '',
    emergencyContactPhone: (currentUser as any)?.emergencyContact?.phone || '',
    emergencyContactRelationship: (currentUser as any)?.emergencyContact?.relationship || '',
  });

  if (!currentUser || currentUser.role !== 'patient') {
    return null;
  }

  const patient = currentUser as any;

  const handleEdit = (field: string) => {
    setEditableField({ field, isEditing: true });
  };

  const handleSave = (field: string) => {
    // In a real app, this would save to the backend
    console.log('Saving field:', field, 'Value:', formData[field as keyof typeof formData]);
    setEditableField({ field: '', isEditing: false });
  };

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: patient?.phone || '',
      zipCode: patient?.zipCode || '',
      emergencyContactName: patient?.emergencyContact?.name || '',
      emergencyContactPhone: patient?.emergencyContact?.phone || '',
      emergencyContactRelationship: patient?.emergencyContact?.relationship || '',
    });
    setEditableField({ field: '', isEditing: false });
  };

  const isEditing = (field: string) => editableField.field === field && editableField.isEditing;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const EditableField = ({ 
    field, 
    label, 
    value, 
    type = 'text',
    icon 
  }: { 
    field: string; 
    label: string; 
    value: string; 
    type?: string;
    icon: React.ReactNode;
  }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <div className="p-2 bg-blue-100 rounded-lg">
              {icon}
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-600">{label}</label>
              {isEditing(field) ? (
                <div className="mt-1">
                  <input
                    type={type}
                    value={formData[field as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    autoFocus
                  />
                </div>
              ) : (
                <p className="mt-1 text-lg text-gray-900">{value || 'Not provided'}</p>
              )}
            </div>
          </div>
          <div className="flex space-x-2 ml-4">
            {isEditing(field) ? (
              <>
                <Button 
                  size="sm" 
                  onClick={() => handleSave(field)}
                  className="p-2"
                >
                  <Save className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleCancel}
                  className="p-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => handleEdit(field)}
                className="p-2"
              >
                <Edit3 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Information</h1>
          <p className="text-gray-600 mt-2">
            Manage your personal information and emergency contacts
          </p>
        </div>

        {/* Profile Overview */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-8">
            <div className="flex items-center space-x-6">
              <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{currentUser.name}</h2>
                <p className="text-blue-600 font-medium capitalize">{currentUser.role} Portal</p>
                <div className="flex items-center mt-2 space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Age: {calculateAge(patient.dateOfBirth)}</span>
                  </div>
                  <div className="flex items-center">
                    <UserCheck className="h-4 w-4 mr-1" />
                    <span>Member since {formatDate(currentUser.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="space-y-4">
              <EditableField
                field="name"
                label="Full Name"
                value={formData.name}
                icon={<User className="h-5 w-5 text-blue-600" />}
              />
              
              <EditableField
                field="email"
                label="Email Address"
                value={formData.email}
                type="email"
                icon={<Mail className="h-5 w-5 text-blue-600" />}
              />
              
              <EditableField
                field="phone"
                label="Phone Number"
                value={formData.phone}
                type="tel"
                icon={<Phone className="h-5 w-5 text-blue-600" />}
              />
              
              <EditableField
                field="zipCode"
                label="ZIP Code"
                value={formData.zipCode}
                icon={<MapPin className="h-5 w-5 text-blue-600" />}
              />

              {/* Non-editable fields */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Calendar className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Date of Birth</label>
                      <p className="mt-1 text-lg text-gray-900">{formatDate(patient.dateOfBirth)}</p>
                      <p className="text-xs text-gray-500 mt-1">Contact support to update this information</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Emergency Contact</h3>
            <div className="space-y-4">
              <EditableField
                field="emergencyContactName"
                label="Emergency Contact Name"
                value={formData.emergencyContactName}
                icon={<UserCheck className="h-5 w-5 text-red-600" />}
              />
              
              <EditableField
                field="emergencyContactPhone"
                label="Emergency Contact Phone"
                value={formData.emergencyContactPhone}
                type="tel"
                icon={<Phone className="h-5 w-5 text-red-600" />}
              />
              
              <EditableField
                field="emergencyContactRelationship"
                label="Relationship"
                value={formData.emergencyContactRelationship}
                icon={<Heart className="h-5 w-5 text-red-600" />}
              />
            </div>
          </div>

          {/* Account Security */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Account Security</h3>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Shield className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Password</label>
                      <p className="mt-1 text-lg text-gray-900">••••••••</p>
                      <p className="text-xs text-gray-500 mt-1">Last updated 3 months ago</p>
                    </div>
                  </div>
                  <Button variant="outline">
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Privacy Notice */}
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-gray-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Privacy & Security</h4>
                  <p className="text-sm text-gray-600">
                    Your personal information is encrypted and secure. We never share your data with third parties 
                    without your explicit consent. All medical communications are HIPAA compliant and protected.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}