import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Provider, MedicalRequest } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

export function getAgeFromDate(birthDate: Date): number {
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1;
  }
  
  return age;
}

export function getUrgencyColor(urgency: string): string {
  switch (urgency) {
    case 'urgent':
      return 'text-red-600 bg-red-50';
    case 'high':
      return 'text-orange-600 bg-orange-50';
    case 'medium':
      return 'text-yellow-600 bg-yellow-50';
    case 'low':
      return 'text-green-600 bg-green-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'pending':
      return 'text-yellow-600 bg-yellow-50';
    case 'matched':
      return 'text-blue-600 bg-blue-50';
    case 'accepted':
      return 'text-green-600 bg-green-50';
    case 'in-progress':
      return 'text-purple-600 bg-purple-50';
    case 'completed':
      return 'text-gray-600 bg-gray-50';
    case 'cancelled':
      return 'text-red-600 bg-red-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}

// Calculate distance between two zip codes (simplified - in real app would use geolocation API)
function getZipCodeDistance(zip1: string, zip2: string): number {
  // Simple proximity calculation based on numeric difference
  // In a real app, you'd use actual geolocation data
  const num1 = parseInt(zip1);
  const num2 = parseInt(zip2);
  return Math.abs(num1 - num2);
}

// Provider matching algorithm
export function matchProvidersToRequest(
  providers: Provider[],
  request: MedicalRequest
): Provider[] {
  const matchedProviders = providers
    .filter(provider => {
      // Must be available
      if (!provider.isAvailable) return false;
      
      // Must have matching specialty
      const hasMatchingSpecialty = provider.specialties.some(specialty =>
        specialty.toLowerCase().includes(request.specialty.toLowerCase()) ||
        request.specialty.toLowerCase().includes(specialty.toLowerCase())
      );
      if (!hasMatchingSpecialty) return false;
      
      // Must accept patient's insurance (if provided)
      if (request.insurance) {
        const acceptsInsurance = provider.acceptedInsurance.includes(request.insurance);
        if (!acceptsInsurance) return false;
      }
      
      return true;
    })
    .map(provider => ({
      ...provider,
      distance: getZipCodeDistance(provider.zipCode, request.zipCode),
    }))
    .sort((a, b) => {
      // Sort by urgency first, then distance, then rating
      if (request.urgency === 'urgent') {
        return a.distance - b.distance;
      }
      
      // For non-urgent requests, consider rating more heavily
      const aScore = (a.rating * 0.4) + ((100 - a.distance) * 0.3) + (a.yearsExperience * 0.3);
      const bScore = (b.rating * 0.4) + ((100 - b.distance) * 0.3) + (b.yearsExperience * 0.3);
      
      return bScore - aScore;
    })
    .slice(0, 5); // Return top 5 matches
  
  return matchedProviders;
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
} 