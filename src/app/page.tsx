'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, UserPlus, ChevronRight, Heart, Shield, Clock } from 'lucide-react';
import Image from 'next/image';
import { mockAuth } from '@/lib/mock-data';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

export default function Home() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<'provider' | 'patient' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      setError('Please select your role');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = mockAuth.login(email, password, selectedRole);
    
    if (user) {
      router.push('/dashboard');
    } else {
      setError('Invalid credentials. Try using demo accounts.');
    }
    
    setIsLoading(false);
  };

  const handleDemoLogin = (role: 'provider' | 'patient') => {
    const demoCredentials = {
      provider: { email: 'dr.smith@email.com', password: 'demo' },
      patient: { email: 'john.doe@email.com', password: 'demo' }
    };

    setSelectedRole(role);
    setEmail(demoCredentials[role].email);
    setPassword(demoCredentials[role].password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="flex justify-center mb-8">
            <Image 
              src="/xpress-health-logo.svg" 
              alt="XPress Health Logo" 
              width={240} 
              height={60}
              className="h-16 w-auto"
            />
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to XPress Health
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Cash-only telemedicine platform connecting patients with healthcare providers
            </p>
            
            {/* Feature highlights */}
            <div className="flex justify-center space-x-6 mb-8">
              <div className="flex items-center text-sm text-emerald-600">
                <Heart className="h-4 w-4 mr-1" />
                <span>24/7 Care</span>
              </div>
              <div className="flex items-center text-sm text-emerald-600">
                <Shield className="h-4 w-4 mr-1" />
                <span>Secure</span>
              </div>
              <div className="flex items-center text-sm text-emerald-600">
                <Clock className="h-4 w-4 mr-1" />
                <span>Instant</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="space-y-6">
            {/* Role Selection */}
            {!selectedRole && (
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-medium text-gray-900 text-center">
                    Choose your role
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <button
                    onClick={() => setSelectedRole('patient')}
                    className="w-full flex items-center justify-between p-6 border border-emerald-200 rounded-xl hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-200 shadow-sm hover:shadow-green"
                  >
                    <div className="flex items-center">
                      <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div className="ml-4 text-left">
                        <div className="text-base font-semibold text-gray-900">Patient Portal</div>
                        <div className="text-sm text-gray-500">Prescription requests, lab tests & consultations</div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-emerald-400" />
                  </button>

                  <button
                    onClick={() => setSelectedRole('provider')}
                    className="w-full flex items-center justify-between p-6 border border-emerald-200 rounded-xl hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-200 shadow-sm hover:shadow-green"
                  >
                    <div className="flex items-center">
                      <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
                        <UserPlus className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div className="ml-4 text-left">
                        <div className="text-base font-semibold text-gray-900">Physician Portal</div>
                        <div className="text-sm text-gray-500">Manage patients & practice metrics</div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-emerald-400" />
                  </button>
                </CardContent>
              </Card>
            )}

            {/* Login Form */}
            {selectedRole && (
              <Card>
                <CardHeader>
                  <div className="flex items-center">
                    <button
                      onClick={() => setSelectedRole(null)}
                      className="text-gray-400 hover:text-gray-600 mr-3"
                    >
                      ←
                    </button>
                    <h3 className="text-lg font-medium text-gray-900">
                      Sign in to {selectedRole === 'provider' ? 'Physician Portal' : 'Patient Portal'}
                    </h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                        placeholder="Enter your password"
                      />
                    </div>

                    {error && (
                      <div className="text-red-600 text-sm text-center">{error}</div>
                    )}

                    <Button type="submit" loading={isLoading} className="w-full">
                      Sign in
                    </Button>
                  </form>

                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Try demo account</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Button
                        variant="outline"
                        onClick={() => handleDemoLogin(selectedRole)}
                        className="w-full"
                      >
                        Use Demo {selectedRole === 'provider' ? 'Provider' : 'Patient'} Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Demo Credentials Info */}
            <div className="text-center">
              <div className="text-xs text-gray-500 space-y-1">
                <p><strong>Demo Provider:</strong> dr.smith@email.com</p>
                <p><strong>Demo Patient:</strong> john.doe@email.com</p>
                <p>Password: demo (for both)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
