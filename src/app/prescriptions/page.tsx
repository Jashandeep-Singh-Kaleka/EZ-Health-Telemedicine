'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { 
  Pill, 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  Phone,
  Clock,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Download,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { mockAuth } from '@/lib/mock-data';

interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  providerId: string;
  providerName: string;
  medication: string;
  dosage: string;
  quantity: string;
  instructions: string;
  refills: number;
  refillsRemaining: number;
  prescribedDate: Date;
  expiryDate: Date;
  status: 'active' | 'expired' | 'filled' | 'pending' | 'cancelled';
  pharmacy?: {
    name: string;
    address: string;
    phone: string;
  };
  notes?: string;
}

export default function Prescriptions() {
  const currentUser = mockAuth.currentUser;
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'expired' | 'pending'>('all');

  // Mock prescriptions data
  const [prescriptions] = useState<Prescription[]>([
    {
      id: 'rx-1',
      patientId: 'patient-1',
      patientName: 'John Doe',
      providerId: 'provider-1',
      providerName: 'Dr. Sarah Smith',
      medication: 'Amoxicillin',
      dosage: '500mg',
      quantity: '30 tablets',
      instructions: 'Take one tablet by mouth three times daily with food for 10 days',
      refills: 2,
      refillsRemaining: 1,
      prescribedDate: new Date('2024-01-15'),
      expiryDate: new Date('2025-01-15'),
      status: 'active',
      pharmacy: {
        name: 'CVS Pharmacy',
        address: '123 Main St, New York, NY 10001',
        phone: '(555) 123-4567'
      },
      notes: 'Patient allergic to penicillin - use alternative if needed'
    },
    {
      id: 'rx-2',
      patientId: 'patient-1',
      patientName: 'John Doe',
      providerId: 'provider-2',
      providerName: 'Dr. Michael Johnson',
      medication: 'Lisinopril',
      dosage: '10mg',
      quantity: '90 tablets',
      instructions: 'Take one tablet by mouth once daily in the morning',
      refills: 5,
      refillsRemaining: 4,
      prescribedDate: new Date('2024-01-10'),
      expiryDate: new Date('2025-01-10'),
      status: 'active',
      pharmacy: {
        name: 'Walgreens',
        address: '456 Oak Ave, New York, NY 10002',
        phone: '(555) 987-6543'
      }
    },
    {
      id: 'rx-3',
      patientId: 'patient-2',
      patientName: 'Mary Smith',
      providerId: 'provider-1',
      providerName: 'Dr. Sarah Smith',
      medication: 'Metformin',
      dosage: '1000mg',
      quantity: '60 tablets',
      instructions: 'Take one tablet by mouth twice daily with meals',
      refills: 3,
      refillsRemaining: 0,
      prescribedDate: new Date('2023-12-01'),
      expiryDate: new Date('2024-12-01'),
      status: 'expired',
      pharmacy: {
        name: 'CVS Pharmacy',
        address: '123 Main St, New York, NY 10001',
        phone: '(555) 123-4567'
      }
    },
    {
      id: 'rx-4',
      patientId: 'patient-3',
      patientName: 'Robert Johnson',
      providerId: 'provider-1',
      providerName: 'Dr. Sarah Smith',
      medication: 'Azithromycin',
      dosage: '250mg',
      quantity: '6 tablets',
      instructions: 'Take two tablets on day 1, then one tablet daily for 4 days',
      refills: 0,
      refillsRemaining: 0,
      prescribedDate: new Date('2024-01-20'),
      expiryDate: new Date('2025-01-20'),
      status: 'pending',
      notes: 'Patient requested Z-pack for respiratory infection'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'filled': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'expired': return <AlertTriangle className="h-4 w-4" />;
      case 'filled': return <Pill className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'cancelled': return <Trash2 className="h-4 w-4" />;
      default: return <Pill className="h-4 w-4" />;
    }
  };

  const filteredPrescriptions = prescriptions.filter(rx => {
    const matchesSearch = rx.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rx.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rx.providerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || rx.status === statusFilter;
    
    // Filter by user role
    if (currentUser?.role === 'patient') {
      return matchesSearch && matchesStatus && rx.patientName === currentUser.name;
    } else if (currentUser?.role === 'provider') {
      return matchesSearch && matchesStatus && rx.providerName === currentUser.name;
    }
    
    return matchesSearch && matchesStatus;
  });

  const handleRequestRefill = () => {
    // In real app, would make API call to request refill
    alert('Refill request submitted successfully!');
  };

  const handleDownloadPrescription = () => {
    // In real app, would generate and download PDF
    alert('Prescription downloaded successfully!');
  };

  if (!currentUser) {
    return <Layout><div>Please log in to view prescriptions.</div></Layout>;
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <Pill className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {currentUser.role === 'provider' ? 'Patient Prescriptions' : 'My Prescriptions'}
              </h1>
              <p className="text-sm text-gray-500">
                {filteredPrescriptions.length} prescription{filteredPrescriptions.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>
          
          {currentUser.role === 'provider' && (
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Prescription
            </Button>
          )}
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search medications, patients, or providers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prescriptions List */}
        <div className="space-y-4">
          {filteredPrescriptions.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Pill className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No prescriptions found</p>
              </CardContent>
            </Card>
          ) : (
            filteredPrescriptions.map(prescription => (
              <Card key={prescription.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Pill className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {prescription.medication} {prescription.dosage}
                          </h3>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(prescription.status)}`}>
                            {getStatusIcon(prescription.status)}
                            <span className="ml-1 capitalize">{prescription.status}</span>
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Quantity:</strong> {prescription.quantity} • 
                          <strong> Refills:</strong> {prescription.refillsRemaining}/{prescription.refills} remaining
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Instructions:</strong> {prescription.instructions}
                        </p>
                        {prescription.notes && (
                          <p className="text-sm text-blue-600 mt-2">
                            <strong>Notes:</strong> {prescription.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleDownloadPrescription()}>
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {currentUser.role === 'patient' && prescription.status === 'active' && prescription.refillsRemaining > 0 && (
                        <Button size="sm" onClick={() => handleRequestRefill()}>
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Request Refill
                        </Button>
                      )}
                      {currentUser.role === 'provider' && (
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500">
                        {currentUser.role === 'provider' ? 'Patient' : 'Prescribed by'}
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {currentUser.role === 'provider' ? prescription.patientName : prescription.providerName}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Prescribed Date</p>
                      <p className="text-sm font-medium text-gray-900 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {prescription.prescribedDate.toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Expires</p>
                      <p className={`text-sm font-medium flex items-center ${
                        prescription.expiryDate < new Date() ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        <Clock className="h-3 w-3 mr-1" />
                        {prescription.expiryDate.toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Pharmacy Info */}
                  {prescription.pharmacy && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500">Pharmacy</p>
                          <p className="text-sm font-medium text-gray-900">{prescription.pharmacy.name}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-xs text-gray-600 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {prescription.pharmacy.address}
                            </span>
                            <span className="text-xs text-gray-600 flex items-center">
                              <Phone className="h-3 w-3 mr-1" />
                              {prescription.pharmacy.phone}
                            </span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Contact Pharmacy
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}