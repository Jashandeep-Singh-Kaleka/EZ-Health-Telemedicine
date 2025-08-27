'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import { mockAuth } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { 
  Pill, 
  FlaskConical, 
  MessageSquare,
  ArrowRight 
} from 'lucide-react';

export default function RequestCare() {
  const router = useRouter();
  const currentUser = mockAuth.currentUser;

  if (!currentUser || currentUser.role !== 'patient') {
    return null;
  }

  const careOptions = [
    {
      id: 'prescription-request',
      title: 'Prescription Request',
      description: 'Request a prescription refill or new medication',
      icon: <Pill className="h-8 w-8 text-blue-600" />,
      path: '/prescription-request',
      color: 'blue'
    },
    {
      id: 'lab-test-request', 
      title: 'Lab Test Request',
      description: 'Order laboratory tests and diagnostic services',
      icon: <FlaskConical className="h-8 w-8 text-purple-600" />,
      path: '/lab-test-request',
      color: 'purple'
    },
    {
      id: 'general-consultation',
      title: 'General Consultation', 
      description: 'Speak with a healthcare provider about your concerns',
      icon: <MessageSquare className="h-8 w-8 text-green-600" />,
      path: '/message-provider',
      color: 'green'
    }
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Request Care</h1>
          <p className="text-lg text-gray-600">
            Choose the type of medical service you need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {careOptions.map((option) => (
            <Card key={option.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className={`p-4 bg-${option.color}-50 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center`}>
                  {option.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {option.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {option.description}
                </p>
                <Button 
                  onClick={() => router.push(option.path)}
                  className="w-full"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help Choosing?</h3>
              <p className="text-gray-600 mb-4">
                Not sure which service you need? Our healthcare providers can help guide you.
              </p>
              <Button 
                variant="outline" 
                onClick={() => router.push('/message-provider')}
              >
                Start with General Consultation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}