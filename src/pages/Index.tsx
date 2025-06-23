
import React, { useState } from 'react';
import { Shield, Search, Settings, Database, Activity, AlertTriangle, Zap, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ScanConfiguration from '@/components/ScanConfiguration';
import AttackTemplates from '@/components/AttackTemplates';
import ModelParameters from '@/components/ModelParameters';
import DatasetManager from '@/components/DatasetManager';
import SecurityResults from '@/components/SecurityResults';
import ThreatMonitor from '@/components/ThreatMonitor';

const Index = () => {
  const [activeScan, setActiveScan] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-red-900">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-600 rounded-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">AI Security Red Team</h1>
              <p className="text-slate-300">Advanced AI Model Security Assessment Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="px-4 py-2 bg-green-600/20 border border-green-500 rounded-lg">
              <span className="text-green-400 font-medium">System Online</span>
            </div>
            {activeScan && (
              <div className="px-4 py-2 bg-red-600/20 border border-red-500 rounded-lg animate-pulse">
                <span className="text-red-400 font-medium">Scan Active: {scanProgress}%</span>
              </div>
            )}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Active Scans</CardTitle>
              <Activity className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">3</div>
              <p className="text-xs text-slate-400">+2 from last hour</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Vulnerabilities</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">127</div>
              <p className="text-xs text-slate-400">23 critical</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Attack Vectors</CardTitle>
              <Target className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">45</div>
              <p className="text-xs text-slate-400">12 templates loaded</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Success Rate</CardTitle>
              <Zap className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">78%</div>
              <p className="text-xs text-slate-400">Attack success rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="scan" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="scan" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-red-600">
              <Search className="h-4 w-4 mr-2" />
              Scan Config
            </TabsTrigger>
            <TabsTrigger value="templates" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-red-600">
              <Target className="h-4 w-4 mr-2" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="parameters" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-red-600">
              <Settings className="h-4 w-4 mr-2" />
              Parameters
            </TabsTrigger>
            <TabsTrigger value="datasets" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-red-600">
              <Database className="h-4 w-4 mr-2" />
              Datasets
            </TabsTrigger>
            <TabsTrigger value="results" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-red-600">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Results
            </TabsTrigger>
            <TabsTrigger value="monitor" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-red-600">
              <Activity className="h-4 w-4 mr-2" />
              Monitor
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scan" className="space-y-6">
            <ScanConfiguration onScanStart={setActiveScan} onProgressUpdate={setScanProgress} />
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <AttackTemplates />
          </TabsContent>

          <TabsContent value="parameters" className="space-y-6">
            <ModelParameters />
          </TabsContent>

          <TabsContent value="datasets" className="space-y-6">
            <DatasetManager />
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            <SecurityResults />
          </TabsContent>

          <TabsContent value="monitor" className="space-y-6">
            <ThreatMonitor />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
