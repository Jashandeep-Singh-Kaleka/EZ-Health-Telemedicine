'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, FileText, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <Image 
                src="/xpress-health-logo.svg" 
                alt="XPress Health Logo" 
                width={120} 
                height={30}
                className="h-8 w-auto filter brightness-0 invert"
              />
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Connecting patients with licensed healthcare providers through secure, 
              convenient telemedicine services.
            </p>
            <div className="flex items-center text-gray-300 text-sm">
              <Shield className="h-4 w-4 mr-2" />
              <span>HIPAA Compliant & Secure</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/prescription-request" className="hover:text-white transition-colors">
                  Prescription Requests
                </Link>
              </li>
              <li>
                <Link href="/lab-test-request" className="hover:text-white transition-colors">
                  Lab Test Orders
                </Link>
              </li>
              <li>
                <Link href="/message-provider" className="hover:text-white transition-colors">
                  Provider Consultations
                </Link>
              </li>
              <li>
                <Link href="/my-visits" className="hover:text-white transition-colors">
                  Medical Records
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal & Support</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors flex items-center">
                  <Shield className="h-3 w-3 mr-1" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors flex items-center">
                  <FileText className="h-3 w-3 mr-1" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="mailto:support@xpresshealth.com" className="hover:text-white transition-colors">
                  Help & Support
                </a>
              </li>
              <li>
                <a href="mailto:privacy@xpresshealth.com" className="hover:text-white transition-colors">
                  Privacy Officer
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start">
                <Phone className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p>1-800-XPRESS-1</p>
                  <p className="text-xs text-gray-400">Available 24/7</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p>support@xpresshealth.com</p>
                  <p className="text-xs text-gray-400">General inquiries</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p>123 Healthcare Plaza</p>
                  <p>New York, NY 10001</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              <p>&copy; 2024 XPress Health. All rights reserved.</p>
              <p className="text-xs mt-1">
                Licensed healthcare providers • Cash-only telemedicine platform
              </p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
              <span className="flex items-center">
                <Shield className="h-4 w-4 mr-1" />
                HIPAA Compliant
              </span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 pt-6 border-t border-gray-800">
          <div className="text-xs text-gray-500 leading-relaxed">
            <p className="mb-2">
              <strong>Medical Disclaimer:</strong> XPress Health is a technology platform that connects 
              patients with independent, licensed healthcare providers. We do not practice medicine or 
              provide medical advice. All medical care, advice, diagnoses, and treatment decisions are 
              made solely by licensed healthcare providers.
            </p>
            <p>
              <strong>Emergency Notice:</strong> This platform is not intended for medical emergencies. 
              For urgent medical situations, call 911 or visit your nearest emergency room immediately.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}