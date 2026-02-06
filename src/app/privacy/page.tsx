import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — XPress Health',
  description: 'Learn how XPress Health protects your personal and health information in compliance with HIPAA.',
};

export default function PrivacyPolicy() {
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
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-emerald-50 flex items-center justify-center">
            <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
          <p className="text-lg text-gray-600">Your privacy and the security of your health information is our top priority</p>
          <p className="text-sm text-gray-400 mt-2">Last updated: January 26, 2024</p>
        </div>

        {/* HIPAA Notice */}
        <div className="mb-8 rounded-xl bg-emerald-50 border border-emerald-200 p-6">
          <h3 className="font-semibold text-emerald-900 mb-2">HIPAA Compliance Commitment</h3>
          <p className="text-emerald-800 text-sm leading-relaxed">
            XPress Health is committed to protecting your Protected Health Information (PHI) in compliance with the Health Insurance Portability and Accountability Act (HIPAA) and other applicable privacy laws. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal and health information.
          </p>
        </div>

        <div className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-base prose-h3:font-semibold prose-h3:mt-6 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-li:leading-relaxed">
          <h2>1. Information We Collect</h2>
          <h3>Personal Information</h3>
          <ul>
            <li>Name, address, phone number, email address</li>
            <li>Date of birth and government-issued ID information</li>
            <li>Emergency contact information</li>
            <li>Payment and billing information</li>
            <li>Device information and IP address</li>
          </ul>

          <h3>Protected Health Information (PHI)</h3>
          <ul>
            <li>Medical history, symptoms, and health concerns</li>
            <li>Prescription and medication information</li>
            <li>Laboratory test results and orders</li>
            <li>Provider consultations and treatment records</li>
            <li>Mental health and behavioral health information</li>
            <li>Any other health-related information you provide</li>
          </ul>

          <h3>Usage Information</h3>
          <ul>
            <li>How you use our platform and services</li>
            <li>Login times and session duration</li>
            <li>Pages visited and features used</li>
            <li>Messages and communications within the platform</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use your information only as permitted by HIPAA and applicable laws:</p>
          <h3>Treatment Purposes</h3>
          <ul>
            <li>Facilitating consultations between you and healthcare providers</li>
            <li>Enabling providers to deliver appropriate medical care</li>
            <li>Coordinating prescription fulfillment and lab test orders</li>
            <li>Maintaining your medical records and history</li>
          </ul>
          <h3>Payment Operations</h3>
          <ul>
            <li>Processing payments for services rendered</li>
            <li>Billing and account management</li>
            <li>Fraud prevention and financial verification</li>
          </ul>
          <h3>Healthcare Operations</h3>
          <ul>
            <li>Quality assurance and improvement activities</li>
            <li>Platform security and technical maintenance</li>
            <li>Compliance with legal and regulatory requirements</li>
            <li>Customer support and technical assistance</li>
          </ul>

          <h2>3. Information Sharing and Disclosure</h2>
          <p><strong>We do not sell, rent, or share your PHI except as described below:</strong></p>
          <h3>With Your Consent</h3>
          <ul>
            <li>When you explicitly authorize us to share your information</li>
            <li>For purposes you have specifically approved</li>
          </ul>
          <h3>For Treatment</h3>
          <ul>
            <li>With healthcare providers delivering your care</li>
            <li>With pharmacies for prescription fulfillment</li>
            <li>With laboratories for test processing</li>
          </ul>
          <h3>As Required by Law</h3>
          <ul>
            <li>To comply with court orders or legal processes</li>
            <li>To report communicable diseases to public health authorities</li>
            <li>For law enforcement investigations when legally required</li>
            <li>To prevent serious harm or injury</li>
          </ul>
          <h3>Business Associates</h3>
          <ul>
            <li>Third-party service providers who assist with our operations</li>
            <li>All business associates sign HIPAA-compliant agreements</li>
            <li>They are contractually required to protect your PHI</li>
          </ul>

          <h2>4. Data Security Measures</h2>
          <p>We implement comprehensive security measures to protect your information:</p>
          <h3>Technical Safeguards</h3>
          <ul>
            <li>256-bit SSL encryption for all data transmission</li>
            <li>AES-256 encryption for data storage</li>
            <li>Multi-factor authentication for account access</li>
            <li>Regular security audits and penetration testing</li>
            <li>Automated backup and disaster recovery systems</li>
          </ul>
          <h3>Administrative Safeguards</h3>
          <ul>
            <li>Role-based access controls and user permissions</li>
            <li>Regular employee privacy and security training</li>
            <li>Incident response and breach notification procedures</li>
            <li>Business associate agreements with all vendors</li>
          </ul>
          <h3>Physical Safeguards</h3>
          <ul>
            <li>Secure data centers with 24/7 monitoring</li>
            <li>Biometric access controls and security cameras</li>
            <li>Environmental controls and redundant power systems</li>
          </ul>

          <h2>5. Your Privacy Rights Under HIPAA</h2>
          <p>You have the following rights regarding your PHI:</p>
          <ul>
            <li><strong>Right to Access:</strong> Request copies of your medical records and access your PHI in electronic format.</li>
            <li><strong>Right to Amend:</strong> Request corrections to inaccurate or incomplete PHI.</li>
            <li><strong>Right to Restrict:</strong> Request limits on how we use or disclose your PHI.</li>
            <li><strong>Right to Accounting:</strong> Request a list of disclosures we have made of your PHI.</li>
            <li><strong>Right to Alternative Communication:</strong> Request that we communicate with you in a specific way or at alternative locations.</li>
          </ul>
          <p>To exercise any of these rights, please contact our Privacy Officer using the information provided below.</p>

          <h2>6. Data Retention</h2>
          <ul>
            <li><strong>Medical Records:</strong> Retained for a minimum of 7 years after your last interaction</li>
            <li><strong>Payment Information:</strong> Retained for 7 years for tax and audit purposes</li>
            <li><strong>Account Information:</strong> Retained for as long as your account is active</li>
            <li><strong>Communications:</strong> Retained for 3 years unless longer retention is required</li>
          </ul>

          <h2>7. Cookies and Tracking Technologies</h2>
          <p>We use cookies and similar technologies to maintain your session, improve functionality, analyze usage, and ensure security. We do not use cookies to track PHI or share your health information with third parties for advertising purposes.</p>

          <h2>8. Children&apos;s Privacy</h2>
          <p>Our services are not intended for individuals under 18 years of age. We do not knowingly collect PHI from children under 18 without appropriate parental consent. If you believe your child has provided us with PHI, please contact our Privacy Officer immediately.</p>

          <h2>9. Breach Notification</h2>
          <p>In the unlikely event of a data breach involving your PHI, we will notify you within 60 days, provide details about the information involved, explain steps we are taking, offer guidance on self-protection, and notify relevant authorities as required by law.</p>

          <h2>10. Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy periodically. We will post updated policies, send email notifications for material changes, and update the &ldquo;Last Updated&rdquo; date. Your continued use of our services constitutes acceptance of the updated policy.</p>

          <h2>Privacy Officer Contact Information</h2>
          <p>For questions about this Privacy Policy or to exercise your privacy rights:</p>
          <ul>
            <li><strong>Email:</strong> privacy@xpresshealth.care</li>
            <li><strong>Response Time:</strong> Within 30 days of receiving your request</li>
          </ul>

          <h2>Filing Privacy Complaints</h2>
          <p>If you believe your privacy rights have been violated, you may file a complaint with XPress Health or the U.S. Department of Health and Human Services, Office for Civil Rights (OCR). We will not retaliate against you for filing a complaint.</p>
        </div>
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} XPress Health. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-emerald-600 transition-colors font-medium text-emerald-600">Privacy</Link>
            <Link href="/terms" className="hover:text-emerald-600 transition-colors">Terms</Link>
            <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
