'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FlaskConical, CheckCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { RequestFormData } from '@/lib/types';

const commonLabTests = [
  'Complete Blood Count (CBC)',
  'Comprehensive Metabolic Panel',
  'Lipid Profile',
  'Thyroid Function Tests (TSH, T3, T4)',
  'Hemoglobin A1C',
  'Liver Function Tests',
  'Kidney Function Tests',
  'Vitamin D Level',
  'Vitamin B12',
  'Iron Studies',
  'Inflammatory Markers (ESR, CRP)',
  'Urinalysis',
  'Cholesterol Panel',
  'Blood Glucose',
  'PSA (Prostate Specific Antigen)',
];

export default function LabTestRequest() {
  const router = useRouter();
  const [formData, setFormData] = useState<RequestFormData>({
    type: 'lab-test-request',
    symptoms: '',
    description: '',
  });
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleTestToggle = (test: string) => {
    setSelectedTests(prev => 
      prev.includes(test) 
        ? prev.filter(t => t !== test)
        : [...prev, test]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real app, this would create the request
    console.log('Lab test request submitted:', {
      ...formData,
      selectedTests
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
            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
              <FlaskConical className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Lab Test Request</h1>
              <p className="text-gray-600">Request laboratory tests from your healthcare provider</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Test Selection */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Select Lab Tests</h3>
              <p className="text-sm text-gray-600">Choose the lab tests you need</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {commonLabTests.map((test) => (
                  <button
                    key={test}
                    type="button"
                    onClick={() => handleTestToggle(test)}
                    className={`p-3 border rounded-lg text-left transition-all flex items-center ${
                      selectedTests.includes(test)
                        ? 'border-purple-500 bg-purple-50 text-purple-900'
                        : 'border-gray-300 hover:border-purple-300 hover:bg-purple-50'
                    }`}
                  >
                    <div className={`mr-3 h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                      selectedTests.includes(test)
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedTests.includes(test) && (
                        <CheckCircle className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <span className="text-sm">{test}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reason for Tests */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Reason for Testing</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-2">
                  What symptoms or concerns do you have?
                </label>
                <input
                  id="symptoms"
                  type="text"
                  required
                  value={formData.symptoms}
                  onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
                  placeholder="e.g., Fatigue, routine checkup, monitoring condition..."
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional details
                </label>
                <textarea
                  id="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
                  placeholder="Please provide more context about why you need these tests, any symptoms you're experiencing, or your medical history relevant to these tests..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Information Notice */}
          <Card>
            <CardContent>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Important Information</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Lab tests require a provider's order before they can be processed</li>
                  <li>• You will receive instructions on where to get your tests done</li>
                  <li>• Fasting may be required for certain tests - you'll be notified if needed</li>
                  <li>• Results will be available in your patient portal once completed</li>
                </ul>
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
              disabled={selectedTests.length === 0 || !formData.symptoms || !formData.description}
              className="px-8"
            >
              Submit Lab Test Request
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}