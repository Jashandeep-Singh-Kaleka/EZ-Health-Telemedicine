# XPress Health - Telemedicine Platform

A modern, responsive telemedicine platform built with Next.js, similar to Push Health Portal. This application connects patients with healthcare providers through a secure, user-friendly interface.

## 🏥 Features

### For Patients
- **Easy Registration & Login** - Simple role-based authentication
- **Request Medical Care** - Submit detailed medical requests with urgency levels
- **Smart Provider Matching** - Automatic matching based on specialty, location, and insurance
- **Appointment Management** - View and manage upcoming appointments
- **Medical Records** - Access to medical history and records
- **Real-time Updates** - Track request status and provider assignments

### For Healthcare Providers
- **Professional Dashboard** - Overview of practice statistics and patient load
- **Patient Request Queue** - View and accept patient requests in your specialty
- **Smart Matching** - Receive requests based on specialty, location, and accepted insurance
- **Patient Management** - Manage active patients and their care
- **Appointment Scheduling** - Schedule and manage patient appointments
- **Profile Management** - Update availability, specialties, and credentials

### General Features
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Modern UI/UX** - Clean, intuitive interface with Tailwind CSS
- **Real-time Matching** - Advanced algorithm for provider-patient matching
- **Role-based Navigation** - Different interfaces for patients and providers
- **Mock Data Integration** - Fully functional with realistic test data

## 🚀 Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Custom components with Lucide React icons
- **Forms:** React Hook Form with Zod validation
- **State Management:** React hooks and context
- **Authentication:** Mock authentication system (easily replaceable)

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn package manager

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd xpress-health-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Demo Credentials

### Healthcare Providers
| Email | Password | Specialty | 
|-------|----------|-----------|
| dr.smith@email.com | demo | Family Medicine, Internal Medicine |
| dr.johnson@email.com | demo | Cardiology, Internal Medicine |
| dr.williams@email.com | demo | Dermatology, Cosmetic Dermatology |
| dr.brown@email.com | demo | Psychiatry, Psychology |
| dr.davis@email.com | demo | Pediatrics, Family Medicine |

### Patients
| Email | Password | Insurance |
|-------|----------|-----------|
| john.doe@email.com | demo | Blue Cross |
| mary.smith@email.com | demo | Aetna |
| alex.jones@email.com | demo | Cigna |

## 📱 How to Use

### As a Patient

1. **Login/Register**
   - Select "Patient" role on the homepage
   - Use demo credentials or create a new account

2. **Request Care**
   - Navigate to "Request Care" 
   - Fill out the medical request form
   - Select urgency level and preferred time
   - Submit request for provider matching

3. **Track Requests**
   - View request status on your dashboard
   - See assigned providers and appointment details

4. **Manage Appointments**
   - View upcoming appointments
   - Join video calls with providers

### As a Healthcare Provider

1. **Login**
   - Select "Healthcare Provider" role
   - Use demo provider credentials

2. **Review Requests**
   - Check "New Requests" for pending patient requests
   - View detailed patient information and symptoms
   - See match quality scores

3. **Accept Patients**
   - Accept requests that match your specialty
   - Patients automatically move to your active patients list

4. **Manage Patients**
   - View all your active patients
   - Schedule appointments and consultations
   - Track patient progress

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Main dashboard
│   ├── requests/          # Provider request management
│   ├── request-care/      # Patient care request form
│   ├── patients/          # Provider patient management
│   ├── appointments/      # Appointment management
│   ├── profile/           # User profile management
│   └── page.tsx           # Landing/login page
├── components/            # Reusable React components
│   ├── ui/               # UI components (Button, Card, etc.)
│   ├── Layout.tsx        # Main layout wrapper
│   └── Navigation.tsx    # Navigation component
├── lib/                  # Utility functions and data
│   ├── types.ts          # TypeScript type definitions
│   ├── utils.ts          # Utility functions
│   └── mock-data.ts      # Mock data and authentication
└── styles/               # Global styles
```

## 🔄 Provider Matching Algorithm

The application includes a sophisticated matching algorithm that considers:

- **Specialty Match** - Exact or related specialty matching
- **Geographic Proximity** - Based on zip code distance
- **Insurance Acceptance** - Provider accepts patient's insurance
- **Provider Availability** - Only available providers are matched
- **Urgency Level** - Urgent requests prioritize distance over rating
- **Provider Rating** - Higher-rated providers get priority for non-urgent requests

## 🎨 Design Principles

- **User-Centered Design** - Intuitive interfaces for both patients and providers
- **Accessibility** - WCAG-compliant design with proper contrast and navigation
- **Mobile-First** - Responsive design optimized for all devices
- **Performance** - Optimized loading and smooth interactions
- **Security** - Mock authentication ready for production security integration

## 🔒 Security Features

- Role-based access control
- Input validation and sanitization
- Secure routing and authentication checks
- HIPAA-ready architecture (mock implementation)

## 🚀 Deployment

The application is ready for deployment on platforms like:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Docker containers

## 🔮 Future Enhancements

- Real authentication system (Auth0, NextAuth.js)
- Database integration (PostgreSQL, MongoDB)
- Real-time messaging and video calls
- Payment processing integration
- Advanced scheduling system
- Mobile app (React Native)
- Telemedicine compliance features
- Advanced analytics and reporting

## 🐛 Known Issues

- Mock authentication persists only during session
- No real-time updates (would require WebSocket implementation)
- Limited mobile optimizations (can be enhanced)

## 🤝 Contributing

This is a demo application. For production use, consider:

1. Implementing proper authentication
2. Adding database persistence
3. Implementing real-time features
4. Adding comprehensive testing
5. Enhancing security measures
6. Adding HIPAA compliance features

## 📄 License

This project is for demonstration purposes. Use responsibly and ensure compliance with healthcare regulations for production use.

## 🆘 Support

For questions or issues with this demo application, please refer to the code comments and documentation within the source files.

---

**Note:** This is a demonstration application with mock data. For production use in healthcare, ensure compliance with HIPAA, data security regulations, and medical software standards.
