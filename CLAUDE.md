# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with turbopack (runs on http://localhost:3000)
- `npm run build` - Build the production application  
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## Project Architecture

### Core Technologies
- **Next.js 15** with App Router and TypeScript
- **Tailwind CSS v4** for styling with PostCSS
- **React 19** with hooks and context for state management
- **React Hook Form + Zod** for form validation
- **Lucide React** for icons

### Authentication System
Uses mock authentication (`src/lib/mock-data.ts:237-262`) with role-based access:
- Providers: Healthcare professionals with specialties and availability
- Patients: Users seeking medical care with insurance and demographic info
- Authentication state managed through `mockAuth` object with login/logout methods

### Data Architecture
All data types defined in `src/lib/types.ts`:
- **User hierarchy**: Base User interface extended by Provider and Patient
- **MedicalRequest**: Patient care requests with status tracking (pending → matched → accepted → completed)
- **Appointment**: Scheduled provider-patient interactions
- Mock data in `src/lib/mock-data.ts` includes realistic providers, patients, and requests

### Provider Matching Algorithm
Sophisticated matching system considering:
- Specialty alignment (exact or related specialties)
- Geographic proximity (zip code based)
- Insurance acceptance
- Provider availability status
- Urgency level (urgent requests prioritize distance over rating)
- Provider ratings for non-urgent requests

### Page Structure & Routing
- **Landing/Login** (`src/app/page.tsx`) - Role selection and authentication
- **Dashboard** (`src/app/dashboard/page.tsx`) - Role-specific overview
- **Patient Flow**:
  - `src/app/request-care/page.tsx` - Medical request submission
  - `src/app/appointments/page.tsx` - View scheduled appointments
- **Provider Flow**:
  - `src/app/requests/page.tsx` - View and accept patient requests  
  - `src/app/patients/page.tsx` - Manage active patients
- **Shared**:
  - `src/app/profile/page.tsx` - User profile management
  - `src/app/medical-records/page.tsx` - Medical history
  - `src/app/billing/page.tsx` - Payment and billing

### Component Architecture
- **Layout System**: `src/components/Layout.tsx` handles authentication routing and navigation
- **Navigation**: `src/components/Navigation.tsx` provides role-based navigation menu
- **UI Components**: `src/components/ui/` contains reusable Button and Card components
- **Path Alias**: `@/*` maps to `src/*` for clean imports

### Key Features
- Role-based interfaces with different navigation and functionality
- Real-time request status tracking through mock data updates
- Responsive design optimized for healthcare workflows
- Form validation with comprehensive error handling
- Mock telemedicine appointment system

### Demo Credentials
Hardcoded demo users for testing:
- **Providers**: dr.smith@email.com, dr.johnson@email.com, etc. (password: "demo")
- **Patients**: john.doe@email.com, mary.smith@email.com, etc. (password: "demo")

### Development Notes
- Uses Tailwind CSS v4 with modern configuration
- TypeScript strict mode enabled
- ESLint configured with Next.js and TypeScript rules
- All state management through React hooks and context
- Mock data simulates real healthcare workflow patterns