'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Clock, Star, Navigation2, Search } from 'lucide-react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  rating: number;
  distance: number;
  services: string[];
  inNetwork: boolean;
}

const mockPharmacies: Pharmacy[] = [
  {
    id: '1',
    name: 'CVS Pharmacy',
    address: '123 Main St, Anytown, CA 90210',
    phone: '(555) 123-4567',
    hours: 'Mon-Fri 8AM-10PM, Sat-Sun 9AM-6PM',
    rating: 4.2,
    distance: 0.5,
    services: ['24/7 Pharmacy', 'Drive-Thru', 'Vaccination Services', 'Health Screening'],
    inNetwork: true
  },
  {
    id: '2',
    name: 'Walgreens',
    address: '456 Oak Ave, Anytown, CA 90210',
    phone: '(555) 987-6543',
    hours: 'Mon-Fri 8AM-9PM, Sat-Sun 9AM-7PM',
    rating: 4.1,
    distance: 0.8,
    services: ['Drive-Thru', 'Photo Services', 'Vaccination Services', 'Health Clinic'],
    inNetwork: true
  },
  {
    id: '3',
    name: 'Rite Aid',
    address: '789 Pine Rd, Anytown, CA 90210',
    phone: '(555) 456-7890',
    hours: 'Mon-Fri 8AM-9PM, Sat-Sun 9AM-6PM',
    rating: 3.9,
    distance: 1.2,
    services: ['Drive-Thru', 'Wellness Programs', 'Health Screening'],
    inNetwork: false
  },
  {
    id: '4',
    name: 'Local Care Pharmacy',
    address: '321 Elm St, Anytown, CA 90210',
    phone: '(555) 234-5678',
    hours: 'Mon-Fri 9AM-7PM, Sat 9AM-5PM, Sun Closed',
    rating: 4.7,
    distance: 1.5,
    services: ['Compounding', 'Medication Therapy Management', 'Delivery Service'],
    inNetwork: true
  },
  {
    id: '5',
    name: 'HealthMart Pharmacy',
    address: '567 Maple Dr, Anytown, CA 90210',
    phone: '(555) 345-6789',
    hours: 'Mon-Fri 8AM-8PM, Sat 9AM-6PM, Sun 10AM-4PM',
    rating: 4.3,
    distance: 2.1,
    services: ['Medication Synchronization', 'Vaccination Services', 'Health Consultation'],
    inNetwork: true
  }
];

export default function PharmaciesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterInNetwork, setFilterInNetwork] = useState(false);
  const [sortBy, setSortBy] = useState<'distance' | 'rating'>('distance');

  const filteredPharmacies = mockPharmacies
    .filter(pharmacy => {
      const matchesSearch = pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesNetwork = !filterInNetwork || pharmacy.inNetwork;
      return matchesSearch && matchesNetwork;
    })
    .sort((a, b) => {
      if (sortBy === 'distance') return a.distance - b.distance;
      return b.rating - a.rating;
    });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Local Pharmacies</h1>
          <p className="text-gray-700 text-lg">Find nearby pharmacies and check their services</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by pharmacy name or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filterInNetwork}
                onChange={(e) => setFilterInNetwork(e.target.checked)}
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">In-network only</span>
            </label>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'distance' | 'rating')}
                className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="distance">Distance</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pharmacies List */}
        <div className="grid gap-6">
          {filteredPharmacies.map((pharmacy) => (
            <Card key={pharmacy.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {pharmacy.name}
                          {pharmacy.inNetwork && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              In-Network
                            </span>
                          )}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{pharmacy.address}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <Phone className="h-4 w-4 mr-1" />
                          <span>{pharmacy.phone}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{pharmacy.hours}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center mb-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm font-medium text-gray-900">
                            {pharmacy.rating}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Navigation2 className="h-4 w-4 mr-1" />
                          <span>{pharmacy.distance} mi</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Services:</h4>
                      <div className="flex flex-wrap gap-2">
                        {pharmacy.services.map((service, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col gap-2 mt-4 lg:mt-0 lg:ml-6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`tel:${pharmacy.phone}`)}
                      className="flex items-center justify-center"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(pharmacy.address)}`)}
                      className="flex items-center justify-center"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Directions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPharmacies.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No pharmacies found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          </div>
        )}

        {/* Information Card */}
        <Card className="mt-8">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Important Information</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-gray-600">
              <p>• <strong>In-Network:</strong> Pharmacies that accept your insurance plan with preferred pricing</p>
              <p>• <strong>Distance:</strong> Calculated from your current location or registered address</p>
              <p>• <strong>Hours:</strong> Please call ahead to confirm current operating hours</p>
              <p>• <strong>Services:</strong> Additional services may be available - contact pharmacy directly</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}