import { Provider, Patient, MedicalRequest } from './types';

export const mockProviders: Provider[] = [
  {
    id: '1',
    email: 'dr.smith@email.com',
    name: 'Dr. Sarah Smith',
    role: 'provider',
    licenseNumber: 'MD12345',
    specialties: ['Family Medicine', 'Internal Medicine'],
    zipCode: '10001',
    licenseStates: ['NY', 'NJ', 'CT'],
    yearsExperience: 12,
    rating: 4.8,
    profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    isAvailable: true,
    acceptedInsurance: ['Blue Cross', 'Aetna', 'Cigna', 'United Healthcare'],
    createdAt: new Date('2022-01-15'),
  },
  {
    id: '2',
    email: 'dr.johnson@email.com',
    name: 'Dr. Michael Johnson',
    role: 'provider',
    licenseNumber: 'MD23456',
    specialties: ['Cardiology', 'Internal Medicine'],
    zipCode: '10002',
    licenseStates: ['NY', 'PA'],
    yearsExperience: 18,
    rating: 4.9,
    profileImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    isAvailable: true,
    acceptedInsurance: ['Blue Cross', 'Aetna', 'Medicare'],
    createdAt: new Date('2021-03-20'),
  },
  {
    id: '3',
    email: 'dr.williams@email.com',
    name: 'Dr. Emily Williams',
    role: 'provider',
    licenseNumber: 'MD34567',
    specialties: ['Dermatology', 'Cosmetic Dermatology'],
    zipCode: '10003',
    licenseStates: ['NY', 'CA', 'FL'],
    yearsExperience: 8,
    rating: 4.7,
    profileImage: 'https://images.unsplash.com/photo-1594824204989-5c12b0f8896c?w=400&h=400&fit=crop&crop=face',
    isAvailable: false,
    acceptedInsurance: ['Cigna', 'United Healthcare', 'Blue Shield'],
    createdAt: new Date('2020-07-10'),
  },
  {
    id: '4',
    email: 'dr.brown@email.com',
    name: 'Dr. David Brown',
    role: 'provider',
    licenseNumber: 'MD45678',
    specialties: ['Psychiatry', 'Psychology'],
    zipCode: '10004',
    licenseStates: ['NY', 'NJ'],
    yearsExperience: 15,
    rating: 4.9,
    profileImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face',
    isAvailable: true,
    acceptedInsurance: ['Blue Cross', 'Aetna', 'Cigna', 'United Healthcare', 'Medicare'],
    createdAt: new Date('2019-11-05'),
  },
  {
    id: '5',
    email: 'dr.davis@email.com',
    name: 'Dr. Lisa Davis',
    role: 'provider',
    licenseNumber: 'MD56789',
    specialties: ['Pediatrics', 'Family Medicine'],
    zipCode: '10005',
    licenseStates: ['NY', 'CT'],
    yearsExperience: 10,
    rating: 4.8,
    profileImage: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=400&fit=crop&crop=face',
    isAvailable: true,
    acceptedInsurance: ['Blue Cross', 'United Healthcare', 'Medicaid'],
    createdAt: new Date('2021-09-12'),
  },
];

export const mockPatients: Patient[] = [
  {
    id: '1',
    email: 'john.doe@email.com',
    name: 'John Doe',
    role: 'patient',
    dateOfBirth: new Date('1985-06-15'),
    zipCode: '10001',
    phone: '(555) 123-4567',
    emergencyContact: {
      name: 'Jane Doe',
      phone: '(555) 987-6543',
      relationship: 'Spouse',
    },
    createdAt: new Date('2023-01-10'),
  },
  {
    id: '2',
    email: 'mary.smith@email.com',
    name: 'Mary Smith',
    role: 'patient',
    dateOfBirth: new Date('1990-03-22'),
    zipCode: '10002',
    phone: '(555) 234-5678',
    emergencyContact: {
      name: 'Robert Smith',
      phone: '(555) 876-5432',
      relationship: 'Father',
    },
    createdAt: new Date('2023-02-05'),
  },
  {
    id: '3',
    email: 'alex.jones@email.com',
    name: 'Alex Jones',
    role: 'patient',
    dateOfBirth: new Date('1978-11-08'),
    zipCode: '10003',
    phone: '(555) 345-6789',
    emergencyContact: {
      name: 'Sarah Jones',
      phone: '(555) 765-4321',
      relationship: 'Spouse',
    },
    createdAt: new Date('2023-03-15'),
  },
];

export const mockRequests: MedicalRequest[] = [
  {
    id: '1',
    patientId: '1',
    patient: mockPatients[0],
    providerId: '1',
    provider: mockProviders[0],
    type: 'general-consultation',
    symptoms: 'Persistent headache, fatigue',
    description: 'I have been experiencing severe headaches for the past week, along with unusual fatigue. The headaches are worse in the morning and seem to be getting more frequent.',
    status: 'accepted',
    createdAt: new Date('2024-01-20T09:00:00'),
    updatedAt: new Date('2024-01-20T14:30:00'),
    zipCode: '10001',
  },
  {
    id: '2',
    patientId: '2',
    patient: mockPatients[1],
    type: 'lab-test-request',
    symptoms: 'Need routine blood work',
    description: 'Requesting comprehensive metabolic panel and lipid profile for annual checkup.',
    status: 'pending',
    createdAt: new Date('2024-01-24T16:45:00'),
    updatedAt: new Date('2024-01-24T16:45:00'),
    zipCode: '10002',
  },
  {
    id: '3',
    patientId: '3',
    patient: mockPatients[2],
    type: 'prescription-request',
    symptoms: 'Skin rash, itching',
    description: 'Developed a red, itchy rash on my arms and legs over the past few days. Need prescription for topical treatment.',
    status: 'pending',
    createdAt: new Date('2024-01-23T11:20:00'),
    updatedAt: new Date('2024-01-23T11:20:00'),
    zipCode: '10003',
    pharmacy: {
      name: 'CVS Pharmacy',
      address: '123 Main St, New York, NY 10003',
      phone: '(555) 123-0000'
    },
  },
  {
    id: '4',
    patientId: '1',
    patient: mockPatients[0],
    providerId: '4',
    provider: mockProviders[3],
    type: 'general-consultation',
    symptoms: 'Anxiety, sleep issues',
    description: 'I have been struggling with anxiety and insomnia for several weeks. It is affecting my work and daily life significantly.',
    status: 'matched',
    createdAt: new Date('2024-01-22T13:15:00'),
    updatedAt: new Date('2024-01-23T09:45:00'),
    zipCode: '10001',
  },
];

export const specialties = [
  'Family Medicine',
  'Internal Medicine',
  'Cardiology',
  'Dermatology',
  'Psychiatry',
  'Pediatrics',
  'Orthopedics',
  'Neurology',
  'Oncology',
  'Endocrinology',
  'Gastroenterology',
  'Pulmonology',
  'Rheumatology',
  'Urology',
  'Ophthalmology',
];

// Pharmacy chains for prescription requests
export const pharmacyChains = [
  'CVS Pharmacy',
  'Walgreens',
  'Rite Aid',
  'Duane Reade',
  'Local Independent Pharmacy',
];

// Simple auth mock - in a real app, this would be handled by a proper auth service
export const mockAuth = {
  currentUser: null as (Provider | Patient) | null,
  
  login: (email: string, password: string, role: 'provider' | 'patient') => {
    if (role === 'provider') {
      const provider = mockProviders.find(p => p.email === email);
      if (provider) {
        mockAuth.currentUser = provider;
        return provider;
      }
    } else {
      const patient = mockPatients.find(p => p.email === email);
      if (patient) {
        mockAuth.currentUser = patient;
        return patient;
      }
    }
    return null;
  },
  
  logout: () => {
    mockAuth.currentUser = null;
  },
  
  isAuthenticated: () => mockAuth.currentUser !== null,
}; 