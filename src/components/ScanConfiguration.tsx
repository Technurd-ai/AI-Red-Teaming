
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Play, Square, RefreshCw, Shield, Zap, Target, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ScanConfigurationProps {
  onScanStart: (active: boolean) => void;
  onProgressUpdate: (progress: number) => void;
}

const ScanConfiguration: React.FC<ScanConfigurationProps> = ({ onScanStart, onProgressUpdate }) => {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [targetUrl, setTargetUrl] = useState('');
  const [selectedScanTypes, setSelectedScanTypes] = useState<string[]>([]);
  const { toast } = useToast();

  const scanTypes = [
    { id: 'prompt-injection', label: 'Prompt Injection', icon: Zap, severity: 'high' },
    { id: 'jailbreak', label: 'Jailbreak Attempts', icon: Shield, severity: 'critical' },
    { id: 'data-extraction', label: 'Data Extraction', icon: Target, severity: 'high' },
    { id: 'bias-testing', label: 'Bias Testing', icon: AlertTriangle, severity: 'medium' },
    { id: 'hallucination', label: 'Hallucination Detection', icon: RefreshCw, severity: 'medium' },
    { id: 'adversarial', label: 'Adversarial Examples', icon: Target, severity: 'high' },
  ];

  const startScan = async () => {
    if (!targetUrl || selectedScanTypes.length === 0) {
      toast({
        title: "Configuration Error",
        description: "Please provide target URL and select at least one scan type",
        variant: "destructive",
      });
      return;
    }

    setScanning(true);
    onScanStart(true);
    setProgress(0);

    // Simulate scan progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        onProgressUpdate(Math.min(newProgress, 100));
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setScanning(false);
          onScanStart(false);
          toast({
            title: "Scan Complete",
            description: `Security scan completed. Found ${Math.floor(Math.random() * 20)} potential vulnerabilities.`,
          });
          return 100;
        }
        return newProgress;
      });
    }, 1000);
  };

  const stopScan = () => {
    setScanning(false);
    onScanStart(false);
    setProgress(0);
    onProgressUpdate(0);
  };

  const handleScanTypeChange = (scanType: string, checked: boolean) => {
    if (checked) {
      setSelectedScanTypes([...selectedScanTypes, scanType]);
    } else {
      setSelectedScanTypes(selectedScanTypes.filter(type => type !== scanType));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Target className="h-5 w-5 mr-2 text-red-400" />
            Target Configuration
          </CardTitle>
          <CardDescription className="text-slate-400">
            Configure the AI model or API endpoint to test
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="target-url" className="text-slate-300">Target URL/Endpoint</Label>
            <Input
              id="target-url"
              placeholder="https://api.example.com/chat"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="model-type" className="text-slate-300">Model Type</Label>
            <Select>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select model type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="gpt">GPT (OpenAI)</SelectItem>
                <SelectItem value="claude">Claude (Anthropic)</SelectItem>
                <SelectItem value="llama">LLaMA (Meta)</SelectItem>
                <SelectItem value="palm">PaLM (Google)</SelectItem>
                <SelectItem value="custom">Custom Model</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="auth-header" className="text-slate-300">Authentication</Label>
            <Input
              id="auth-header"
              type="password"
              placeholder="Bearer token or API key"
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="custom-headers" className="text-slate-300">Custom Headers (JSON)</Label>
            <Textarea
              id="custom-headers"
              placeholder='{"Content-Type": "application/json"}'
              className="bg-slate-700 border-slate-600 text-white"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Shield className="h-5 w-5 mr-2 text-red-400" />
            Security Scan Types
          </CardTitle>
          <CardDescription className="text-slate-400">
            Select the types of security tests to perform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {scanTypes.map((scanType) => {
            const IconComponent = scanType.icon;
            return (
              <div key={scanType.id} className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700/50 border border-slate-600">
                <Checkbox
                  id={scanType.id}
                  checked={selectedScanTypes.includes(scanType.id)}
                  onCheckedChange={(checked) => handleScanTypeChange(scanType.id, checked as boolean)}
                />
                <IconComponent className="h-4 w-4 text-slate-400" />
                <div className="flex-1">
                  <Label htmlFor={scanType.id} className="text-white cursor-pointer">
                    {scanType.label}
                  </Label>
                  <div className={`text-xs px-2 py-1 rounded-full inline-block ml-2 ${
                    scanType.severity === 'critical' ? 'bg-red-600/20 text-red-400' :
                    scanType.severity === 'high' ? 'bg-orange-600/20 text-orange-400' :
                    'bg-yellow-600/20 text-yellow-400'
                  }`}>
                    {scanType.severity}
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Play className="h-5 w-5 mr-2 text-green-400" />
            Scan Control
          </CardTitle>
          <CardDescription className="text-slate-400">
            Start, stop, and monitor security scans
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {scanning && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Scan Progress</span>
                <span className="text-slate-300">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="bg-slate-700" />
              <div className="text-sm text-slate-400">
                Running {selectedScanTypes.length} security tests...
              </div>
            </div>
          )}
          
          <div className="flex space-x-4">
            {!scanning ? (
              <Button onClick={startScan} className="bg-green-600 hover:bg-green-700 text-white">
                <Play className="h-4 w-4 mr-2" />
                Start Security Scan
              </Button>
            ) : (
              <Button onClick={stopScan} variant="destructive">
                <Square className="h-4 w-4 mr-2" />
                Stop Scan
              </Button>
            )}
            
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset Configuration
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScanConfiguration;
