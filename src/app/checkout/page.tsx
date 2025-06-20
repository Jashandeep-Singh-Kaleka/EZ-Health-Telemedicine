'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { mockAuth, mockRequests } from '@/lib/mock-data';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { 
  CreditCard, 
  Lock, 
  ShoppingCart,
  CheckCircle,
  AlertCircle,
  Calendar,
  User,
  DollarSign
} from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

export default function Checkout() {
  const currentUser = mockAuth.currentUser;
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: '',
    zipCode: '',
  });

  if (!currentUser || currentUser.role !== 'patient') {
    return null;
  }

  // Get user's completed appointments that need payment
  const completedAppointments = mockRequests.filter(request => 
    request.patientId === currentUser.id && 
    request.status === 'completed'
  );

  const availableServices = [
    { id: 'consultation', name: 'General Consultation', price: 75, duration: '30 min' },
    { id: 'urgent-care', name: 'Urgent Care Visit', price: 125, duration: '45 min' },
    { id: 'prescription', name: 'Prescription Refill', price: 35, duration: '15 min' },
    { id: 'follow-up', name: 'Follow-up Appointment', price: 50, duration: '20 min' },
    { id: 'mental-health', name: 'Mental Health Consultation', price: 95, duration: '50 min' },
  ];

  const totalAmount = selectedServices.reduce((total, serviceId) => {
    const service = availableServices.find(s => s.id === serviceId);
    return total + (service?.price || 0);
  }, 0);

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    setPaymentComplete(true);
  };

  if (paymentComplete) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto text-center py-12">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Your payment of ${totalAmount} has been processed successfully.
          </p>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Transaction Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Transaction ID:</span>
                    <span className="font-mono">TXN-{Date.now()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount Paid:</span>
                    <span className="font-semibold">${totalAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span>•••• •••• •••• {formData.cardNumber.slice(-4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Button onClick={() => window.location.href = '/dashboard'} className="w-full">
              Return to Dashboard
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600">Pay for your medical services securely and easily.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Service Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Outstanding Bills */}
            {completedAppointments.length > 0 && (
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Outstanding Bills</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {completedAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{appointment.specialty}</p>
                          <p className="text-sm text-gray-600">
                            with {appointment.provider?.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatDateTime(appointment.updatedAt)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">$75</p>
                          <p className="text-xs text-yellow-600">Due</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Available Services */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Available Services</h3>
                <p className="text-sm text-gray-600">Select additional services you'd like to pay for</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {availableServices.map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={selectedServices.includes(service.id)}
                          onChange={() => handleServiceToggle(service.id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{service.name}</p>
                          <p className="text-sm text-gray-600">{service.duration}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${service.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Payment Information</h3>
                <div className="flex items-center text-sm text-gray-600">
                  <Lock className="h-4 w-4 mr-1" />
                  Your payment information is secure and encrypted
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePayment} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('credit-card')}
                        className={`p-3 border rounded-lg flex items-center justify-center ${
                          paymentMethod === 'credit-card' 
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Credit Card
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('insurance')}
                        className={`p-3 border rounded-lg flex items-center justify-center ${
                          paymentMethod === 'insurance' 
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Insurance
                      </button>
                    </div>
                  </div>

                  {paymentMethod === 'credit-card' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          value={formData.cardholderName}
                          onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                          required
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
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                          required
                          maxLength={19}
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
                            value={formData.expiryDate}
                            onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                            required
                            placeholder="MM/YY"
                            maxLength={5}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            value={formData.cvv}
                            onChange={(e) => handleInputChange('cvv', e.target.value)}
                            required
                            maxLength={4}
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
                          value={formData.billingAddress}
                          onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="123 Main Street, City, State"
                        />
                      </div>
                    </>
                  )}

                  {paymentMethod === 'insurance' && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-blue-600 mr-2" />
                        <p className="text-sm text-blue-800">
                          Your insurance ({currentUser.insurance || 'Unknown'}) will be billed directly. 
                          You may be responsible for co-pays or deductibles.
                        </p>
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Outstanding Bills */}
                {completedAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex justify-between text-sm">
                    <span>{appointment.specialty}</span>
                    <span>$75</span>
                  </div>
                ))}

                {/* Selected Services */}
                {selectedServices.map((serviceId) => {
                  const service = availableServices.find(s => s.id === serviceId);
                  return service ? (
                    <div key={serviceId} className="flex justify-between text-sm">
                      <span>{service.name}</span>
                      <span>${service.price}</span>
                    </div>
                  ) : null;
                })}

                {(completedAppointments.length > 0 || selectedServices.length > 0) && (
                  <>
                    <hr />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${totalAmount + (completedAppointments.length * 75)}</span>
                    </div>
                  </>
                )}

                <Button 
                  onClick={handlePayment}
                  disabled={totalAmount === 0 && completedAppointments.length === 0 || isProcessing}
                  loading={isProcessing}
                  className="w-full"
                >
                  {isProcessing ? 'Processing Payment...' : `Pay $${totalAmount + (completedAppointments.length * 75)}`}
                </Button>

                <div className="text-xs text-gray-500 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Lock className="h-3 w-3 mr-1" />
                    Secured by 256-bit SSL encryption
                  </div>
                  <p>Your payment information is safe and secure.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
} 