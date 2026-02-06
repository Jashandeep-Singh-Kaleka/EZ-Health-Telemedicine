import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — XPress Health',
  description: 'Read the terms and conditions governing your use of XPress Health telemedicine services.',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/">
            <Image src="/xpress-health-logo.svg" alt="XPress Health" width={160} height={40} className="h-9 w-auto" />
          </Link>
          <Link href="/" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
            &larr; Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Title */}
        <div className="text-center mb-12">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center">
            <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Terms of Service</h1>
          <p className="text-lg text-gray-600">Please read these terms carefully before using XPress Health services</p>
          <p className="text-sm text-gray-400 mt-2">Last updated: January 26, 2024</p>
        </div>

        {/* Important Notice */}
        <div className="mb-8 rounded-xl bg-amber-50 border border-amber-200 p-6">
          <h3 className="font-semibold text-amber-900 mb-2">Important Notice</h3>
          <p className="text-amber-800 text-sm leading-relaxed">
            By using XPress Health services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our services.
          </p>
        </div>

        <div className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-base prose-h3:font-semibold prose-h3:mt-6 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-li:leading-relaxed">
          <h2>1. Acceptance of Terms</h2>
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) govern your use of XPress Health&apos;s telemedicine platform and services (&ldquo;Service&rdquo;) operated by XPress Health (&ldquo;us&rdquo;, &ldquo;we&rdquo;, or &ldquo;our&rdquo;).
          </p>
          <p>
            By accessing or using our Service, you agree to be bound by these Terms. These Terms apply to all visitors, users, patients, and healthcare providers who access or use the Service.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            XPress Health provides a telemedicine platform that connects patients with licensed healthcare providers for virtual consultations, prescription services, and other healthcare-related services.
          </p>
          <h3>Our services include:</h3>
          <ul>
            <li>Virtual consultations with licensed healthcare providers</li>
            <li>Prescription request and fulfillment services</li>
            <li>Laboratory test ordering and coordination</li>
            <li>Secure messaging between patients and providers</li>
            <li>Medical record management and access</li>
            <li>Payment processing for healthcare services</li>
          </ul>

          <h2>3. Eligibility and Registration</h2>
          <h3>Patient Eligibility</h3>
          <ul>
            <li>You must be at least 18 years old</li>
            <li>You must be located in a jurisdiction where our services are available</li>
            <li>You must provide accurate and complete information during registration</li>
            <li>You are responsible for maintaining the confidentiality of your account</li>
          </ul>
          <h3>Healthcare Provider Requirements</h3>
          <ul>
            <li>Must hold a valid medical license in good standing</li>
            <li>Must maintain appropriate malpractice insurance</li>
            <li>Must comply with all applicable medical and professional standards</li>
            <li>Must verify identity and credentials through our verification process</li>
          </ul>

          <h2>4. Medical Disclaimer</h2>
          <div className="rounded-xl bg-red-50 border border-red-200 p-5 not-prose mb-6">
            <p className="font-semibold text-red-900 mb-2">IMPORTANT: XPress Health is not a healthcare provider and does not practice medicine.</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-red-800">
              <li>We facilitate connections between patients and independent healthcare providers</li>
              <li>All medical advice, diagnosis, and treatment decisions are made solely by licensed healthcare providers</li>
              <li>We do not guarantee any specific medical outcomes or results</li>
              <li>Our services are not suitable for medical emergencies</li>
              <li>For emergencies, call 911 or visit your nearest emergency room immediately</li>
            </ul>
          </div>

          <h2>5. Payment Terms</h2>
          <p>XPress Health operates on a cash-only payment model. We do not accept insurance or process insurance claims.</p>
          <h3>Pricing</h3>
          <ul>
            <li>General consultations: $65 per session</li>
            <li>Prescription requests: $65 per request</li>
            <li>Lab test coordination: $65 per order</li>
            <li>Additional fees may apply for specialized services</li>
          </ul>
          <h3>Payment Processing</h3>
          <ul>
            <li>Payment is required before service delivery</li>
            <li>All payments are processed securely through encrypted systems</li>
            <li>Refunds are subject to our refund policy</li>
            <li>You are responsible for all applicable taxes</li>
          </ul>

          <h2>6. Privacy and Data Security</h2>
          <p>
            We are committed to protecting your privacy and maintaining the security of your personal health information (PHI) in compliance with HIPAA and other applicable privacy laws. Please see our <Link href="/privacy" className="text-emerald-600 hover:text-emerald-700">Privacy Policy</Link> for detailed information.
          </p>

          <h2>7. User Responsibilities</h2>
          <h3>You agree to:</h3>
          <ul>
            <li>Provide accurate and complete information about your health</li>
            <li>Use the Service only for lawful purposes</li>
            <li>Respect the privacy and rights of other users</li>
            <li>Follow all instructions provided by healthcare providers</li>
            <li>Keep your account information secure and confidential</li>
            <li>Report any suspicious activity or security breaches</li>
          </ul>
          <h3>You agree not to:</h3>
          <ul>
            <li>Use the Service for any illegal or unauthorized purpose</li>
            <li>Attempt to gain unauthorized access to other users&apos; accounts</li>
            <li>Transmit any harmful, offensive, or inappropriate content</li>
            <li>Interfere with or disrupt the Service</li>
            <li>Violate any applicable laws or regulations</li>
          </ul>

          <h2>8. Limitation of Liability</h2>
          <p><strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</strong></p>
          <ul>
            <li>XPress Health shall not be liable for any indirect, incidental, special, or consequential damages</li>
            <li>Our total liability shall not exceed the amount you paid for the specific service giving rise to the claim</li>
            <li>We are not responsible for the actions or omissions of healthcare providers using our platform</li>
            <li>We do not guarantee the availability, accuracy, or completeness of our Service</li>
          </ul>

          <h2>9. Termination</h2>
          <p>
            Either party may terminate these Terms at any time. We reserve the right to suspend or terminate your access for any violation. Upon termination, your right to use the Service ceases, but we will retain medical records as required by law.
          </p>

          <h2>10. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will notify users of significant changes. Your continued use of the Service after modifications constitutes acceptance of the updated Terms.
          </p>

          <h2>11. Governing Law</h2>
          <p>
            These Terms shall be governed by the laws of the State of New York, without regard to conflict of law principles. Disputes shall be resolved through binding arbitration in accordance with the American Arbitration Association rules.
          </p>

          <h2>Contact Information</h2>
          <p>If you have any questions about these Terms of Service, please contact us:</p>
          <ul>
            <li><strong>Email:</strong> legal@xpresshealth.care</li>
          </ul>
        </div>
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} XPress Health. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-emerald-600 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-emerald-600 transition-colors font-medium text-emerald-600">Terms</Link>
            <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
