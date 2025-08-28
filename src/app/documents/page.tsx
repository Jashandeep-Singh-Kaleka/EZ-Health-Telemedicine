'use client';

import React, { useState, useRef } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { 
  Upload, 
  File, 
  FileText, 
  Image, 
  Download, 
  Share2, 
  Trash2, 
  Eye,
  Plus,
  Search,
  Filter,
  Calendar,
  User,
  Lock,
  Unlock,
  FolderOpen,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { mockAuth } from '@/lib/mock-data';

interface Document {
  id: string;
  name: string;
  type: 'lab-result' | 'prescription' | 'medical-record' | 'insurance' | 'image' | 'other';
  fileType: string;
  size: number;
  uploadedBy: string;
  uploadedAt: Date;
  sharedWith: string[];
  isPrivate: boolean;
  status: 'processing' | 'ready' | 'error';
  description?: string;
  tags: string[];
}

export default function Documents() {
  const currentUser = mockAuth.currentUser;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'lab-result' | 'prescription' | 'medical-record' | 'image'>('all');
  const [dragOver, setDragOver] = useState(false);

  // Mock documents data
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 'doc-1',
      name: 'Blood Test Results - January 2024',
      type: 'lab-result',
      fileType: 'PDF',
      size: 245760, // 240 KB
      uploadedBy: 'Dr. Sarah Smith',
      uploadedAt: new Date('2024-01-20'),
      sharedWith: ['patient-1'],
      isPrivate: false,
      status: 'ready',
      description: 'Complete blood count and metabolic panel results',
      tags: ['blood-test', 'routine', '2024']
    },
    {
      id: 'doc-2',
      name: 'Chest X-Ray - Respiratory Consultation',
      type: 'image',
      fileType: 'JPEG',
      size: 1048576, // 1 MB
      uploadedBy: 'Dr. Michael Johnson',
      uploadedAt: new Date('2024-01-15'),
      sharedWith: ['patient-1'],
      isPrivate: false,
      status: 'ready',
      description: 'Chest X-ray for respiratory symptoms evaluation',
      tags: ['x-ray', 'respiratory', 'consultation']
    },
    {
      id: 'doc-3',
      name: 'Prescription - Amoxicillin',
      type: 'prescription',
      fileType: 'PDF',
      size: 102400, // 100 KB
      uploadedBy: 'Dr. Sarah Smith',
      uploadedAt: new Date('2024-01-10'),
      sharedWith: ['patient-1'],
      isPrivate: false,
      status: 'ready',
      description: 'Antibiotic prescription for bacterial infection',
      tags: ['prescription', 'antibiotic', 'amoxicillin']
    },
    {
      id: 'doc-4',
      name: 'Insurance Card - Front and Back',
      type: 'insurance',
      fileType: 'PNG',
      size: 512000, // 500 KB
      uploadedBy: 'John Doe',
      uploadedAt: new Date('2024-01-05'),
      sharedWith: ['provider-1'],
      isPrivate: true,
      status: 'ready',
      description: 'Insurance card images for billing purposes',
      tags: ['insurance', 'billing', 'verification']
    },
    {
      id: 'doc-5',
      name: 'MRI Results - Processing',
      type: 'medical-record',
      fileType: 'PDF',
      size: 2097152, // 2 MB
      uploadedBy: 'Dr. Emily Davis',
      uploadedAt: new Date('2024-01-25'),
      sharedWith: ['patient-2'],
      isPrivate: false,
      status: 'processing',
      description: 'Brain MRI results - currently being processed',
      tags: ['mri', 'brain', 'neurology']
    }
  ]);

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'lab-result':
        return <FileText className="h-6 w-6 text-blue-500" />;
      case 'prescription':
        return <FileText className="h-6 w-6 text-emerald-500" />;
      case 'medical-record':
        return <File className="h-6 w-6 text-purple-500" />;
      case 'insurance':
        return <FileText className="h-6 w-6 text-orange-500" />;
      case 'image':
        return <Image className="h-6 w-6 text-pink-500" />;
      default:
        return <File className="h-6 w-6 text-gray-500" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <File className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files || !currentUser) return;
    
    Array.from(files).forEach(file => {
      const newDocument: Document = {
        id: `doc-${Date.now()}-${Math.random()}`,
        name: file.name,
        type: 'other',
        fileType: file.type.split('/')[1]?.toUpperCase() || 'UNKNOWN',
        size: file.size,
        uploadedBy: currentUser.name,
        uploadedAt: new Date(),
        sharedWith: currentUser.role === 'patient' ? ['provider-1'] : ['patient-1'],
        isPrivate: false,
        status: 'processing',
        tags: ['uploaded', new Date().getFullYear().toString()]
      };
      
      setDocuments(prev => [newDocument, ...prev]);
      
      // Simulate processing time
      setTimeout(() => {
        setDocuments(prev => prev.map(doc => 
          doc.id === newDocument.id ? { ...doc, status: 'ready' as const } : doc
        ));
      }, 2000);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const handleDownload = (doc: Document) => {
    // In real app, would download the file
    alert(`Downloading ${doc.name}...`);
  };

  const handleShare = (doc: Document) => {
    // In real app, would open share dialog
    alert(`Sharing ${doc.name}...`);
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    
    // Filter by user permissions
    if (currentUser?.role === 'patient') {
      return matchesSearch && matchesType && (doc.uploadedBy === currentUser.name || doc.sharedWith.includes('patient-1'));
    } else if (currentUser?.role === 'provider') {
      return matchesSearch && matchesType && (doc.uploadedBy === currentUser.name || doc.sharedWith.includes('provider-1'));
    }
    
    return matchesSearch && matchesType;
  });

  if (!currentUser) {
    return <Layout><div>Please log in to view documents.</div></Layout>;
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <FolderOpen className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Medical Documents</h1>
              <p className="text-sm text-gray-500">
                {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''} available
              </p>
            </div>
          </div>
          
          <Button onClick={() => fileInputRef.current?.click()}>
            <Plus className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>

        {/* Upload Area */}
        <Card 
          className={`border-2 border-dashed transition-colors ${
            dragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <CardContent className="p-8 text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              Drag and drop files here, or click to select
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Supports PDF, JPEG, PNG files up to 10MB
            </p>
            <Button 
              variant="outline" 
              onClick={() => fileInputRef.current?.click()}
            >
              Choose Files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
            />
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documents, descriptions, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Type Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as typeof typeFilter)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="lab-result">Lab Results</option>
                  <option value="prescription">Prescriptions</option>
                  <option value="medical-record">Medical Records</option>
                  <option value="image">Images</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.length === 0 ? (
            <div className="col-span-full">
              <Card>
                <CardContent className="p-8 text-center">
                  <FolderOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No documents found</p>
                </CardContent>
              </Card>
            </div>
          ) : (
            filteredDocuments.map(document => (
              <Card key={document.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      {getDocumentIcon(document.type)}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate" title={document.name}>
                          {document.name}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          {getStatusIcon(document.status)}
                          <span className={`text-xs font-medium ${
                            document.status === 'ready' ? 'text-green-600' :
                            document.status === 'processing' ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {document.status === 'ready' ? 'Ready' :
                             document.status === 'processing' ? 'Processing' : 'Error'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {document.isPrivate ? (
                        <Lock className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Unlock className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {document.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {document.description}
                    </p>
                  )}

                  {/* Metadata */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {document.uploadedBy}
                      </span>
                      <span>{document.fileType}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {document.uploadedAt.toLocaleDateString()}
                      </span>
                      <span>{formatFileSize(document.size)}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  {document.tags.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {document.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                            {tag}
                          </span>
                        ))}
                        {document.tags.length > 3 && (
                          <span className="text-xs text-gray-400">+{document.tags.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(document)}
                        disabled={document.status !== 'ready'}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(document)}
                        disabled={document.status !== 'ready'}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShare(document)}
                        disabled={document.status !== 'ready'}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteDocument(document.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}