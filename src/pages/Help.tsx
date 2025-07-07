
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Book, MessageCircle, Video } from 'lucide-react';

const Help: React.FC = () => {
  const sections = [
    {
      title: 'Getting Started',
      icon: Book,
      items: [
        'Creating your first workflow',
        'Understanding block types',
        'Connecting blocks',
        'Running workflows'
      ]
    },
    {
      title: 'Block Types',
      icon: MessageCircle,
      items: [
        'Telegram Input - Receive messages from Telegram bots',
        'Trigger - Conditional logic and decision making',
        'Busy Action - Long-running processes and scripts'
      ]
    },
    {
      title: 'Configuration',
      icon: Video,
      items: [
        'Setting up Telegram bots',
        'Configuring file paths',
        'Managing environment variables',
        'Troubleshooting common issues'
      ]
    }
  ];

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Help & Documentation</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Learn how to build powerful automation workflows with FlowMaster. 
          Get started with our guides or explore advanced features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((section, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <section.icon className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">{section.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                    • {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Start Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">1. Create Your First Workflow</h3>
              <p className="text-sm text-muted-foreground">
                Click "Create New Flow" from the dashboard to open the visual flow builder. 
                Start by adding a Telegram Input block to receive messages.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">2. Add Processing Logic</h3>
              <p className="text-sm text-muted-foreground">
                Add Trigger blocks for conditional logic and Busy Action blocks for 
                processing tasks. Connect them by dragging from output to input handles.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">3. Configure Blocks</h3>
              <p className="text-sm text-muted-foreground">
                Click on any block to open the configuration panel. Set up your 
                Telegram bot tokens, processing scripts, and trigger conditions.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">4. Test & Deploy</h3>
              <p className="text-sm text-muted-foreground">
                Use the JSON panel to export your workflow and run it with the 
                orchestrator. Monitor execution in the console output.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Github className="w-5 h-5" />
              <span>Resources</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <ExternalLink className="w-4 h-4 mr-2" />
              GitHub Repository
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Book className="w-4 h-4 mr-2" />
              Documentation
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Video className="w-4 h-4 mr-2" />
              Video Tutorials
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <MessageCircle className="w-4 h-4 mr-2" />
              Community Forum
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About FlowMaster</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Version</span>
              <Badge>v1.0.0</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Build</span>
              <Badge variant="outline">2024.1.1</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">License</span>
              <Badge variant="secondary">MIT</Badge>
            </div>
            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                FlowMaster is an open-source automation workflow builder 
                designed for creating visual automation pipelines.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Help;
