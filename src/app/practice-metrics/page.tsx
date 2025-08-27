'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { mockAuth, mockRequests } from '@/lib/mock-data';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Image from 'next/image';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users, 
  Clock,
  CheckCircle,
  DollarSign,
  Calendar,
  Star,
  Activity,
  Pill,
  FlaskConical,
  MessageSquare
} from 'lucide-react';

type MetricPeriod = '7d' | '30d' | '90d' | '1y';

export default function PracticeMetrics() {
  const currentUser = mockAuth.currentUser;
  const [period, setPeriod] = useState<MetricPeriod>('30d');

  if (!currentUser || currentUser.role !== 'provider') {
    return null;
  }

  const myRequests = mockRequests.filter(r => r.providerId === currentUser.id);

  // Mock metrics data
  const getMetricsForPeriod = (period: MetricPeriod) => {
    const baseMetrics = {
      totalPatients: 45,
      newPatients: 12,
      totalRequests: 89,
      completedRequests: 76,
      prescriptionRequests: 34,
      labTestRequests: 28,
      consultations: 27,
      averageRating: 4.8,
      totalRevenue: 8950,
      averageResponseTime: 2.4, // hours
    };

    // Simulate different metrics for different periods
    const multipliers = {
      '7d': 0.25,
      '30d': 1,
      '90d': 2.8,
      '1y': 11.5
    };

    const mult = multipliers[period];
    
    return {
      ...baseMetrics,
      totalPatients: Math.round(baseMetrics.totalPatients * mult),
      newPatients: Math.round(baseMetrics.newPatients * mult),
      totalRequests: Math.round(baseMetrics.totalRequests * mult),
      completedRequests: Math.round(baseMetrics.completedRequests * mult),
      prescriptionRequests: Math.round(baseMetrics.prescriptionRequests * mult),
      labTestRequests: Math.round(baseMetrics.labTestRequests * mult),
      consultations: Math.round(baseMetrics.consultations * mult),
      totalRevenue: Math.round(baseMetrics.totalRevenue * mult),
    };
  };

  const metrics = getMetricsForPeriod(period);
  const completionRate = Math.round((metrics.completedRequests / metrics.totalRequests) * 100);

  // Mock historical data for trends
  const getTrend = () => {
    const trends = ['+12%', '+8%', '-3%', '+15%'];
    return trends[Math.floor(Math.random() * trends.length)];
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getPeriodLabel = (period: MetricPeriod) => {
    switch (period) {
      case '7d': return 'Last 7 days';
      case '30d': return 'Last 30 days';
      case '90d': return 'Last 90 days';
      case '1y': return 'Last year';
      default: return 'Last 30 days';
    }
  };

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

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Practice Metrics</h1>
            <p className="text-gray-600">Analytics and insights for your practice</p>
          </div>
          
          {/* Period Filter */}
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            {(['7d', '30d', '90d', '1y'] as MetricPeriod[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  period === p
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {getPeriodLabel(p)}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Patients</p>
                  <p className="text-2xl font-bold text-gray-900">{metrics.totalPatients}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-green-600 font-medium">{getTrend()}</span>
                <span className="text-gray-500 ml-1">vs last period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{metrics.totalRequests}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <Activity className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-green-600 font-medium">{getTrend()}</span>
                <span className="text-gray-500 ml-1">vs last period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{completionRate}%</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-green-600 font-medium">+5%</span>
                <span className="text-gray-500 ml-1">vs last period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(metrics.totalRevenue)}</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-green-600 font-medium">{getTrend()}</span>
                <span className="text-gray-500 ml-1">vs last period</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Request Types Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Request Types</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Pill className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Prescription Requests</p>
                      <p className="text-sm text-gray-600">
                        {Math.round((metrics.prescriptionRequests / metrics.totalRequests) * 100)}% of total
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{metrics.prescriptionRequests}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <FlaskConical className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Lab Test Requests</p>
                      <p className="text-sm text-gray-600">
                        {Math.round((metrics.labTestRequests / metrics.totalRequests) * 100)}% of total
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-600">{metrics.labTestRequests}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <MessageSquare className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">General Consultations</p>
                      <p className="text-sm text-gray-600">
                        {Math.round((metrics.consultations / metrics.totalRequests) * 100)}% of total
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">{metrics.consultations}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Performance Metrics</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-600">Patient Rating</p>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-lg font-bold text-gray-900">{metrics.averageRating}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full" 
                      style={{ width: `${(metrics.averageRating / 5) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-600">Average Response Time</p>
                    <span className="text-lg font-bold text-gray-900">{metrics.averageResponseTime}h</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }} />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Target: &lt; 4 hours</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-600">Request Acceptance Rate</p>
                    <span className="text-lg font-bold text-gray-900">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-600">Patient Retention</p>
                    <span className="text-lg font-bold text-gray-900">87%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '87%' }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Breakdown */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Revenue Breakdown</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="p-4 bg-blue-50 rounded-lg mb-4">
                  <Pill className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(metrics.prescriptionRequests * 25)} {/* $25 per prescription */}
                  </div>
                  <p className="text-sm font-medium text-gray-600">Prescription Requests</p>
                  <p className="text-xs text-gray-500">${metrics.prescriptionRequests} × $25</p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="p-4 bg-purple-50 rounded-lg mb-4">
                  <FlaskConical className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">
                    {formatCurrency(metrics.labTestRequests * 35)} {/* $35 per lab test */}
                  </div>
                  <p className="text-sm font-medium text-gray-600">Lab Test Requests</p>
                  <p className="text-xs text-gray-500">{metrics.labTestRequests} × $35</p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="p-4 bg-green-50 rounded-lg mb-4">
                  <MessageSquare className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(metrics.consultations * 50)} {/* $50 per consultation */}
                  </div>
                  <p className="text-sm font-medium text-gray-600">General Consultations</p>
                  <p className="text-xs text-gray-500">{metrics.consultations} × $50</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}