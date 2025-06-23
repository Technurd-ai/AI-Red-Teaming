
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Database, Upload, Download, Trash, Plus, FileText, AlertTriangle } from 'lucide-react';

const DatasetManager = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const datasets = [
    {
      id: 1,
      name: 'Common Vulnerabilities',
      type: 'Security',
      size: '2.4 MB',
      entries: 1247,
      status: 'active',
      lastUpdated: '2 hours ago'
    },
    {
      id: 2,
      name: 'Jailbreak Prompts',
      type: 'Red Team',
      size: '856 KB',
      entries: 342,
      status: 'active',
      lastUpdated: '1 day ago'
    },
    {
      id: 3,
      name: 'Bias Test Cases',
      type: 'Ethics',
      size: '1.8 MB',
      entries: 923,
      status: 'processing',
      lastUpdated: '3 hours ago'
    },
    {
      id: 4,
      name: 'Adversarial Examples',
      type: 'Attack',
      size: '3.2 MB',
      entries: 1856,
      status: 'active',
      lastUpdated: '5 hours ago'
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Database className="h-5 w-5 mr-2 text-red-400" />
            Dataset Management
          </CardTitle>
          <CardDescription className="text-slate-400">
            Manage security testing datasets and training data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button className="bg-green-600 hover:bg-green-700">
              <Upload className="h-4 w-4 mr-2" />
              Upload Dataset
            </Button>
            <Button variant="outline" className="border-slate-600 text-slate-300">
              <Plus className="h-4 w-4 mr-2" />
              Create New
            </Button>
            <Button variant="outline" className="border-slate-600 text-slate-300">
              <Download className="h-4 w-4 mr-2" />
              Import from URL
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">Upload New Dataset</CardTitle>
            <CardDescription className="text-slate-400">
              Add security testing data to your collection
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dataset-name" className="text-slate-300">Dataset Name</Label>
              <Input
                id="dataset-name"
                placeholder="Enter dataset name"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dataset-type" className="text-slate-300">Dataset Type</Label>
              <Input
                id="dataset-type"
                placeholder="e.g., Security, Red Team, Ethics"
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>

            <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
              <FileText className="h-8 w-8 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-300 mb-2">Drop files here or click to browse</p>
              <p className="text-slate-500 text-sm">Supports JSON, CSV, TXT files</p>
              <Button variant="outline" className="mt-3 border-slate-600 text-slate-300">
                Choose Files
              </Button>
            </div>

            {uploadProgress > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Uploading...</span>
                  <span className="text-slate-300">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="bg-slate-700" />
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">Dataset Statistics</CardTitle>
            <CardDescription className="text-slate-400">
              Overview of your security testing data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-700/50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-white">4</div>
                <div className="text-slate-400 text-sm">Total Datasets</div>
              </div>
              <div className="bg-slate-700/50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-white">4,368</div>
                <div className="text-slate-400 text-sm">Total Entries</div>
              </div>
              <div className="bg-slate-700/50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-white">8.2 MB</div>
                <div className="text-slate-400 text-sm">Storage Used</div>
              </div>
              <div className="bg-slate-700/50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-white">3</div>
                <div className="text-slate-400 text-sm">Active Tests</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Available Datasets</CardTitle>
          <CardDescription className="text-slate-400">
            Manage and configure your security testing datasets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {datasets.map((dataset) => (
              <div key={dataset.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                <div className="flex items-center space-x-4">
                  <Database className="h-8 w-8 text-blue-400" />
                  <div>
                    <h3 className="text-white font-medium">{dataset.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {dataset.type}
                      </Badge>
                      <span className="text-slate-400 text-sm">{dataset.entries} entries</span>
                      <span className="text-slate-400 text-sm">•</span>
                      <span className="text-slate-400 text-sm">{dataset.size}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      dataset.status === 'active' ? 'text-green-400' :
                      dataset.status === 'processing' ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {dataset.status}
                    </div>
                    <div className="text-slate-500 text-xs">{dataset.lastUpdated}</div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                      <Download className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="destructive">
                      <Trash className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatasetManager;
