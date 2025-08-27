export interface User {
  id: string;
  email: string;
  name: string;
  role: 'provider' | 'patient';
  createdAt: Date;
}

export interface Provider extends User {
  role: 'provider';
  licenseNumber: string;
  specialties: string[];
  zipCode: string;
  licenseStates: string[];
  yearsExperience: number;
  rating: number;
  profileImage?: string;
  isAvailable: boolean;
  acceptedInsurance: string[];
}

export interface Patient extends User {
  role: 'patient';
  dateOfBirth: Date;
  zipCode: string;
  phone: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface MedicalRequest {
  id: string;
  patientId: string;
  patient: Patient;
  providerId?: string;
  provider?: Provider;
  type: 'general-consultation' | 'prescription-request' | 'lab-test-request';
  symptoms: string;
  description: string;
  status: 'pending' | 'matched' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  zipCode: string;
  pharmacy?: {
    name: string;
    address: string;
    phone: string;
  };
}

export interface Appointment {
  id: string;
  patientId: string;
  providerId: string;
  patient: Patient;
  provider: Provider;
  requestId: string;
  scheduledAt: Date;
  duration: number; // in minutes
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  prescription?: string;
  followUpRequired?: boolean;
  followUpDate?: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: 'provider' | 'patient';
}

export interface RequestFormData {
  type: 'general-consultation' | 'prescription-request' | 'lab-test-request';
  symptoms: string;
  description: string;
  pharmacy?: {
    name: string;
    address: string;
    phone: string;
  };
} 