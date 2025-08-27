'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare, Send } from 'lucide-react';
import Layout from '@/components/Layout';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { RequestFormData } from '@/lib/types';

const consultationTypes = [
  {
    id: 'general-question',
    title: 'General Health Question',
    description: 'Ask questions about your health, medications, or medical concerns',
    icon: '🩺'
  },
  {
    id: 'symptoms',
    title: 'Discuss Symptoms',
    description: 'Get professional advice about symptoms you are experiencing',
    icon: '🤒'
  },
  {
    id: 'medication',
    title: 'Medication Questions',
    description: 'Questions about your current medications or side effects',
    icon: '💊'
  },
  {
    id: 'follow-up',
    title: 'Follow-up Care',
    description: 'Follow up on previous treatments or test results',
    icon: '📋'
  },
  {
    id: 'wellness',
    title: 'Wellness & Prevention',
    description: 'Discuss preventive care, lifestyle changes, or wellness plans',
    icon: '🌟'
  },
  {
    id: 'urgent',
    title: 'Urgent Consultation',
    description: 'Need to speak with a provider about an urgent medical matter',
    icon: '🚨'
  }
];

export default function MessageProvider() {
  const router = useRouter();
  const [formData, setFormData] = useState<RequestFormData>({
    type: 'general-consultation',
    symptoms: '',
    description: '',
  });
  const [selectedConsultationType, setSelectedConsultationType] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real app, this would create the request
    console.log('Message provider request submitted:', {
      ...formData,
      consultationType: selectedConsultationType
    });
    
    // Navigate to visits page
    router.push('/my-visits');
    setIsLoading(false);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <MessageSquare className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Message Provider</h1>
              <p className="text-gray-600">Connect with a healthcare provider for consultation</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Consultation Type */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">What type of consultation do you need?</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {consultationTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedConsultationType(type.id)}
                    className={`p-4 border rounded-lg text-left transition-all ${
                      selectedConsultationType === type.id
                        ? 'border-green-500 bg-green-50 text-green-900'
                        : 'border-gray-300 hover:border-green-300 hover:bg-green-50'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="text-2xl mr-3">{type.icon}</div>
                      <div>
                        <div className="font-medium text-gray-900">{type.title}</div>
                        <div className="text-sm text-gray-600 mt-1">{type.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Message Details */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Describe your concern</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-2">
                  What's the main reason for your consultation?
                </label>
                <input
                  id="symptoms"
                  type="text"
                  required
                  value={formData.symptoms}
                  onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
                  placeholder="e.g., Questions about medication side effects, chest pain concerns, wellness advice..."
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Please provide detailed information
                </label>
                <textarea
                  id="description"
                  required
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
                  placeholder="Please describe your symptoms, concerns, or questions in detail. Include:&#10;&#10;• When did the symptoms start?&#10;• How severe are they?&#10;• What makes them better or worse?&#10;• Any medications you're currently taking&#10;• Any relevant medical history&#10;&#10;The more details you provide, the better we can help you."
                />
                <div className="text-sm text-gray-500 mt-2">
                  Be as specific as possible to help your provider give you the best advice.
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Priority Level */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">How urgent is this consultation?</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="priority"
                    value="routine"
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                    defaultChecked
                  />
                  <div>
                    <div className="font-medium text-gray-900">Routine (24-48 hours)</div>
                    <div className="text-sm text-gray-600">General questions, non-urgent concerns</div>
                  </div>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="priority"
                    value="priority"
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500"
                  />
                  <div>
                    <div className="font-medium text-gray-900">Priority (4-12 hours)</div>
                    <div className="text-sm text-gray-600">Concerning symptoms, medication issues</div>
                  </div>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="priority"
                    value="urgent"
                    className="h-4 w-4 text-red-600 focus:ring-red-500"
                  />
                  <div>
                    <div className="font-medium text-gray-900">Urgent (1-4 hours)</div>
                    <div className="text-sm text-gray-600">Severe symptoms requiring prompt attention</div>
                  </div>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Notice */}
          <Card>
            <CardContent>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-medium text-red-900 mb-2">⚠️ Medical Emergency</h4>
                <p className="text-sm text-red-800">
                  If you are experiencing a medical emergency (chest pain, difficulty breathing, severe bleeding, etc.), 
                  please call 911 immediately or go to your nearest emergency room. This platform is not for emergency situations.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isLoading}
              disabled={!selectedConsultationType || !formData.symptoms || !formData.description}
              className="px-8 flex items-center"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Message to Provider
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}