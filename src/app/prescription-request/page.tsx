'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pill, MapPin } from 'lucide-react';
import Layout from '@/components/Layout';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { RequestFormData } from '@/lib/types';
import { pharmacyChains } from '@/lib/mock-data';

export default function PrescriptionRequest() {
  const router = useRouter();
  const [formData, setFormData] = useState<RequestFormData>({
    type: 'prescription-request',
    symptoms: '',
    description: '',
    pharmacy: {
      name: '',
      address: '',
      phone: ''
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real app, this would create the request
    console.log('Prescription request submitted:', formData);
    
    // Navigate to visits page
    router.push('/my-visits');
    setIsLoading(false);
  };

  const handlePharmacySelect = (pharmacyName: string) => {
    setFormData({
      ...formData,
      pharmacy: {
        ...formData.pharmacy!,
        name: pharmacyName,
        // In a real app, you'd look up the address and phone
        address: '123 Main St, New York, NY 10001',
        phone: '(555) 123-0000'
      }
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <Pill className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Prescription Request</h1>
              <p className="text-gray-600">Request a prescription from your healthcare provider</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Symptoms & Description */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Tell us about your symptoms</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-2">
                  What symptoms are you experiencing?
                </label>
                <input
                  id="symptoms"
                  type="text"
                  required
                  value={formData.symptoms}
                  onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                  placeholder="e.g., Skin rash, headache, cough..."
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Please provide more details
                </label>
                <textarea
                  id="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                  placeholder="Please describe your symptoms in detail, how long you've had them, and what prescription you're looking for..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Pharmacy Information */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Choose Your Pharmacy
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pharmacyChains.map((pharmacy) => (
                  <button
                    key={pharmacy}
                    type="button"
                    onClick={() => handlePharmacySelect(pharmacy)}
                    className={`p-4 border rounded-lg text-left transition-all ${
                      formData.pharmacy?.name === pharmacy
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <div className="font-medium">{pharmacy}</div>
                    <div className="text-sm text-gray-500">123 Main St, New York, NY</div>
                  </button>
                ))}
              </div>

              {/* Custom Pharmacy Option */}
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Or enter custom pharmacy information:</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Pharmacy name"
                    value={formData.pharmacy?.name === 'Custom' ? formData.pharmacy.name : ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      pharmacy: {
                        name: e.target.value ? 'Custom' : '',
                        address: formData.pharmacy?.address || '',
                        phone: formData.pharmacy?.phone || ''
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={formData.pharmacy?.address || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      pharmacy: {
                        ...formData.pharmacy!,
                        address: e.target.value
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={formData.pharmacy?.phone || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      pharmacy: {
                        ...formData.pharmacy!,
                        phone: e.target.value
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
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
              disabled={!formData.symptoms || !formData.description || !formData.pharmacy?.name}
              className="px-8"
            >
              Submit Prescription Request
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}