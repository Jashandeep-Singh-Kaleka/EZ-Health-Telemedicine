'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pill, MapPin, CreditCard, Lock, CheckCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { RequestFormData } from '@/lib/types';
import { pharmacyChains } from '@/lib/mock-data';

type StepType = 'symptoms' | 'pharmacy' | 'payment' | 'confirmation';

interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  billingAddress: string;
}

export default function PrescriptionRequest() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<StepType>('symptoms');
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
  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleNextStep = () => {
    if (currentStep === 'symptoms') {
      setCurrentStep('pharmacy');
    } else if (currentStep === 'pharmacy') {
      setCurrentStep('payment');
    }
  };

  const handlePrevStep = () => {
    if (currentStep === 'pharmacy') {
      setCurrentStep('symptoms');
    } else if (currentStep === 'payment') {
      setCurrentStep('pharmacy');
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

  const handlePharmacySelect = (pharmacyName: string) => {
    setFormData({
      ...formData,
      pharmacy: {
        ...formData.pharmacy!,
        name: pharmacyName,
        address: '123 Main St, New York, NY 10001',
        phone: '(555) 123-0000'
      }
    });
  };

  const handlePaymentInputChange = (field: keyof PaymentData, value: string) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
  };

  // Step indicator
  const steps = [
    { id: 'symptoms', title: 'Symptoms', completed: currentStep !== 'symptoms' },
    { id: 'pharmacy', title: 'Pharmacy', completed: currentStep === 'payment' || currentStep === 'confirmation' },
    { id: 'payment', title: 'Payment', completed: currentStep === 'confirmation' },
    { id: 'confirmation', title: 'Complete', completed: false }
  ];

  if (currentStep === 'confirmation') {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="mb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Request Submitted Successfully!</h1>
            <p className="text-lg text-gray-600">
              Your prescription request has been submitted and payment of $65 has been processed.
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Summary</h3>
              <div className="text-left space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Request Type:</span>
                  <span className="font-medium">Prescription Request</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Symptoms:</span>
                  <span className="font-medium">{formData.symptoms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pharmacy:</span>
                  <span className="font-medium">{formData.pharmacy?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount Paid:</span>
                  <span className="font-medium text-green-600">$65.00</span>
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
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <Pill className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Prescription Request</h1>
              <p className="text-gray-600">Request a prescription from your healthcare provider</p>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  step.id === currentStep
                    ? 'bg-blue-600 text-white'
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

        {/* Symptoms Step */}
        {currentStep === 'symptoms' && (
          <div className="space-y-6">
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

            <div className="flex justify-end">
              <Button
                onClick={handleNextStep}
                disabled={!formData.symptoms || !formData.description}
                className="px-8"
              >
                Continue to Pharmacy Selection
              </Button>
            </div>
          </div>
        )}

        {/* Pharmacy Step */}
        {currentStep === 'pharmacy' && (
          <div className="space-y-6">
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

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevStep}
              >
                Back to Symptoms
              </Button>
              <Button
                onClick={handleNextStep}
                disabled={!formData.pharmacy?.name}
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
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-blue-900">Prescription Request Service</h4>
                      <p className="text-sm text-blue-700">One-time consultation fee</p>
                    </div>
                    <div className="text-2xl font-bold text-blue-900">$65.00</div>
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                Back to Pharmacy
              </Button>
              <Button
                onClick={handlePaymentSubmit}
                loading={isLoading}
                disabled={!paymentData.cardholderName || !paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv || !paymentData.billingAddress}
                className="px-8"
              >
                {isLoading ? 'Processing Payment...' : 'Pay $65.00'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}