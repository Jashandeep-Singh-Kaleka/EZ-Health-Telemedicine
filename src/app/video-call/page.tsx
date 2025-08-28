'use client';

import React, { useState, useRef, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  Monitor, 
  MessageSquare,
  Users,
  Camera
} from 'lucide-react';
import { mockAuth, mockProviders, mockPatients } from '@/lib/mock-data';


export default function VideoCall() {
  const currentUser = mockAuth.currentUser;
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isCallActive, setIsCallActive] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{id: string, sender: string, message: string, timestamp: Date}>>([]);
  const [newMessage, setNewMessage] = useState('');
  const [callDuration, setCallDuration] = useState(0);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  // Simulate call timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  // Mock other participant
  const otherParticipant = currentUser?.role === 'provider' 
    ? mockPatients.find(p => p.id === 'patient-1')
    : mockProviders.find(p => p.id === 'provider-1');

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartCall = async () => {
    setIsCallActive(true);
    // In a real app, this would initialize WebRTC connection
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setCallDuration(0);
    // Clean up media streams
    if (localVideoRef.current?.srcObject) {
      const tracks = (localVideoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    // In real app, would toggle video track
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    // In real app, would toggle audio track
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    // In real app, would start/stop screen sharing
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: currentUser?.name || 'User',
        message: newMessage,
        timestamp: new Date()
      }]);
      setNewMessage('');
    }
  };

  if (!currentUser) {
    return <Layout><div>Please log in to access video calls.</div></Layout>;
  }

  // Only allow providers to access this page
  if (currentUser.role !== 'provider') {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Video className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Restricted</h1>
          <p className="text-gray-600 mb-8">
            The Video Call feature is only available to medical providers.
          </p>
          <Button onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Call Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Video Consultation with {otherParticipant?.name}
                </h1>
                <p className="text-sm text-gray-500">
                  {isCallActive ? `Call Duration: ${formatDuration(callDuration)}` : 'Ready to connect'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                isCallActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {isCallActive ? 'Connected' : 'Waiting'}
              </span>
            </div>
          </div>
        </div>

        {/* Video Call Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Video Area */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-0">
                <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{aspectRatio: '16/9'}}>
                  {/* Remote Video */}
                  <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Mock remote video placeholder */}
                  {!isCallActive && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="h-24 w-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Users className="h-12 w-12 text-gray-400" />
                        </div>
                        <p className="text-white text-lg">{otherParticipant?.name}</p>
                        <p className="text-gray-400">Waiting to connect...</p>
                      </div>
                    </div>
                  )}

                  {/* Local Video (Picture in Picture) */}
                  <div className="absolute top-4 right-4 w-48 h-32 bg-gray-800 rounded-lg overflow-hidden border-2 border-white">
                    <video
                      ref={localVideoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                    {!isVideoEnabled && (
                      <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                        <div className="h-12 w-12 bg-gray-600 rounded-full flex items-center justify-center">
                          <Camera className="h-6 w-6 text-gray-400" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Screen Sharing Indicator */}
                  {isScreenSharing && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-md text-sm flex items-center">
                      <Monitor className="h-4 w-4 mr-1" />
                      Screen Sharing
                    </div>
                  )}
                </div>

                {/* Call Controls */}
                <div className="p-4 bg-white border-t">
                  <div className="flex items-center justify-center space-x-4">
                    {/* Audio Toggle */}
                    <Button
                      variant={isAudioEnabled ? "primary" : "danger"}
                      size="lg"
                      onClick={toggleAudio}
                      className="rounded-full"
                    >
                      {isAudioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                    </Button>

                    {/* Video Toggle */}
                    <Button
                      variant={isVideoEnabled ? "primary" : "danger"}
                      size="lg"
                      onClick={toggleVideo}
                      className="rounded-full"
                    >
                      {isVideoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                    </Button>

                    {/* Call Start/End */}
                    <Button
                      variant={isCallActive ? "danger" : "primary"}
                      size="lg"
                      onClick={isCallActive ? handleEndCall : handleStartCall}
                      className="rounded-full px-8"
                    >
                      {isCallActive ? <PhoneOff className="h-5 w-5 mr-2" /> : <Phone className="h-5 w-5 mr-2" />}
                      {isCallActive ? 'End Call' : 'Start Call'}
                    </Button>

                    {/* Screen Share */}
                    <Button
                      variant={isScreenSharing ? "danger" : "primary"}
                      size="lg"
                      onClick={toggleScreenShare}
                      className="rounded-full"
                    >
                      <Monitor className="h-5 w-5" />
                    </Button>

                    {/* Chat Toggle */}
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setShowChat(!showChat)}
                      className="rounded-full"
                    >
                      <MessageSquare className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Sidebar */}
          {showChat && (
            <div className="lg:col-span-1">
              <Card className="h-96">
                <CardHeader>
                  <h3 className="font-semibold">Chat</h3>
                </CardHeader>
                <CardContent className="flex flex-col h-full p-0">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {chatMessages.map(msg => (
                      <div key={msg.id} className={`flex ${msg.sender === currentUser.name ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs p-2 rounded-lg text-sm ${
                          msg.sender === currentUser.name 
                            ? 'bg-emerald-500 text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p>{msg.message}</p>
                          <p className={`text-xs mt-1 ${msg.sender === currentUser.name ? 'text-emerald-100' : 'text-gray-500'}`}>
                            {msg.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="border-t p-4">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type a message..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <Button size="sm" onClick={sendMessage}>
                        Send
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Call Information */}
        {isCallActive && (
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Connection Quality:</span>
                  <span className="ml-2 text-green-600 font-medium">Excellent</span>
                </div>
                <div>
                  <span className="text-gray-500">Audio:</span>
                  <span className="ml-2 text-gray-900 font-medium">
                    {isAudioEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Video:</span>
                  <span className="ml-2 text-gray-900 font-medium">
                    {isVideoEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}