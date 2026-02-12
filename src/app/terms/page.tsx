import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Read the terms and conditions governing your use of the Xpress Health telehealth platform and services.',
  alternates: { canonical: '/terms' },
};

export default function TermsOfUse() {
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
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Terms of Use</h1>
          <p className="text-lg text-gray-600">www.xpresshealth.care</p>
          <p className="text-sm text-gray-400 mt-2">Last Updated: February 12, 2026</p>
        </div>

        {/* Intro */}
        <div className="mb-4 rounded-xl bg-gray-50 border border-gray-200 p-6">
          <p className="text-gray-700 text-sm leading-relaxed">
            These Terms of Use, together with our <Link href="/privacy" className="text-emerald-600 hover:text-emerald-700 underline">Privacy Policy</Link>, form a binding agreement (&ldquo;Agreement&rdquo;) between Xpress Health, LLC, a Georgia limited liability company (&ldquo;Xpress Health,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), and you. This Agreement governs your use of our website at www.xpresshealth.care and any associated mobile applications (the &ldquo;Sites&rdquo;).
          </p>
        </div>

        {/* Important notices */}
        <div className="mb-4 rounded-xl bg-amber-50 border border-amber-200 p-6">
          <p className="text-amber-900 text-sm leading-relaxed font-semibold">
            BY ACCESSING OR USING THE SITES OR SERVICES, YOU AGREE TO BE BOUND BY THIS AGREEMENT. If you do not agree, discontinue use immediately. We may update these terms at any time; continued use constitutes acceptance.
          </p>
        </div>

        <div className="mb-8 rounded-xl bg-red-50 border border-red-200 p-6">
          <p className="text-red-900 text-sm leading-relaxed font-semibold">
            IMPORTANT: If you have a medical emergency, call 911 or seek in-person care immediately. Our Services are not a substitute for emergency care.
          </p>
        </div>

        <div className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-base prose-h3:font-semibold prose-h3:mt-6 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-li:leading-relaxed">

          <h2>1. Services</h2>
          <p>
            Xpress Health provides a telehealth platform that facilitates communication between patients and authorized medical providers (the &ldquo;Services&rdquo;). We are not a healthcare provider. By using our Services, you are not entering a provider-patient relationship with Xpress Health — however, you may enter such a relationship with a medical provider using the platform.
          </p>
          <p>
            Medical providers are solely responsible for all diagnoses, treatment recommendations, and medical advice delivered through the platform. Xpress Health does not control, review, or interfere with any clinical decisions.
          </p>
          <p>
            <strong>Payment:</strong> All services are provided on a cash-pay basis outside of federal or state healthcare programs. You are solely responsible for all costs. Subscriptions auto-renew and may be canceled at least 48 hours before renewal by emailing <a href="mailto:admin@xpresshealth.care">admin@xpresshealth.care</a> or calling <a href="tel:+17622132273">(762) 213-2273</a>.
          </p>

          <h2>2. License &amp; Intellectual Property</h2>
          <p>
            Subject to compliance with this Agreement, Xpress Health grants you a personal, non-exclusive, non-transferable license to access the Sites for personal, non-commercial use. All content, data, and materials on the Sites (&ldquo;Materials&rdquo;) are owned by Xpress Health or our licensors and protected by intellectual property law.
          </p>
          <p>
            Any content you submit through the Services (&ldquo;Submissions&rdquo;) grants Xpress Health a fully paid, royalty-free, perpetual, worldwide license to use such content for operating the Services, subject to applicable privacy protections.
          </p>

          <h2>3. Use Restrictions</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Access other users&apos; data</li>
            <li>Share your credentials</li>
            <li>Use bots, scrapers, or automated tools</li>
            <li>Breach security measures</li>
            <li>Reverse-engineer any software</li>
            <li>Submit harmful, false, or infringing content</li>
            <li>Resell the Services</li>
          </ul>
          <p>You are responsible for maintaining account confidentiality and for all activity under your account.</p>

          <h2>4. Eligibility</h2>
          <p>
            The Services are intended for individuals 18 years or older. Users ages 13&ndash;17 may use the Services with parental or guardian consent. The Services are not directed at children under 13.
          </p>

          <h2>5. Protected Health Information</h2>
          <p>
            Account registration information (name, email, phone) is not considered protected health information. Medical information you provide through the Services may be protected under applicable law. Xpress Health is not a &ldquo;covered entity&rdquo; under HIPAA but may act as a &ldquo;business associate&rdquo; for certain providers. Your health data is handled in accordance with our <Link href="/privacy" className="text-emerald-600 hover:text-emerald-700">Privacy Policy</Link> and applicable law.
          </p>

          <h2>6. Disclaimers</h2>
          <div className="rounded-xl bg-red-50 border border-red-200 p-5 not-prose mb-6">
            <p className="font-semibold text-red-900 mb-2">XPRESS HEALTH IS NOT A MEDICAL PROVIDER.</p>
            <p className="text-sm text-red-800 leading-relaxed">
              The Sites and Services are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not guarantee error-free operation, uninterrupted access, or specific results. We are not responsible for acts, omissions, or information provided by third-party providers, labs, or pharmacies.
            </p>
          </div>

          <h2>7. Limitation of Liability</h2>
          <p>
            <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW, XPRESS HEALTH SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING FROM YOUR USE OF THE SITES OR SERVICES. OUR TOTAL LIABILITY SHALL NOT EXCEED THE GREATER OF $100 OR THE AMOUNT YOU PAID FOR THE SERVICES.</strong>
          </p>

          <h2>8. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Xpress Health and its officers, directors, employees, and agents from any claims, damages, or costs arising from your breach of this Agreement or your use of the Services.
          </p>

          <h2>9. Dispute Resolution &amp; Arbitration</h2>
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-5 not-prose mb-6">
            <p className="font-semibold text-amber-900 mb-2">ARBITRATION AGREEMENT</p>
            <p className="text-sm text-amber-800 leading-relaxed mb-3">
              Any dispute arising from this Agreement or the Services shall be resolved by binding individual arbitration administered by the American Arbitration Association in Cobb County, Georgia, under Georgia law. You waive the right to a jury trial and to participate in any class action.
            </p>
            <p className="text-sm text-amber-800 leading-relaxed mb-3">
              <strong>Opt-Out:</strong> You may opt out within 30 days of first agreeing to arbitration by sending written notice to <a href="mailto:admin@xpresshealth.care" className="text-amber-900 underline">admin@xpresshealth.care</a>.
            </p>
            <p className="text-sm text-amber-800 leading-relaxed">
              Before filing arbitration, you must send a written Notice of Claim to: 3721 New Macland Road, Powder Springs, Georgia 30127.
            </p>
          </div>

          <h2>10. Termination</h2>
          <p>
            Either party may terminate at any time. Xpress Health may suspend or terminate your account for any reason without notice. Sections regarding intellectual property, disclaimers, limitation of liability, indemnification, and dispute resolution survive termination.
          </p>

          <h2>11. General Provisions</h2>
          <p>
            This Agreement constitutes the entire agreement between you and Xpress Health regarding the Services. It is governed by Georgia law. If any provision is found unenforceable, the remaining provisions remain in effect. For questions, contact us at <a href="mailto:admin@xpresshealth.care">admin@xpresshealth.care</a> or call <a href="tel:+17622132273">(762) 213-2273</a>.
          </p>

          <h2>Contact Information</h2>
          <p>
            <strong>Xpress Health, LLC</strong><br />
            3721 New Macland Road, Powder Springs, Georgia 30127<br />
            Email: <a href="mailto:admin@xpresshealth.care">admin@xpresshealth.care</a><br />
            Phone: <a href="tel:+17622132273">(762) 213-2273</a>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Xpress Health, LLC. All rights reserved.</p>
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
