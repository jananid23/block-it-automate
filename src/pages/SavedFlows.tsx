
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Play, Edit, Copy, Trash2, Search, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SavedFlows: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const savedFlows = [
    {
      id: 1,
      name: 'Telegram Bot Workflow',
      description: 'Automated customer support bot',
      blocks: 5,
      lastModified: '2 hours ago',
      status: 'active',
      tags: ['telegram', 'support']
    },
    {
      id: 2,
      name: 'Data Processing Pipeline',
      description: 'Process incoming data files',
      blocks: 8,
      lastModified: '1 day ago',
      status: 'draft',
      tags: ['data', 'processing']
    },
    {
      id: 3,
      name: 'Notification System',
      description: 'Multi-channel notification dispatcher',
      blocks: 3,
      lastModified: '3 days ago',
      status: 'error',
      tags: ['notifications', 'alerts']
    },
    {
      id: 4,
      name: 'File Backup Automation',
      description: 'Automated file backup and sync',
      blocks: 6,
      lastModified: '1 week ago',
      status: 'active',
      tags: ['backup', 'files']
    },
  ];

  const filteredFlows = savedFlows.filter(flow =>
    flow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flow.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flow.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'draft':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Saved Flows</h1>
          <p className="text-muted-foreground">Manage your automation workflows</p>
        </div>
        <Button 
          onClick={() => navigate('/flow-builder')}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Flow
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search flows..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Badge variant="outline">{filteredFlows.length} flows</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFlows.map((flow) => (
          <Card key={flow.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {flow.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {flow.description}
                  </p>
                </div>
                <Badge className={`${getStatusColor(flow.status)} border`}>
                  {flow.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{flow.blocks} blocks</span>
                <span>{flow.lastModified}</span>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {flow.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex space-x-2 pt-2">
                <Button
                  size="sm"
                  className="flex-1 bg-green-500 hover:bg-green-600"
                  onClick={() => navigate(`/flow-builder/${flow.id}`)}
                >
                  <Play className="w-4 h-4 mr-1" />
                  Run
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate(`/flow-builder/${flow.id}`)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Copy className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFlows.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No flows found matching your search.</p>
          </div>
          <Button variant="outline" onClick={() => setSearchTerm('')}>
            Clear Search
          </Button>
        </div>
      )}
    </div>
  );
};

export default SavedFlows;
