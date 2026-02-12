import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how Xpress Health collects, uses, discloses, and safeguards your personal information when you use our telehealth platform.',
  alternates: { canonical: '/privacy' },
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
          <p className="text-lg text-gray-600">www.xpresshealth.care</p>
          <p className="text-sm text-gray-400 mt-2">Effective Date: February 12, 2026</p>
        </div>

        {/* Intro */}
        <div className="mb-8 rounded-xl bg-emerald-50 border border-emerald-200 p-6">
          <p className="text-emerald-800 text-sm leading-relaxed">
            Xpress Health, LLC (&ldquo;Xpress Health,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting the privacy and security of your personal information. This Privacy Policy describes how we collect, use, disclose, and safeguard information when you visit our website at www.xpresshealth.care or use our telehealth platform and related services (collectively, the &ldquo;Services&rdquo;).
          </p>
          <p className="text-emerald-800 text-sm leading-relaxed mt-3">
            By accessing or using our Services, you acknowledge that you have read and understood this Privacy Policy. If you do not agree, please discontinue use of the Services.
          </p>
        </div>

        <div className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-base prose-h3:font-semibold prose-h3:mt-6 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-li:leading-relaxed">

          <h2>1. Information We Collect</h2>
          <h3>Account Information</h3>
          <p>When you register, we collect your name, email address, phone number, date of birth, mailing address, and payment information.</p>
          <h3>Health Information</h3>
          <p>Through the Services, you may provide medical history, symptoms, medications, lab results, and other health-related data. This information is shared with your medical provider to facilitate care.</p>
          <h3>Automatically Collected Information</h3>
          <p>We may collect:</p>
          <ul>
            <li>Device information (IP address, browser type, operating system)</li>
            <li>Usage data (pages visited, features used, session duration)</li>
            <li>Cookies or similar tracking technologies</li>
          </ul>
          <h3>Communications</h3>
          <p>Records of your communications with us or with providers through the platform.</p>

          <h2>2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Provide, operate, and maintain the telehealth Services</li>
            <li>Facilitate communication between you and medical providers</li>
            <li>Process payments and manage your account</li>
            <li>Send service-related notifications (appointment reminders, test results, account updates)</li>
            <li>Improve and personalize the Services</li>
            <li>Comply with legal obligations and enforce our Terms of Use</li>
            <li>Detect, prevent, and address fraud, security issues, or technical problems</li>
          </ul>

          <h2>3. How We Share Your Information</h2>
          <p><strong>We do not sell your personal information.</strong> We may share your information with:</p>
          <ul>
            <li><strong>Medical Providers:</strong> Licensed healthcare professionals who deliver care through our platform, as necessary to provide treatment.</li>
            <li><strong>Labs &amp; Pharmacies:</strong> Third-party labs and pharmacies that fulfill orders placed through the Services.</li>
            <li><strong>Service Providers:</strong> Trusted vendors who assist with payment processing, data hosting, analytics, and customer support, under contractual obligations to protect your data.</li>
            <li><strong>Legal Compliance:</strong> When required by law, court order, subpoena, or to protect our rights, safety, or property.</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We implement administrative, technical, and physical safeguards to protect your information, including encryption in transit and at rest, access controls, and regular security assessments. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2>5. Data Retention</h2>
          <p>
            We retain your personal information for as long as your account is active or as needed to provide Services, comply with legal obligations, resolve disputes, and enforce our agreements. Health information may be retained as required by applicable medical record retention laws.
          </p>

          <h2>6. Your Rights &amp; Choices</h2>
          <ul>
            <li><strong>Account Information:</strong> You may update or correct your account information by logging into your account or contacting us.</li>
            <li><strong>Communications:</strong> You may opt out of promotional emails by following the unsubscribe instructions. You cannot opt out of service-related communications.</li>
            <li><strong>Cookies:</strong> Most browsers allow you to manage cookie preferences. Disabling cookies may affect functionality.</li>
            <li><strong>Data Deletion:</strong> You may request deletion of your account and personal information by contacting us at admin@xpresshealth.care. Certain data may be retained as required by law.</li>
          </ul>

          <h2>7. HIPAA &amp; Health Information</h2>
          <p>
            Xpress Health is not a &ldquo;covered entity&rdquo; under HIPAA. However, we may serve as a &ldquo;business associate&rdquo; for certain medical providers, labs, or pharmacies that are covered entities. In such cases, we handle protected health information (&ldquo;PHI&rdquo;) in accordance with applicable HIPAA requirements and our Business Associate Agreements. Our Services operate on a cash-pay basis outside of federal and state healthcare programs.
          </p>

          <h2>8. Children&apos;s Privacy</h2>
          <p>
            Our Services are not directed to children under 13. We do not knowingly collect personal information from children under 13. Users ages 13&ndash;17 may only use the Services with verified parental or guardian consent. If we learn we have collected information from a child under 13, we will promptly delete it.
          </p>

          <h2>9. Third-Party Links</h2>
          <p>
            The Services may contain links to third-party websites, including pharmacy locators and lab services. We are not responsible for the privacy practices or content of those sites. We encourage you to review the privacy policies of any third-party sites you visit.
          </p>

          <h2>10. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The updated version will be posted on our website with a revised effective date. Your continued use of the Services after changes are posted constitutes acceptance of the updated policy. We encourage you to review this policy periodically.
          </p>

          <h2>11. Contact Us</h2>
          <p>If you have questions or concerns about this Privacy Policy or our data practices, please contact us:</p>
          <p>
            <strong>Xpress Health, LLC</strong><br />
            3721 New Macland Road, Powder Springs, Georgia 30127<br />
            Email: <a href="mailto:admin@xpresshealth.care">admin@xpresshealth.care</a><br />
            Phone: <a href="tel:+17622132273">(762) 213-2273</a><br />
            Website: <a href="https://www.xpresshealth.care">www.xpresshealth.care</a>
          </p>

          <h2>12. State-Specific Disclosures</h2>
          <p><strong>Georgia Residents:</strong> This Privacy Policy complies with applicable Georgia privacy and consumer protection laws.</p>
          <p>
            <strong>California Residents:</strong> If you are a California resident, you may have additional rights under the California Consumer Privacy Act (CCPA), including the right to know, delete, and opt out of the sale of personal information. We do not sell personal information. To exercise your rights, contact us at <a href="mailto:admin@xpresshealth.care">admin@xpresshealth.care</a>.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Xpress Health, LLC. All rights reserved.</p>
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
