'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare, Send, Clock, User, Video, Phone, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { RequestFormData } from '@/lib/types';
import { mockAuth } from '@/lib/mock-data';
import { formatDateTime } from '@/lib/utils';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'patient' | 'provider';
  content: string;
  timestamp: Date;
  type: 'text' | 'appointment' | 'prescription' | 'file';
}

interface Conversation {
  id: string;
  providerId: string;
  providerName: string;
  status: 'active' | 'completed' | 'waiting_response';
  lastMessage: Date;
  messages: Message[];
}

const consultationTypes = [
  {
    id: 'general-question',
    title: 'General Health Question',
    description: 'Ask questions about your health, medications, or medical concerns',
    icon: '🩺'
  },
  {
    id: 'symptoms',
    title: 'Discuss Symptoms',
    description: 'Get professional advice about symptoms you are experiencing',
    icon: '🤒'
  },
  {
    id: 'medication',
    title: 'Medication Questions',
    description: 'Questions about your current medications or side effects',
    icon: '💊'
  },
  {
    id: 'follow-up',
    title: 'Follow-up Care',
    description: 'Follow up on previous treatments or test results',
    icon: '📋'
  },
  {
    id: 'wellness',
    title: 'Wellness & Prevention',
    description: 'Discuss preventive care, lifestyle changes, or wellness plans',
    icon: '🌟'
  },
  {
    id: 'urgent',
    title: 'Urgent Consultation',
    description: 'Need to speak with a provider about an urgent medical matter',
    icon: '🚨'
  }
];

export default function MessageProvider() {
  const router = useRouter();
  const currentUser = mockAuth.currentUser;
  const [activeView, setActiveView] = useState<'conversations' | 'new-consultation' | 'chat'>('conversations');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [formData, setFormData] = useState<RequestFormData>({
    type: 'general-consultation',
    symptoms: '',
    description: '',
  });
  const [selectedConsultationType, setSelectedConsultationType] = useState('');

  if (!currentUser || currentUser.role !== 'patient') {
    return null;
  }

  // Mock conversation data
  const conversations: Conversation[] = [
    {
      id: '1',
      providerId: '1',
      providerName: 'Dr. Sarah Smith',
      status: 'active',
      lastMessage: new Date('2024-01-26T14:30:00'),
      messages: [
        {
          id: '1',
          senderId: currentUser.id,
          senderName: currentUser.name,
          senderRole: 'patient',
          content: 'Hi Dr. Smith, I\'ve been experiencing some headaches lately and wanted to get your advice.',
          timestamp: new Date('2024-01-26T10:00:00'),
          type: 'text'
        },
        {
          id: '2',
          senderId: '1',
          senderName: 'Dr. Sarah Smith',
          senderRole: 'provider',
          content: 'Hello! I\'m sorry to hear about your headaches. Can you tell me more about when they started and how severe they are on a scale of 1-10?',
          timestamp: new Date('2024-01-26T10:15:00'),
          type: 'text'
        },
        {
          id: '3',
          senderId: currentUser.id,
          senderName: currentUser.name,
          senderRole: 'patient',
          content: 'They started about a week ago. I\'d say they\'re about a 6-7 in terms of severity. They\'re worse in the morning.',
          timestamp: new Date('2024-01-26T10:30:00'),
          type: 'text'
        },
        {
          id: '4',
          senderId: '1',
          senderName: 'Dr. Sarah Smith',
          senderRole: 'provider',
          content: 'Thank you for that information. Based on what you\'ve described, I\'d like to schedule a video consultation to discuss this further and potentially prescribe something to help. Are you available tomorrow at 2 PM?',
          timestamp: new Date('2024-01-26T14:30:00'),
          type: 'appointment'
        }
      ]
    },
    {
      id: '2',
      providerId: '4',
      providerName: 'Dr. David Brown',
      status: 'waiting_response',
      lastMessage: new Date('2024-01-25T16:45:00'),
      messages: [
        {
          id: '5',
          senderId: currentUser.id,
          senderName: currentUser.name,
          senderRole: 'patient',
          content: 'Dr. Brown, I\'ve been having trouble sleeping and feeling anxious. Could we discuss some options?',
          timestamp: new Date('2024-01-25T16:45:00'),
          type: 'text'
        }
      ]
    },
    {
      id: '3',
      providerId: '3',
      providerName: 'Dr. Emily Williams',
      status: 'completed',
      lastMessage: new Date('2024-01-20T11:30:00'),
      messages: [
        {
          id: '6',
          senderId: currentUser.id,
          senderName: currentUser.name,
          senderRole: 'patient',
          content: 'Hi Dr. Williams, I have a skin rash that I\'d like you to look at.',
          timestamp: new Date('2024-01-20T09:00:00'),
          type: 'text'
        },
        {
          id: '7',
          senderId: '3',
          senderName: 'Dr. Emily Williams',
          senderRole: 'provider',
          content: 'I\'ve reviewed your case and prescribed a topical cream. You should see improvement within 3-5 days. Please let me know if it doesn\'t improve.',
          timestamp: new Date('2024-01-20T11:30:00'),
          type: 'prescription'
        }
      ]
    }
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // In a real app, this would send the message to the backend
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  const handleStartNewConsultation = () => {
    if (!selectedConsultationType || !formData.symptoms || !formData.description) {
      return;
    }

    // In a real app, this would create a new consultation request
    console.log('Starting new consultation:', {
      type: selectedConsultationType,
      formData
    });

    // Simulate creating new conversation
    setActiveView('conversations');
  };

  const currentConversation = conversations.find(c => c.id === selectedConversation);

  if (activeView === 'chat' && currentConversation) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto h-[600px] flex flex-col">
          {/* Chat Header */}
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setActiveView('conversations')}
                    className="px-3"
                  >
                    ← Back
                  </Button>
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{currentConversation.providerName}</h3>
                      <p className="text-sm text-gray-600">
                        {currentConversation.status === 'active' ? 'Active consultation' : 
                         currentConversation.status === 'waiting_response' ? 'Waiting for response' : 'Completed'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    <Video className="h-4 w-4 mr-2" />
                    Video Call
                  </Button>
                  <Button size="sm" variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Voice Call
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Messages */}
          <Card className="flex-1 flex flex-col">
            <CardContent className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {currentConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderRole === 'patient' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.senderRole === 'patient' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      {message.type === 'appointment' && (
                        <div className="flex items-center text-sm mb-2">
                          <Video className="h-4 w-4 mr-2" />
                          Appointment Request
                        </div>
                      )}
                      {message.type === 'prescription' && (
                        <div className="flex items-center text-sm mb-2">
                          <FileText className="h-4 w-4 mr-2" />
                          Prescription Sent
                        </div>
                      )}
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.senderRole === 'patient' ? 'text-blue-200' : 'text-gray-500'
                      }`}>
                        {formatDateTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </Layout>
    );
  }

  if (activeView === 'new-consultation') {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center space-x-4 mb-6">
            <Button
              variant="outline"
              onClick={() => setActiveView('conversations')}
            >
              ← Back to Messages
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Start New Consultation</h1>
              <p className="text-gray-600">Connect with a healthcare provider</p>
            </div>
          </div>

          {/* Consultation Type Selection */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">What type of consultation do you need?</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {consultationTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedConsultationType(type.id)}
                    className={`p-4 border rounded-lg text-left transition-all ${
                      selectedConsultationType === type.id
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{type.icon}</span>
                      <h4 className="font-medium text-gray-900">{type.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Consultation Details */}
          {selectedConsultationType && (
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium text-gray-900">Tell us about your concern</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-2">
                    What are your main symptoms or concerns?
                  </label>
                  <input
                    id="symptoms"
                    type="text"
                    required
                    value={formData.symptoms}
                    onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Headaches, fatigue, skin rash..."
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Please provide more details
                  </label>
                  <textarea
                    id="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Please describe your symptoms, when they started, their severity, and any other relevant information..."
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <AlertCircle className="h-5 w-5 text-blue-600 mr-2" />
                    <h4 className="font-medium text-blue-900">What happens next?</h4>
                  </div>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Your consultation request will be sent to available providers</li>
                    <li>• You&apos;ll receive a response within 2-4 hours during business hours</li>
                    <li>• The provider may ask follow-up questions or schedule a video call</li>
                    <li>• Consultations are $65 and will be charged when a provider accepts your request</li>
                  </ul>
                </div>

                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setActiveView('conversations')}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleStartNewConsultation}
                    disabled={!selectedConsultationType || !formData.symptoms || !formData.description}
                  >
                    Start Consultation
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </Layout>
    );
  }

  // Conversations list view
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
            <p className="text-gray-600">Communicate with your healthcare providers</p>
          </div>
          <Button onClick={() => setActiveView('new-consultation')}>
            <MessageSquare className="h-4 w-4 mr-2" />
            New Consultation
          </Button>
        </div>

        {/* Active Conversations */}
        <div className="space-y-4">
          {conversations.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No conversations yet</h3>
                <p className="text-gray-500 mb-4">
                  Start your first consultation with a healthcare provider
                </p>
                <Button onClick={() => setActiveView('new-consultation')}>
                  Start New Consultation
                </Button>
              </CardContent>
            </Card>
          ) : (
            conversations.map((conversation) => (
              <Card key={conversation.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div 
                    className="flex items-start justify-between"
                    onClick={() => {
                      setSelectedConversation(conversation.id);
                      setActiveView('chat');
                    }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {conversation.providerName}
                          </h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            conversation.status === 'active' ? 'bg-green-100 text-green-800' :
                            conversation.status === 'waiting_response' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {conversation.status === 'active' ? 'Active' :
                             conversation.status === 'waiting_response' ? 'Waiting' : 'Completed'}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          {conversation.messages[conversation.messages.length - 1]?.content.substring(0, 100)}...
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {formatDateTime(conversation.lastMessage)}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      {conversation.status === 'waiting_response' && (
                        <div className="h-3 w-3 bg-blue-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => setActiveView('new-consultation')}
              >
                <MessageSquare className="h-6 w-6 mb-2" />
                Ask a Question
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => router.push('/prescription-request')}
              >
                <FileText className="h-6 w-6 mb-2" />
                Request Prescription
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => router.push('/lab-test-request')}
              >
                <CheckCircle className="h-6 w-6 mb-2" />
                Order Lab Tests
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}