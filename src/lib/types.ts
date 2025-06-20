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
  insurance?: string;
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
  type: 'consultation' | 'prescription' | 'follow-up' | 'urgent-care';
  specialty: string;
  symptoms: string;
  description: string;
  urgency: 'low' | 'medium' | 'high' | 'urgent';
  preferredDateTime?: Date;
  status: 'pending' | 'matched' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  zipCode: string;
  insurance?: string;
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
  type: 'consultation' | 'prescription' | 'follow-up' | 'urgent-care';
  specialty: string;
  symptoms: string;
  description: string;
  urgency: 'low' | 'medium' | 'high' | 'urgent';
  preferredDateTime?: Date;
  insurance?: string;
} 