'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import { mockAuth, mockRequests, specialties, insuranceProviders } from '@/lib/mock-data';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Heart, AlertCircle } from 'lucide-react';
import { generateId } from '@/lib/utils';
import { RequestFormData } from '@/lib/types';

export default function RequestCare() {
  const router = useRouter();
  const currentUser = mockAuth.currentUser;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<RequestFormData>({
    type: 'consultation',
    specialty: '',
    symptoms: '',
    description: '',
    urgency: 'medium',
    preferredDateTime: undefined,
    insurance: '',
  });

  if (!currentUser || currentUser.role !== 'patient') {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create new request
    const newRequest = {
      id: generateId(),
      patientId: currentUser.id,
      patient: currentUser,
      type: formData.type,
      specialty: formData.specialty,
      symptoms: formData.symptoms,
      description: formData.description,
      urgency: formData.urgency,
      preferredDateTime: formData.preferredDateTime,
      status: 'pending' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
      zipCode: currentUser.zipCode,
      insurance: formData.insurance || currentUser.insurance,
    };

    // Add to mock requests (in a real app, this would be an API call)
    mockRequests.push(newRequest);

    setIsSubmitting(false);
    router.push('/dashboard?success=request-submitted');
  };

  const handleInputChange = (field: keyof RequestFormData, value: string | Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Request Medical Care</h1>
          <p className="text-gray-600">Tell us about your medical needs and we&apos;ll connect you with the right provider.</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Heart className="h-6 w-6 text-red-500 mr-2" />
              <h2 className="text-lg font-semibold">Medical Request Form</h2>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Request Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type of Care
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'consultation', label: 'General Consultation', icon: '🩺' },
                    { value: 'prescription', label: 'Prescription Refill', icon: '💊' },
                    { value: 'follow-up', label: 'Follow-up Visit', icon: '📋' },
                    { value: 'urgent-care', label: 'Urgent Care', icon: '🚨' },
                  ].map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => handleInputChange('type', type.value)}
                      className={`p-3 border rounded-lg text-left transition-colors ${
                        formData.type === type.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="text-lg mb-1">{type.icon}</div>
                      <div className="text-sm font-medium">{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Specialty */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medical Specialty
                </label>
                <select
                  value={formData.specialty}
                  onChange={(e) => handleInputChange('specialty', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a specialty</option>
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Symptoms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Symptoms
                </label>
                <input
                  type="text"
                  value={formData.symptoms}
                  onChange={(e) => handleInputChange('symptoms', e.target.value)}
                  required
                  placeholder="e.g., Headache, fever, chest pain"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  required
                  rows={4}
                  placeholder="Please describe your symptoms, how long you've had them, and any relevant medical history..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Urgency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Urgency Level
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { value: 'low', label: 'Low', color: 'green', icon: '😌' },
                    { value: 'medium', label: 'Medium', color: 'yellow', icon: '😐' },
                    { value: 'high', label: 'High', color: 'orange', icon: '😰' },
                    { value: 'urgent', label: 'Urgent', color: 'red', icon: '🚨' },
                  ].map((urgency) => (
                    <button
                      key={urgency.value}
                      type="button"
                      onClick={() => handleInputChange('urgency', urgency.value)}
                      className={`p-2 border rounded-lg text-center transition-colors ${
                        formData.urgency === urgency.value
                          ? `border-${urgency.color}-500 bg-${urgency.color}-50 text-${urgency.color}-700`
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="text-lg">{urgency.icon}</div>
                      <div className="text-xs font-medium">{urgency.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Date/Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date & Time (Optional)
                </label>
                <input
                  type="datetime-local"
                  value={formData.preferredDateTime ? formData.preferredDateTime.toISOString().slice(0, 16) : ''}
                  onChange={(e) => handleInputChange('preferredDateTime', e.target.value ? new Date(e.target.value) : undefined)}
                  min={new Date().toISOString().slice(0, 16)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Insurance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Insurance Provider (Optional)
                </label>
                <select
                  value={formData.insurance || ''}
                  onChange={(e) => handleInputChange('insurance', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select insurance (optional)</option>
                  {insuranceProviders.map((provider) => (
                    <option key={provider} value={provider}>
                      {provider}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center text-sm text-gray-500">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Your request will be matched with available providers
                </div>
                <Button type="submit" loading={isSubmitting} size="lg">
                  {isSubmitting ? 'Submitting Request...' : 'Submit Request'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
} 