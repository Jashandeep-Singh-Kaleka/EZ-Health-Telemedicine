'use client';

import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { AlertCircle, FileText, Shield } from 'lucide-react';

export default function TermsOfService() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600">
            Please read these terms carefully before using XPress Health services
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: January 26, 2024
          </p>
        </div>

        {/* Important Notice */}
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-orange-900 mb-2">Important Notice</h3>
                <p className="text-orange-800 text-sm">
                  By using XPress Health services, you acknowledge that you have read, understood, 
                  and agree to be bound by these Terms of Service. If you do not agree to these terms, 
                  you may not use our services.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 1. Acceptance of Terms */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">1. Acceptance of Terms</h2>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) govern your use of XPress Health&apos;s 
              telemedicine platform and services (&ldquo;Service&rdquo;) operated by XPress Health 
              (&ldquo;us&rdquo;, &ldquo;we&rdquo;, or &ldquo;our&rdquo;).
            </p>
            <p>
              By accessing or using our Service, you agree to be bound by these Terms. 
              These Terms apply to all visitors, users, patients, and healthcare providers 
              who access or use the Service.
            </p>
          </CardContent>
        </Card>

        {/* 2. Description of Service */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">2. Description of Service</h2>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <p>
              XPress Health provides a telemedicine platform that connects patients with 
              licensed healthcare providers for virtual consultations, prescription services, 
              and other healthcare-related services.
            </p>
            <h4 className="font-semibold text-gray-900">Our services include:</h4>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Virtual consultations with licensed healthcare providers</li>
              <li>Prescription request and fulfillment services</li>
              <li>Laboratory test ordering and coordination</li>
              <li>Secure messaging between patients and providers</li>
              <li>Medical record management and access</li>
              <li>Payment processing for healthcare services</li>
            </ul>
          </CardContent>
        </Card>

        {/* 3. Eligibility and Registration */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">3. Eligibility and Registration</h2>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <h4 className="font-semibold text-gray-900">Patient Eligibility:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>You must be at least 18 years old</li>
              <li>You must be located in a jurisdiction where our services are available</li>
              <li>You must provide accurate and complete information during registration</li>
              <li>You are responsible for maintaining the confidentiality of your account</li>
            </ul>
            
            <h4 className="font-semibold text-gray-900 mt-6">Healthcare Provider Requirements:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Must hold a valid medical license in good standing</li>
              <li>Must maintain appropriate malpractice insurance</li>
              <li>Must comply with all applicable medical and professional standards</li>
              <li>Must verify identity and credentials through our verification process</li>
            </ul>
          </CardContent>
        </Card>

        {/* 4. Medical Disclaimer */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <h2 className="text-xl font-semibold text-red-900">4. Medical Disclaimer</h2>
          </CardHeader>
          <CardContent className="space-y-4 text-red-800">
            <div className="flex items-start space-x-3">
              <Shield className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
              <div className="space-y-3">
                <p className="font-semibold">
                  IMPORTANT: XPress Health is not a healthcare provider and does not 
                  practice medicine.
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>We facilitate connections between patients and independent healthcare providers</li>
                  <li>All medical advice, diagnosis, and treatment decisions are made solely by licensed healthcare providers</li>
                  <li>We do not guarantee any specific medical outcomes or results</li>
                  <li>Our services are not suitable for medical emergencies</li>
                  <li>For emergencies, call 911 or visit your nearest emergency room immediately</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 5. Payment Terms */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibent text-gray-900">5. Payment Terms</h2>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <p>
              XPress Health operates on a cash-only payment model. We do not accept 
              insurance or process insurance claims.
            </p>
            <h4 className="font-semibold text-gray-900">Pricing:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>General consultations: $65 per session</li>
              <li>Prescription requests: $65 per request</li>
              <li>Lab test coordination: $65 per order</li>
              <li>Additional fees may apply for specialized services</li>
            </ul>
            
            <h4 className="font-semibold text-gray-900">Payment Processing:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Payment is required before service delivery</li>
              <li>All payments are processed securely through encrypted systems</li>
              <li>Refunds are subject to our refund policy</li>
              <li>You are responsible for all applicable taxes</li>
            </ul>
          </CardContent>
        </Card>

        {/* 6. Privacy and Data Security */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">6. Privacy and Data Security</h2>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <p>
              We are committed to protecting your privacy and maintaining the security 
              of your personal health information (PHI) in compliance with HIPAA and 
              other applicable privacy laws.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>We implement industry-standard security measures to protect your data</li>
              <li>Your PHI is encrypted both in transit and at rest</li>
              <li>We only share your information as permitted by law or with your consent</li>
              <li>You have rights regarding your PHI as outlined in our Privacy Policy</li>
            </ul>
            <p className="text-sm text-blue-600">
              Please see our Privacy Policy for detailed information about how we collect, 
              use, and protect your information.
            </p>
          </CardContent>
        </Card>

        {/* 7. User Responsibilities */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">7. User Responsibilities</h2>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <h4 className="font-semibold text-gray-900">You agree to:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Provide accurate and complete information about your health</li>
              <li>Use the Service only for lawful purposes</li>
              <li>Respect the privacy and rights of other users</li>
              <li>Follow all instructions provided by healthcare providers</li>
              <li>Keep your account information secure and confidential</li>
              <li>Report any suspicious activity or security breaches</li>
            </ul>
            
            <h4 className="font-semibold text-gray-900 mt-4">You agree not to:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Use the Service for any illegal or unauthorized purpose</li>
              <li>Attempt to gain unauthorized access to other users&apos; accounts</li>
              <li>Transmit any harmful, offensive, or inappropriate content</li>
              <li>Interfere with or disrupt the Service</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </CardContent>
        </Card>

        {/* 8. Limitation of Liability */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">8. Limitation of Liability</h2>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <p className="font-semibold text-gray-900">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                XPress Health shall not be liable for any indirect, incidental, 
                special, or consequential damages
              </li>
              <li>
                Our total liability shall not exceed the amount you paid for the 
                specific service giving rise to the claim
              </li>
              <li>
                We are not responsible for the actions or omissions of healthcare 
                providers using our platform
              </li>
              <li>
                We do not guarantee the availability, accuracy, or completeness of our Service
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* 9. Termination */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">9. Termination</h2>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <p>
              Either party may terminate these Terms at any time. We reserve the right 
              to suspend or terminate your access to the Service for any violation of these Terms.
            </p>
            <h4 className="font-semibold text-gray-900">Upon termination:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Your right to use the Service will cease immediately</li>
              <li>We will retain your medical records as required by law</li>
              <li>You remain responsible for any unpaid fees</li>
              <li>Provisions that should survive termination will remain in effect</li>
            </ul>
          </CardContent>
        </Card>

        {/* 10. Changes to Terms */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">10. Changes to Terms</h2>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <p>
              We reserve the right to modify these Terms at any time. We will notify 
              users of significant changes by posting a notice on our platform or 
              sending an email notification.
            </p>
            <p>
              Your continued use of the Service after such modifications constitutes 
              acceptance of the updated Terms.
            </p>
          </CardContent>
        </Card>

        {/* 11. Governing Law */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">11. Governing Law</h2>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <p>
              These Terms shall be governed by and construed in accordance with the 
              laws of the State of New York, without regard to its conflict of law principles.
            </p>
            <p>
              Any disputes arising from these Terms or your use of the Service shall 
              be resolved through binding arbitration in accordance with the rules of 
              the American Arbitration Association.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <h2 className="text-xl font-semibold text-blue-900">Contact Information</h2>
          </CardHeader>
          <CardContent className="text-blue-800">
            <p className="mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2">
              <p><strong>Email:</strong> legal@xpresshealth.com</p>
              <p><strong>Address:</strong> XPress Health Legal Department</p>
              <p className="ml-16">123 Healthcare Plaza, Suite 456</p>
              <p className="ml-16">New York, NY 10001</p>
              <p><strong>Phone:</strong> 1-800-XPRESS-1</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}