
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Play, Square, AlertTriangle, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const SecurityScanRunner = () => {
  const [targetUrl, setTargetUrl] = useState('');
  const [scanType, setScanType] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scanResults, setScanResults] = useState<any>(null);
  const { toast } = useToast();

  const handleStartScan = async () => {
    if (!targetUrl || !scanType) {
      toast({
        title: "Missing Information",
        description: "Please provide target URL and scan type",
        variant: "destructive",
      });
      return;
    }

    setIsScanning(true);
    setProgress(0);
    setScanResults(null);

    try {
      // First, get attack templates
      const { data: templatesData } = await supabase.functions.invoke('get-attack-templates', {
        body: { category: scanType === 'all' ? null : scanType }
      });

      if (!templatesData?.templates) {
        throw new Error('Failed to fetch attack templates');
      }

      // Start the security scan
      const { data, error } = await supabase.functions.invoke('security-scan', {
        body: {
          targetUrl,
          scanType,
          attackTemplates: templatesData.templates
        }
      });

      if (error) throw error;

      setProgress(100);
      setScanResults(data.results);
      
      toast({
        title: "Scan Completed",
        description: `Found ${data.results.vulnerabilities.length} vulnerabilities`,
        variant: data.results.vulnerabilities.length > 0 ? "destructive" : "default",
      });

    } catch (error: any) {
      console.error('Scan error:', error);
      toast({
        title: "Scan Failed",
        description: error.message || 'An error occurred during scanning',
        variant: "destructive",
      });
    } finally {
      setIsScanning(false);
    }
  };

  const handleStopScan = () => {
    setIsScanning(false);
    setProgress(0);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Security Scan Configuration</CardTitle>
          <CardDescription className="text-slate-400">
            Configure and execute security scans against AI models
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="target-url" className="text-slate-300">Target URL</Label>
              <Input
                id="target-url"
                placeholder="https://api.example.com/chat"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                disabled={isScanning}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="scan-type" className="text-slate-300">Scan Type</Label>
              <Select value={scanType} onValueChange={setScanType} disabled={isScanning}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Select scan type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Attack Types</SelectItem>
                  <SelectItem value="Prompt Injection">Prompt Injection</SelectItem>
                  <SelectItem value="Jailbreak">Jailbreak Attempts</SelectItem>
                  <SelectItem value="Data Leakage">Data Extraction</SelectItem>
                  <SelectItem value="Social Engineering">Social Engineering</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isScanning && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-slate-300">Scan Progress</Label>
                <span className="text-slate-300 text-sm">{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}

          <div className="flex space-x-2">
            {!isScanning ? (
              <Button 
                onClick={handleStartScan}
                className="bg-green-600 hover:bg-green-700"
              >
                <Play className="h-4 w-4 mr-2" />
                Start Scan
              </Button>
            ) : (
              <Button 
                onClick={handleStopScan}
                className="bg-red-600 hover:bg-red-700"
              >
                <Square className="h-4 w-4 mr-2" />
                Stop Scan
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {scanResults && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              {scanResults.vulnerabilities.length > 0 ? (
                <AlertTriangle className="h-5 w-5 mr-2 text-red-400" />
              ) : (
                <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
              )}
              Scan Results
            </CardTitle>
            <CardDescription className="text-slate-400">
              Security assessment results for {scanResults.targetUrl}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-700/50 p-3 rounded">
                <div className="text-slate-300 text-sm">Total Tests</div>
                <div className="text-white text-xl font-bold">{scanResults.summary.totalTests}</div>
              </div>
              <div className="bg-slate-700/50 p-3 rounded">
                <div className="text-slate-300 text-sm">Vulnerabilities</div>
                <div className="text-red-400 text-xl font-bold">{scanResults.summary.vulnerabilitiesFound}</div>
              </div>
              <div className="bg-slate-700/50 p-3 rounded">
                <div className="text-slate-300 text-sm">Critical Issues</div>
                <div className="text-red-500 text-xl font-bold">{scanResults.summary.criticalIssues}</div>
              </div>
              <div className="bg-slate-700/50 p-3 rounded">
                <div className="text-slate-300 text-sm">Security Score</div>
                <div className="text-green-400 text-xl font-bold">85/100</div>
              </div>
            </div>

            {scanResults.vulnerabilities.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-white font-medium">Discovered Vulnerabilities</h4>
                {scanResults.vulnerabilities.map((vuln: any, index: number) => (
                  <div key={index} className="bg-slate-700/30 p-4 rounded border border-slate-600">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-white font-medium">{vuln.type}</h5>
                      <Badge className={`${getSeverityColor(vuln.severity)} text-white`}>
                        {vuln.severity}
                      </Badge>
                    </div>
                    <p className="text-slate-300 text-sm mb-2">{vuln.description}</p>
                    <div className="text-slate-400 text-xs">
                      <strong>Evidence:</strong> {vuln.evidence}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SecurityScanRunner;
