'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { 
  Plus, 
  Calendar, 
  User, 
  Edit,
  Heart,
  Pill,
  AlertTriangle,
  Activity,
  Stethoscope,
  Eye,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { mockAuth } from '@/lib/mock-data';

interface MedicalCondition {
  id: string;
  name: string;
  diagnosedDate: Date;
  status: 'active' | 'resolved' | 'chronic';
  severity: 'mild' | 'moderate' | 'severe';
  providerId: string;
  providerName: string;
  description?: string;
  treatment?: string;
  notes?: string;
}

interface Allergy {
  id: string;
  allergen: string;
  reaction: string;
  severity: 'mild' | 'moderate' | 'severe';
  diagnosedDate: Date;
  notes?: string;
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: Date;
  endDate?: Date;
  status: 'active' | 'completed' | 'discontinued';
  prescribedBy: string;
  purpose: string;
}

interface VitalSigns {
  id: string;
  date: Date;
  bloodPressure?: { systolic: number; diastolic: number };
  heartRate?: number;
  temperature?: number;
  weight?: number;
  height?: number;
  bmi?: number;
  recordedBy: string;
}

export default function MedicalHistory() {
  const currentUser = mockAuth.currentUser;
  const [activeTab, setActiveTab] = useState<'conditions' | 'allergies' | 'medications' | 'vitals'>('conditions');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Mock data
  const [conditions] = useState<MedicalCondition[]>([
    {
      id: 'cond-1',
      name: 'Hypertension',
      diagnosedDate: new Date('2023-03-15'),
      status: 'chronic',
      severity: 'moderate',
      providerId: 'provider-1',
      providerName: 'Dr. Sarah Smith',
      description: 'Primary hypertension diagnosed during routine checkup',
      treatment: 'Lisinopril 10mg daily, lifestyle modifications',
      notes: 'Patient responds well to ACE inhibitors. Monitor kidney function annually.'
    },
    {
      id: 'cond-2',
      name: 'Type 2 Diabetes Mellitus',
      diagnosedDate: new Date('2022-08-10'),
      status: 'chronic',
      severity: 'moderate',
      providerId: 'provider-2',
      providerName: 'Dr. Michael Johnson',
      description: 'Type 2 diabetes with good glycemic control',
      treatment: 'Metformin 1000mg twice daily, diet and exercise',
      notes: 'HbA1c last checked: 6.8%. Continue current management.'
    },
    {
      id: 'cond-3',
      name: 'Seasonal Allergic Rhinitis',
      diagnosedDate: new Date('2021-04-20'),
      status: 'active',
      severity: 'mild',
      providerId: 'provider-1',
      providerName: 'Dr. Sarah Smith',
      description: 'Seasonal allergies, primarily spring and fall',
      treatment: 'Antihistamines as needed, nasal corticosteroids during flare-ups'
    }
  ]);

  const [allergies] = useState<Allergy[]>([
    {
      id: 'allergy-1',
      allergen: 'Penicillin',
      reaction: 'Skin rash, hives',
      severity: 'moderate',
      diagnosedDate: new Date('2020-06-15'),
      notes: 'Developed rash during strep throat treatment. Use alternatives like cephalexin.'
    },
    {
      id: 'allergy-2',
      allergen: 'Shellfish',
      reaction: 'Gastrointestinal upset, mild swelling',
      severity: 'mild',
      diagnosedDate: new Date('2019-09-22'),
      notes: 'Mild reaction to shrimp. Can tolerate other seafood.'
    },
    {
      id: 'allergy-3',
      allergen: 'Latex',
      reaction: 'Contact dermatitis',
      severity: 'mild',
      diagnosedDate: new Date('2021-12-05'),
      notes: 'Reaction to latex gloves during dental procedure.'
    }
  ]);

  const [medications] = useState<Medication[]>([
    {
      id: 'med-1',
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      startDate: new Date('2023-03-15'),
      status: 'active',
      prescribedBy: 'Dr. Sarah Smith',
      purpose: 'Blood pressure control'
    },
    {
      id: 'med-2',
      name: 'Metformin',
      dosage: '1000mg',
      frequency: 'Twice daily',
      startDate: new Date('2022-08-10'),
      status: 'active',
      prescribedBy: 'Dr. Michael Johnson',
      purpose: 'Diabetes management'
    },
    {
      id: 'med-3',
      name: 'Amoxicillin',
      dosage: '500mg',
      frequency: 'Three times daily',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-01-25'),
      status: 'completed',
      prescribedBy: 'Dr. Sarah Smith',
      purpose: 'Bacterial infection treatment'
    }
  ]);

  const [vitals] = useState<VitalSigns[]>([
    {
      id: 'vital-1',
      date: new Date('2024-01-20'),
      bloodPressure: { systolic: 128, diastolic: 82 },
      heartRate: 72,
      temperature: 98.6,
      weight: 175,
      height: 70,
      bmi: 25.1,
      recordedBy: 'Dr. Sarah Smith'
    },
    {
      id: 'vital-2',
      date: new Date('2023-12-15'),
      bloodPressure: { systolic: 135, diastolic: 88 },
      heartRate: 78,
      weight: 178,
      height: 70,
      bmi: 25.5,
      recordedBy: 'Dr. Sarah Smith'
    },
    {
      id: 'vital-3',
      date: new Date('2023-11-10'),
      bloodPressure: { systolic: 142, diastolic: 92 },
      heartRate: 82,
      temperature: 98.4,
      weight: 180,
      recordedBy: 'Nurse Johnson'
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'severe': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'chronic': return 'bg-purple-100 text-purple-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'discontinued': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const renderConditions = () => (
    <div className="space-y-4">
      {conditions.map(condition => (
        <Card key={condition.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold text-gray-900">{condition.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(condition.status)}`}>
                    {condition.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(condition.severity)}`}>
                    {condition.severity}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Diagnosed: {condition.diagnosedDate.toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {condition.providerName}
                    </span>
                  </div>
                  <p>{condition.description}</p>
                </div>

                {expandedItems.has(condition.id) && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-md space-y-2">
                    {condition.treatment && (
                      <div>
                        <span className="font-medium text-gray-900">Treatment: </span>
                        <span className="text-gray-700">{condition.treatment}</span>
                      </div>
                    )}
                    {condition.notes && (
                      <div>
                        <span className="font-medium text-gray-900">Notes: </span>
                        <span className="text-gray-700">{condition.notes}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpanded(condition.id)}
                >
                  {expandedItems.has(condition.id) ? 
                    <ChevronUp className="h-4 w-4" /> : 
                    <ChevronDown className="h-4 w-4" />
                  }
                </Button>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderAllergies = () => (
    <div className="space-y-4">
      {allergies.map(allergy => (
        <Card key={allergy.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <h3 className="font-semibold text-gray-900">{allergy.allergen}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(allergy.severity)}`}>
                    {allergy.severity}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Diagnosed: {allergy.diagnosedDate.toLocaleDateString()}
                    </span>
                  </div>
                  <p><strong>Reaction:</strong> {allergy.reaction}</p>
                  {allergy.notes && <p><strong>Notes:</strong> {allergy.notes}</p>}
                </div>
              </div>
              
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderMedications = () => (
    <div className="space-y-4">
      {medications.map(medication => (
        <Card key={medication.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <Pill className="h-5 w-5 text-blue-500" />
                  <h3 className="font-semibold text-gray-900">
                    {medication.name} {medication.dosage}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(medication.status)}`}>
                    {medication.status}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-4">
                    <span><strong>Frequency:</strong> {medication.frequency}</span>
                    <span><strong>Purpose:</strong> {medication.purpose}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Started: {medication.startDate.toLocaleDateString()}
                    </span>
                    {medication.endDate && (
                      <span>
                        Ended: {medication.endDate.toLocaleDateString()}
                      </span>
                    )}
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {medication.prescribedBy}
                    </span>
                  </div>
                </div>
              </div>
              
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderVitals = () => (
    <div className="space-y-4">
      {vitals.map(vital => (
        <Card key={vital.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Activity className="h-5 w-5 text-green-500" />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {vital.date.toLocaleDateString()}
                  </h3>
                  <p className="text-sm text-gray-500">Recorded by {vital.recordedBy}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {vital.bloodPressure && (
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-xs text-red-600 font-medium mb-1">Blood Pressure</div>
                  <div className="text-lg font-semibold text-red-700">
                    {vital.bloodPressure.systolic}/{vital.bloodPressure.diastolic}
                  </div>
                  <div className="text-xs text-red-500">mmHg</div>
                </div>
              )}
              
              {vital.heartRate && (
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-xs text-blue-600 font-medium mb-1">Heart Rate</div>
                  <div className="text-lg font-semibold text-blue-700">{vital.heartRate}</div>
                  <div className="text-xs text-blue-500">bpm</div>
                </div>
              )}
              
              {vital.temperature && (
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-xs text-orange-600 font-medium mb-1">Temperature</div>
                  <div className="text-lg font-semibold text-orange-700">{vital.temperature}</div>
                  <div className="text-xs text-orange-500">°F</div>
                </div>
              )}
              
              {vital.weight && (
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-xs text-purple-600 font-medium mb-1">Weight</div>
                  <div className="text-lg font-semibold text-purple-700">{vital.weight}</div>
                  <div className="text-xs text-purple-500">lbs</div>
                </div>
              )}
              
              {vital.bmi && (
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-xs text-green-600 font-medium mb-1">BMI</div>
                  <div className="text-lg font-semibold text-green-700">{vital.bmi}</div>
                  <div className="text-xs text-green-500">kg/m²</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  if (!currentUser) {
    return <Layout><div>Please log in to view medical history.</div></Layout>;
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Stethoscope className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {currentUser.role === 'provider' ? 'Patient Medical History' : 'My Medical History'}
              </h1>
              <p className="text-sm text-gray-500">
                Complete medical record and health information
              </p>
            </div>
          </div>
          
          {currentUser.role === 'provider' && (
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Entry
            </Button>
          )}
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { key: 'conditions', label: 'Conditions', icon: Heart, count: conditions.length },
              { key: 'allergies', label: 'Allergies', icon: AlertTriangle, count: allergies.length },
              { key: 'medications', label: 'Medications', icon: Pill, count: medications.length },
              { key: 'vitals', label: 'Vital Signs', icon: Activity, count: vitals.length }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as typeof activeTab)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.key
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                  <span className="bg-gray-200 text-gray-600 rounded-full px-2 py-1 text-xs">
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div>
          {activeTab === 'conditions' && renderConditions()}
          {activeTab === 'allergies' && renderAllergies()}
          {activeTab === 'medications' && renderMedications()}
          {activeTab === 'vitals' && renderVitals()}
        </div>
      </div>
    </Layout>
  );
}