'use client';

import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Shield, Lock, Eye, FileText, AlertCircle, CheckCircle } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">
            Your privacy and the security of your health information is our top priority
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: January 26, 2024
          </p>
        </div>

        {/* HIPAA Compliance Notice */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-green-900 mb-2">HIPAA Compliance Commitment</h3>
                <p className="text-green-800 text-sm">
                  XPress Health is committed to protecting your Protected Health Information (PHI) 
                  in compliance with the Health Insurance Portability and Accountability Act (HIPAA) 
                  and other applicable privacy laws. This Privacy Policy explains how we collect, 
                  use, disclose, and safeguard your personal and health information.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 1. Information We Collect */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">1. Information We Collect</h2>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <h4 className="font-semibold text-gray-900 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Personal Information
            </h4>
            <ul className="list-disc list-inside space-y-1 ml-6">
              <li>Name, address, phone number, email address</li>
              <li>Date of birth and government-issued ID information</li>
              <li>Emergency contact information</li>
              <li>Payment and billing information</li>
              <li>Device information and IP address</li>
            </ul>
            
            <h4 className="font-semibold text-gray-900 flex items-center mt-6">
              <Shield className="h-5 w-5 mr-2" />
              Protected Health Information (PHI)
            </h4>
            <ul className="list-disc list-inside space-y-1 ml-6">
              <li>Medical history, symptoms, and health concerns</li>
              <li>Prescription and medication information</li>
              <li>Laboratory test results and orders</li>
              <li>Provider consultations and treatment records</li>
              <li>Mental health and behavioral health information</li>
              <li>Any other health-related information you provide</li>
            </ul>

            <h4 className="font-semibold text-gray-900 flex items-center mt-6">
              <Eye className="h-5 w-5 mr-2" />
              Usage Information
            </h4>
            <ul className="list-disc list-inside space-y-1 ml-6">
              <li>How you use our platform and services</li>
              <li>Login times and session duration</li>
              <li>Pages visited and features used</li>
              <li>Messages and communications within the platform</li>
            </ul>
          </CardContent>
        </Card>

        {/* 2. How We Use Your Information */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">2. How We Use Your Information</h2>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <p>We use your information only as permitted by HIPAA and applicable laws:</p>
            
            <h4 className="font-semibold text-gray-900">Treatment Purposes:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Facilitating consultations between you and healthcare providers</li>
              <li>Enabling providers to deliver appropriate medical care</li>
              <li>Coordinating prescription fulfillment and lab test orders</li>
              <li>Maintaining your medical records and history</li>
            </ul>
            
            <h4 className="font-semibold text-gray-900 mt-4">Payment Operations:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Processing payments for services rendered</li>
              <li>Billing and account management</li>
              <li>Fraud prevention and financial verification</li>
            </ul>
            
            <h4 className="font-semibold text-gray-900 mt-4">Healthcare Operations:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Quality assurance and improvement activities</li>
              <li>Platform security and technical maintenance</li>
              <li>Compliance with legal and regulatory requirements</li>
              <li>Customer support and technical assistance</li>
            </ul>
          </CardContent>
        </Card>

        {/* 3. Information Sharing and Disclosure */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">3. Information Sharing and Disclosure</h2>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <p className="font-semibold text-gray-900">
              We do not sell, rent, or share your PHI except as described below:
            </p>
            
            <h4 className="font-semibold text-gray-900">With Your Consent:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>When you explicitly authorize us to share your information</li>
              <li>For purposes you have specifically approved</li>
            </ul>
            
            <h4 className="font-semibold text-gray-900 mt-4">For Treatment:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>With healthcare providers delivering your care</li>
              <li>With pharmacies for prescription fulfillment</li>
              <li>With laboratories for test processing</li>
            </ul>
            
            <h4 className="font-semibold text-gray-900 mt-4">As Required by Law:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>To comply with court orders or legal processes</li>
              <li>To report communicable diseases to public health authorities</li>
              <li>For law enforcement investigations when legally required</li>
              <li>To prevent serious harm or injury</li>
            </ul>
            
            <h4 className="font-semibold text-gray-900 mt-4">Business Associates:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Third-party service providers who assist with our operations</li>
              <li>All business associates sign HIPAA-compliant agreements</li>
              <li>They are contractually required to protect your PHI</li>
            </ul>
          </CardContent>
        </Card>

        {/* 4. Data Security Measures */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <h2 className="text-xl font-semibold text-blue-900 flex items-center">
              <Lock className="h-6 w-6 mr-2" />
              4. Data Security Measures
            </h2>
          </CardHeader>
          <CardContent className="space-y-4 text-blue-800">
            <p>
              We implement comprehensive security measures to protect your information:
            </p>
            
            <h4 className="font-semibold text-blue-900">Technical Safeguards:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>256-bit SSL encryption for all data transmission</li>
              <li>AES-256 encryption for data storage</li>
              <li>Multi-factor authentication for account access</li>
              <li>Regular security audits and penetration testing</li>
              <li>Automated backup and disaster recovery systems</li>
            </ul>
            
            <h4 className="font-semibold text-blue-900 mt-4">Administrative Safeguards:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Role-based access controls and user permissions</li>
              <li>Regular employee privacy and security training</li>
              <li>Incident response and breach notification procedures</li>
              <li>Business associate agreements with all vendors</li>
            </ul>
            
            <h4 className="font-semibold text-blue-900 mt-4">Physical Safeguards:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Secure data centers with 24/7 monitoring</li>
              <li>Biometric access controls and security cameras</li>
              <li>Environmental controls and redundant power systems</li>
            </ul>
          </CardContent>
        </Card>

        {/* 5. Your Privacy Rights */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">5. Your Privacy Rights Under HIPAA</h2>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <p>You have the following rights regarding your PHI:</p>
            
            <h4 className="font-semibold text-gray-900">Right to Access:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Request copies of your medical records</li>
              <li>Access your PHI in electronic format when possible</li>
            </ul>
            
            <h4 className="font-semibold text-gray-900 mt-4">Right to Amend:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Request corrections to inaccurate or incomplete PHI</li>
              <li>Add statements to your medical record if we deny your request</li>
            </ul>
            
            <h4 className="font-semibold text-gray-900 mt-4">Right to Restrict:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Request limits on how we use or disclose your PHI</li>
              <li>Request that we not share information with specific individuals</li>
            </ul>
            
            <h4 className="font-semibold text-gray-900 mt-4">Right to Accounting:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Request a list of disclosures we have made of your PHI</li>
              <li>Receive information about when and why your PHI was shared</li>
            </ul>
            
            <h4 className="font-semibold text-gray-900 mt-4">Right to Alternative Communication:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Request that we communicate with you in a specific way</li>
              <li>Choose alternative contact methods or locations</li>
            </ul>
            
            <p className="text-sm text-blue-600 mt-4">
              To exercise any of these rights, please contact our Privacy Officer 
              using the information provided at the end of this policy.
            </p>
          </CardContent>
        </Card>

        {/* 6. Data Retention */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">6. Data Retention</h2>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <p>
              We retain your information in accordance with legal requirements and industry standards:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Medical Records:</strong> Retained for a minimum of 7 years after your last interaction</li>
              <li><strong>Payment Information:</strong> Retained for 7 years for tax and audit purposes</li>
              <li><strong>Account Information:</strong> Retained for as long as your account is active</li>
              <li><strong>Communications:</strong> Retained for 3 years unless longer retention is required</li>
            </ul>
            <p>
              After the retention period, we securely delete or destroy your information 
              in accordance with HIPAA requirements.
            </p>
          </CardContent>
        </Card>

        {/* 7. Cookies and Tracking */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">7. Cookies and Tracking Technologies</h2>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <p>We use cookies and similar technologies to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Maintain your login session and platform preferences</li>
              <li>Improve platform functionality and user experience</li>
              <li>Analyze usage patterns and performance metrics</li>
              <li>Ensure platform security and prevent fraud</li>
            </ul>
            <p>
              We do not use cookies to track PHI or share your health information 
              with third parties for advertising purposes.
            </p>
          </CardContent>
        </Card>

        {/* 8. Children's Privacy */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">8. Children&apos;s Privacy</h2>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <p>
              Our services are not intended for individuals under 18 years of age. 
              We do not knowingly collect PHI from children under 18 without appropriate 
              parental consent and compliance with applicable laws.
            </p>
            <p>
              If you are a parent or guardian and believe your child has provided us 
              with PHI, please contact our Privacy Officer immediately.
            </p>
          </CardContent>
        </Card>

        {/* 9. Breach Notification */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <h2 className="text-xl font-semibold text-red-900">9. Breach Notification</h2>
          </CardHeader>
          <CardContent className="space-y-4 text-red-800">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <p>
                  In the unlikely event of a data breach involving your PHI, we will:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li>Notify you within 60 days of discovering the breach</li>
                  <li>Provide details about what information was involved</li>
                  <li>Explain the steps we are taking to address the breach</li>
                  <li>Offer guidance on steps you can take to protect yourself</li>
                  <li>Notify relevant authorities as required by law</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 10. Changes to Privacy Policy */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">10. Changes to This Privacy Policy</h2>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <p>
              We may update this Privacy Policy periodically to reflect changes in our 
              practices, technology, or legal requirements. We will:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Post the updated policy on our platform</li>
              <li>Send email notifications for material changes</li>
              <li>Update the &ldquo;Last Updated&rdquo; date</li>
              <li>Maintain previous versions for your reference</li>
            </ul>
            <p>
              Your continued use of our services after changes become effective 
              constitutes acceptance of the updated policy.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <h2 className="text-xl font-semibold text-blue-900">Privacy Officer Contact Information</h2>
          </CardHeader>
          <CardContent className="text-blue-800">
            <p className="mb-4">
              For questions about this Privacy Policy or to exercise your privacy rights, 
              please contact our Privacy Officer:
            </p>
            <div className="space-y-2">
              <p><strong>Privacy Officer:</strong> Dr. Sarah Johnson, Chief Privacy Officer</p>
              <p><strong>Email:</strong> privacy@xpresshealth.com</p>
              <p><strong>Phone:</strong> 1-800-XPRESS-2</p>
              <p><strong>Address:</strong> XPress Health Privacy Office</p>
              <p className="ml-16">123 Healthcare Plaza, Suite 789</p>
              <p className="ml-16">New York, NY 10001</p>
            </div>
            <div className="mt-6 p-4 bg-blue-100 rounded-lg">
              <p className="text-sm">
                <strong>Response Time:</strong> We will respond to privacy requests within 30 days. 
                For urgent matters, please call our privacy hotline.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Complaints */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Filing Privacy Complaints</h2>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <p>
              If you believe your privacy rights have been violated, you have the right 
              to file a complaint with:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900">XPress Health:</h4>
                <p className="text-sm">Contact our Privacy Officer using the information above</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">U.S. Department of Health and Human Services:</h4>
                <p className="text-sm">Office for Civil Rights (OCR)</p>
                <p className="text-sm">www.hhs.gov/ocr/privacy/hipaa/complaints</p>
              </div>
            </div>
            <p className="text-sm text-green-600 font-medium">
              We will not retaliate against you for filing a complaint.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}