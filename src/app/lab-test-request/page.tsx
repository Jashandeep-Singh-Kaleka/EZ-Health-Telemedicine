'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FlaskConical, CheckCircle, CreditCard, Lock } from 'lucide-react';
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

type StepType = 'tests' | 'payment' | 'confirmation';

interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  billingAddress: string;
}

export default function LabTestRequest() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<StepType>('tests');
  const [formData, setFormData] = useState<RequestFormData>({
    type: 'lab-test-request',
    symptoms: '',
    description: '',
  });
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleTestToggle = (test: string) => {
    setSelectedTests(prev => 
      prev.includes(test) 
        ? prev.filter(t => t !== test)
        : [...prev, test]
    );
  };

  const handleNextStep = () => {
    if (currentStep === 'tests') {
      setCurrentStep('payment');
    }
  };

  const handlePrevStep = () => {
    if (currentStep === 'payment') {
      setCurrentStep('tests');
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    setCurrentStep('confirmation');
    setIsLoading(false);
  };

  const handlePaymentInputChange = (field: keyof PaymentData, value: string) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
  };

  // Step indicator
  const steps = [
    { id: 'tests', title: 'Lab Tests', completed: currentStep !== 'tests' },
    { id: 'payment', title: 'Payment', completed: currentStep === 'confirmation' },
    { id: 'confirmation', title: 'Complete', completed: false }
  ];

  if (currentStep === 'confirmation') {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="mb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Lab Test Request Submitted!</h1>
            <p className="text-lg text-gray-600">
              Your lab test request has been submitted and payment of $75 has been processed.
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Summary</h3>
              <div className="text-left space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Request Type:</span>
                  <span className="font-medium">Lab Test Request</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Symptoms:</span>
                  <span className="font-medium">{formData.symptoms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tests Selected:</span>
                  <span className="font-medium">{selectedTests.length} tests</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount Paid:</span>
                  <span className="font-medium text-green-600">$75.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-mono text-sm">TXN-{Date.now()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Button onClick={() => router.push('/my-visits')} className="w-full">
              View My Visits
            </Button>
            <Button 
              variant="outline" 
              onClick={() => router.push('/dashboard')} 
              className="w-full"
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
              <FlaskConical className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Lab Test Request</h1>
              <p className="text-gray-600">Request laboratory tests from your healthcare provider</p>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  step.id === currentStep
                    ? 'bg-purple-600 text-white'
                    : step.completed
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {step.completed ? '✓' : index + 1}
                </div>
                <div className="ml-2 text-sm font-medium text-gray-600">{step.title}</div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-4 ${
                    step.completed ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Lab Tests Step */}
        {currentStep === 'tests' && (
          <div className="space-y-6">
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
                    <li>• Lab tests require a provider&apos;s order before they can be processed</li>
                    <li>• You will receive instructions on where to get your tests done</li>
                    <li>• Fasting may be required for certain tests - you&apos;ll be notified if needed</li>
                    <li>• Results will be available in your patient portal once completed</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                onClick={handleNextStep}
                disabled={selectedTests.length === 0 || !formData.symptoms || !formData.description}
                className="px-8"
              >
                Continue to Payment
              </Button>
            </div>
          </div>
        )}

        {/* Payment Step */}
        {currentStep === 'payment' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Information
                </h3>
                <div className="flex items-center text-sm text-gray-600 mt-2">
                  <Lock className="h-4 w-4 mr-1" />
                  Your payment information is secure and encrypted
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-purple-900">Lab Test Request Service</h4>
                      <p className="text-sm text-purple-700">One-time consultation fee</p>
                    </div>
                    <div className="text-2xl font-bold text-purple-900">$75.00</div>
                  </div>
                </div>

                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      required
                      value={paymentData.cardholderName}
                      onChange={(e) => handlePaymentInputChange('cardholderName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={19}
                      value={paymentData.cardNumber}
                      onChange={(e) => handlePaymentInputChange('cardNumber', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        maxLength={5}
                        value={paymentData.expiryDate}
                        onChange={(e) => handlePaymentInputChange('expiryDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={4}
                        value={paymentData.cvv}
                        onChange={(e) => handlePaymentInputChange('cvv', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        placeholder="123"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Billing Address
                    </label>
                    <input
                      type="text"
                      required
                      value={paymentData.billingAddress}
                      onChange={(e) => handlePaymentInputChange('billingAddress', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      placeholder="123 Main Street, City, State, ZIP"
                    />
                  </div>

                  <div className="text-xs text-gray-500 text-center mt-4">
                    <div className="flex items-center justify-center mb-2">
                      <Lock className="h-3 w-3 mr-1" />
                      Secured by 256-bit SSL encryption
                    </div>
                    <p>Your payment information is safe and secure.</p>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevStep}
              >
                Back to Lab Tests
              </Button>
              <Button
                onClick={handlePaymentSubmit}
                loading={isLoading}
                disabled={!paymentData.cardholderName || !paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv || !paymentData.billingAddress}
                className="px-8"
              >
                {isLoading ? 'Processing Payment...' : 'Pay $75.00'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}