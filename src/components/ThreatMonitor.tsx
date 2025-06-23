
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, AlertTriangle, Shield, Zap, TrendingUp, RefreshCw } from 'lucide-react';

const ThreatMonitor = () => {
  const [isMonitoring, setIsMonitoring] = useState(true);

  const threatAlerts = [
    {
      id: 'alert-001',
      timestamp: '2024-01-15 15:42:33',
      severity: 'critical',
      type: 'Prompt Injection Detected',
      source: 'API Endpoint /chat',
      description: 'Multiple jailbreak attempts detected from IP 192.168.1.100',
      status: 'active'
    },
    {
      id: 'alert-002',
      timestamp: '2024-01-15 15:38:15',
      severity: 'high',
      type: 'Data Extraction Attempt',
      source: 'API Endpoint /completion',
      description: 'Suspicious patterns indicating training data extraction',
      status: 'investigating'
    },
    {
      id: 'alert-003',
      timestamp: '2024-01-15 15:35:22',
      severity: 'medium',
      type: 'Rate Limit Exceeded',
      source: 'API Endpoint /chat',
      description: 'Unusual request volume from single source',
      status: 'resolved'
    }
  ];

  const systemMetrics = {
    activeThreats: 12,
    blockedAttempts: 1847,
    successRate: 94.2,
    uptime: '99.8%'
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center">
                <Activity className="h-5 w-5 mr-2 text-green-400" />
                Real-Time Threat Monitor
              </CardTitle>
              <CardDescription className="text-slate-400">
                Live security monitoring and threat detection
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isMonitoring ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
              <span className="text-slate-300 text-sm">
                {isMonitoring ? 'Monitoring Active' : 'Monitoring Paused'}
              </span>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-slate-600 text-slate-300"
                onClick={() => setIsMonitoring(!isMonitoring)}
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                {isMonitoring ? 'Pause' : 'Resume'}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-700/50 border-slate-600">
          <CardHeader className="pb-3">
            <CardTitle className="text-slate-300 text-sm flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-red-400" />
              Active Threats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">{systemMetrics.activeThreats}</div>
            <div className="text-xs text-slate-400">Requiring attention</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-700/50 border-slate-600">
          <CardHeader className="pb-3">
            <CardTitle className="text-slate-300 text-sm flex items-center">
              <Shield className="h-4 w-4 mr-2 text-green-400" />
              Blocked Attempts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{systemMetrics.blockedAttempts}</div>
            <div className="text-xs text-slate-400">Last 24 hours</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-700/50 border-slate-600">
          <CardHeader className="pb-3">
            <CardTitle className="text-slate-300 text-sm flex items-center">
              <Zap className="h-4 w-4 mr-2 text-blue-400" />
              Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">{systemMetrics.successRate}%</div>
            <div className="text-xs text-slate-400">Detection accuracy</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-700/50 border-slate-600">
          <CardHeader className="pb-3">
            <CardTitle className="text-slate-300 text-sm flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-yellow-400" />
              System Uptime
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">{systemMetrics.uptime}</div>
            <div className="text-xs text-slate-400">Last 30 days</div>
          </CardContent>
        </Card>
      </div>

      {/* Threat Alerts */}
      <Card className="bg-slate-700/50 border-slate-600">
        <CardHeader>
          <CardTitle className="text-white">Recent Threat Alerts</CardTitle>
          <CardDescription className="text-slate-400">
            Latest security incidents and threat detections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {threatAlerts.map((alert) => (
              <div key={alert.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <Badge 
                      variant={alert.severity === 'critical' ? 'destructive' : 'secondary'}
                      className={
                        alert.severity === 'critical' ? 'bg-red-600/20 text-red-400' :
                        alert.severity === 'high' ? 'bg-orange-600/20 text-orange-400' :
                        'bg-yellow-600/20 text-yellow-400'
                      }
                    >
                      {alert.severity}
                    </Badge>
                    <span className="text-white font-medium">{alert.type}</span>
                  </div>
                  <Badge 
                    variant="outline"
                    className={
                      alert.status === 'active' ? 'border-red-400 text-red-400' :
                      alert.status === 'investigating' ? 'border-orange-400 text-orange-400' :
                      'border-green-400 text-green-400'
                    }
                  >
                    {alert.status}
                  </Badge>
                </div>
                <div className="text-slate-300 text-sm mb-2">{alert.description}</div>
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>Source: {alert.source}</span>
                  <span>{alert.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Live Activity Feed */}
      <Card className="bg-slate-700/50 border-slate-600">
        <CardHeader>
          <CardTitle className="text-white">Live Activity Feed</CardTitle>
          <CardDescription className="text-slate-400">
            Real-time security events and system activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-slate-800/50 rounded border border-slate-600 p-4 overflow-y-auto">
            <div className="font-mono text-xs text-green-400 space-y-1">
              <div>[15:45:33] SCAN_START: Initiating security scan on endpoint /api/chat</div>
              <div>[15:45:32] THREAT_BLOCKED: Prompt injection attempt from 192.168.1.100</div>
              <div>[15:45:31] ANALYSIS_COMPLETE: Vulnerability assessment finished</div>
              <div>[15:45:30] ALERT_GENERATED: High-risk pattern detected in request payload</div>
              <div>[15:45:29] SCAN_START: Initiating security scan on endpoint /api/completion</div>
              <div>[15:45:28] SYSTEM_INFO: Threat database updated with 247 new signatures</div>
              <div>[15:45:27] THREAT_BLOCKED: Data extraction attempt blocked</div>
              <div>[15:45:26] SCAN_COMPLETE: Full system scan completed successfully</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThreatMonitor;
