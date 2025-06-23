
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Settings, Zap, Brain, Thermometer } from 'lucide-react';

const ModelParameters = () => {
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState([2048]);
  const [topP, setTopP] = useState([0.9]);
  const [frequencyPenalty, setFrequencyPenalty] = useState([0.0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Settings className="h-5 w-5 mr-2 text-red-400" />
            Generation Parameters
          </CardTitle>
          <CardDescription className="text-slate-400">
            Configure model behavior for security testing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-slate-300">Temperature</Label>
              <span className="text-slate-400 text-sm">{temperature[0]}</span>
            </div>
            <Slider
              value={temperature}
              onValueChange={setTemperature}
              max={2}
              min={0}
              step={0.1}
              className="w-full"
            />
            <p className="text-xs text-slate-500">Controls randomness in responses</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-slate-300">Max Tokens</Label>
              <span className="text-slate-400 text-sm">{maxTokens[0]}</span>
            </div>
            <Slider
              value={maxTokens}
              onValueChange={setMaxTokens}
              max={4096}
              min={1}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-slate-500">Maximum response length</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-slate-300">Top P</Label>
              <span className="text-slate-400 text-sm">{topP[0]}</span>
            </div>
            <Slider
              value={topP}
              onValueChange={setTopP}
              max={1}
              min={0}
              step={0.01}
              className="w-full"
            />
            <p className="text-xs text-slate-500">Nucleus sampling parameter</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-slate-300">Frequency Penalty</Label>
              <span className="text-slate-400 text-sm">{frequencyPenalty[0]}</span>
            </div>
            <Slider
              value={frequencyPenalty}
              onValueChange={setFrequencyPenalty}
              max={2}
              min={-2}
              step={0.1}
              className="w-full"
            />
            <p className="text-xs text-slate-500">Reduces repetitive responses</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="h-5 w-5 mr-2 text-red-400" />
            Advanced Settings
          </CardTitle>
          <CardDescription className="text-slate-400">
            Fine-tune model behavior for attack scenarios
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-slate-300">System Prompt Template</Label>
            <Select>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="default">Default Assistant</SelectItem>
                <SelectItem value="helpful">Helpful Assistant</SelectItem>
                <SelectItem value="creative">Creative Writer</SelectItem>
                <SelectItem value="analytical">Analytical Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-slate-300">Enable Memory</Label>
              <p className="text-xs text-slate-500">Remember conversation context</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-slate-300">Safety Filters</Label>
              <p className="text-xs text-slate-500">Apply content filtering</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-slate-300">Stream Responses</Label>
              <p className="text-xs text-slate-500">Real-time response streaming</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stop-sequences" className="text-slate-300">Stop Sequences</Label>
            <Input
              id="stop-sequences"
              placeholder="Enter stop sequences (comma separated)"
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            Apply Parameters
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelParameters;
