'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { mockAuth } from '@/lib/mock-data';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import { 
  UserPlus, 
  Share2, 
  Copy, 
  Mail, 
  MessageSquare, 
  QrCode,
  CheckCircle,
  Users,
  Link,
  Download,
  Globe
} from 'lucide-react';

export default function InvitePatients() {
  const currentUser = mockAuth.currentUser;
  const [copiedLink, setCopiedLink] = useState(false);
  const [emailForm, setEmailForm] = useState({
    emails: '',
    message: ''
  });
  const [invitesSent, setInvitesSent] = useState(0);

  if (!currentUser || currentUser.role !== 'provider') {
    return null;
  }

  // Generate unique provider link
  const providerLink = `https://xpresshealth.com/provider/${currentUser.id}`;
  
  const defaultMessage = `Hi! I'm Dr. ${currentUser.name}, and I'd like to invite you to connect with me through XPress Health, a secure telemedicine platform. 

Through this platform, you can:
• Request prescriptions instantly
• Order lab tests 
• Schedule consultations
• Get quick medical advice

It's cash-only with transparent pricing - no insurance hassles!

Click the link below to get started:
${providerLink}

Best regards,
Dr. ${currentUser.name}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(providerLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleSendInvites = () => {
    const emails = emailForm.emails.split(',').map(email => email.trim()).filter(Boolean);
    
    // Simulate sending invites
    console.log('Sending invites to:', emails);
    console.log('Message:', emailForm.message || defaultMessage);
    
    setInvitesSent(emails.length);
    setEmailForm({ emails: '', message: '' });
    
    // Reset success message after 3 seconds
    setTimeout(() => setInvitesSent(0), 3000);
  };

  const shareOptions = [
    {
      name: 'Copy Link',
      icon: <Copy className="h-5 w-5" />,
      action: handleCopyLink,
      description: 'Copy your unique provider link',
      color: 'bg-blue-100 text-blue-600 hover:bg-blue-200'
    },
    {
      name: 'Email',
      icon: <Mail className="h-5 w-5" />,
      action: () => window.open(`mailto:?subject=Invitation to Connect on XPress Health&body=${encodeURIComponent(defaultMessage)}`),
      description: 'Send invitation via email',
      color: 'bg-green-100 text-green-600 hover:bg-green-200'
    },
    {
      name: 'Text Message',
      icon: <MessageSquare className="h-5 w-5" />,
      action: () => window.open(`sms:?body=${encodeURIComponent(`Hi! I'd like to invite you to connect with me on XPress Health: ${providerLink}`)}`),
      description: 'Send invitation via SMS',
      color: 'bg-purple-100 text-purple-600 hover:bg-purple-200'
    }
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* XPress Health Logo Header */}
        <div className="flex items-center justify-center mb-8">
          <Image 
            src="/xpress-health-logo.svg" 
            alt="XPress Health Logo" 
            width={200} 
            height={50}
            className="h-12 w-auto"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invite Patients</h1>
          <p className="text-gray-600 mt-2">
            Share your unique link to connect with patients and grow your practice
          </p>
        </div>

        {/* Success Message */}
        {invitesSent > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <p className="text-green-800 font-medium">
                Successfully sent {invitesSent} invitation{invitesSent > 1 ? 's' : ''}!
              </p>
            </div>
          </div>
        )}

        {/* Your Provider Link */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Link className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Your Provider Link</h3>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <code className="text-sm text-gray-700 break-all">{providerLink}</code>
                <Button
                  onClick={handleCopyLink}
                  variant="outline"
                  size="sm"
                  className="ml-4 flex-shrink-0"
                >
                  {copiedLink ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Share this link with patients to allow them to find and connect with you directly. 
              They can request prescriptions, lab tests, and consultations through this personalized link.
            </p>
          </CardContent>
        </Card>

        {/* Quick Share Options */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Share2 className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Quick Share</h3>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {shareOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={option.action}
                  className={`p-4 rounded-lg border-2 border-transparent transition-all duration-200 ${option.color}`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-3">
                      {option.icon}
                    </div>
                    <h4 className="font-medium mb-1">{option.name}</h4>
                    <p className="text-xs opacity-80">{option.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bulk Email Invitations */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Send Email Invitations</h3>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="emails" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Addresses
                </label>
                <input
                  id="emails"
                  type="text"
                  value={emailForm.emails}
                  onChange={(e) => setEmailForm({ ...emailForm, emails: e.target.value })}
                  placeholder="patient1@email.com, patient2@email.com, ..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter multiple email addresses separated by commas
                </p>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Message (Optional)
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={emailForm.message}
                  onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                  placeholder={defaultMessage}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave blank to use the default invitation message
                </p>
              </div>

              <Button
                onClick={handleSendInvites}
                disabled={!emailForm.emails.trim()}
                className="w-full"
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Invitations
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Marketing Materials */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <QrCode className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">QR Code</h3>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-4 inline-block">
                  {/* Mock QR Code - in real app would generate actual QR code */}
                  <div className="w-32 h-32 bg-gray-900 rounded-lg flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-white" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Print this QR code for your office, business cards, or marketing materials
                </p>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Download QR Code
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Website Integration</h3>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">HTML Button Code</p>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <code className="text-xs text-gray-700 block break-all">
                      {`<a href="${providerLink}" 
   class="bg-blue-600 text-white px-4 py-2 rounded">
  Connect with Dr. ${currentUser.name}
</a>`}
                    </code>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Social Media Copy</p>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-700">
                      "Now accepting patients through XPress Health! Get instant prescriptions, lab tests, 
                      and consultations. Cash-only, transparent pricing. Connect with me: {providerLink}"
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-1" />
                  Copy Website Code
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits for Patients */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Why Patients Love XPress Health</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Instant Prescriptions</h4>
                    <p className="text-sm text-gray-600">Get prescriptions sent directly to their pharmacy</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Quick Lab Orders</h4>
                    <p className="text-sm text-gray-600">Order lab tests without office visits</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">24/7 Consultations</h4>
                    <p className="text-sm text-gray-600">Message you anytime for medical advice</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Transparent Pricing</h4>
                    <p className="text-sm text-gray-600">Cash-only with upfront, fair pricing</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">No Insurance Hassles</h4>
                    <p className="text-sm text-gray-600">Skip the insurance paperwork and delays</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Secure & Private</h4>
                    <p className="text-sm text-gray-600">HIPAA-compliant platform with end-to-end encryption</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}