
import React from 'react';
import { Plus, Play, Clock, Activity, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const recentFlows = [
    { id: 1, name: 'Telegram Bot Workflow', lastRun: '2 hours ago', status: 'active' },
    { id: 2, name: 'Data Processing Pipeline', lastRun: '1 day ago', status: 'idle' },
    { id: 3, name: 'Notification System', lastRun: '3 days ago', status: 'error' },
  ];

  const stats = [
    { title: 'Total Flows', value: '12', icon: FileText, color: 'text-blue-600' },
    { title: 'Active Flows', value: '8', icon: Activity, color: 'text-green-600' },
    { title: 'Pending Triggers', value: '3', icon: Clock, color: 'text-yellow-600' },
    { title: 'Last 24h Runs', value: '47', icon: Play, color: 'text-purple-600' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Manage your automation workflows</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            onClick={() => navigate('/saved-flows')}
          >
            <FileText className="w-4 h-4 mr-2" />
            Open Existing Flow
          </Button>
          <Button 
            onClick={() => navigate('/flow-builder')}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Flow
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-500" />
              Recent Flows
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentFlows.map((flow) => (
              <div key={flow.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    flow.status === 'active' ? 'bg-green-500' :
                    flow.status === 'idle' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-foreground">{flow.name}</p>
                    <p className="text-sm text-muted-foreground">Last run: {flow.lastRun}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Play className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2 text-green-500" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">System Health</span>
              <span className="text-sm font-medium text-green-600">Excellent</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">API Status</span>
              <span className="text-sm font-medium text-green-600">Online</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Queue Status</span>
              <span className="text-sm font-medium text-yellow-600">Processing</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Storage</span>
              <span className="text-sm font-medium text-foreground">73% Used</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
