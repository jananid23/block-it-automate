
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useTheme } from '@/contexts/ThemeContext';
import { MessageSquare, Folder, Palette, Bell, Shield, Database } from 'lucide-react';

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [settings, setSettings] = useState({
    telegram: {
      defaultBotToken: '',
      webhookUrl: '',
      apiEndpoint: 'https://api.telegram.org'
    },
    paths: {
      workflowsDir: './workflows',
      logsDir: './logs',
      scriptsDir: './scripts'
    },
    notifications: {
      desktop: true,
      sound: false,
      email: false
    }
  });

  const handleInputChange = (section: string, key: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Configure your automation environment</p>
      </div>

      <div className="space-y-6">
        {/* Telegram Configuration */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-blue-500" />
              <CardTitle>Telegram Configuration</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="botToken">Default Bot Token</Label>
                <Input
                  id="botToken"
                  type="password"
                  value={settings.telegram.defaultBotToken}
                  onChange={(e) => handleInputChange('telegram', 'defaultBotToken', e.target.value)}
                  placeholder="Your Telegram bot token"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="webhookUrl">Webhook URL</Label>
                <Input
                  id="webhookUrl"
                  value={settings.telegram.webhookUrl}
                  onChange={(e) => handleInputChange('telegram', 'webhookUrl', e.target.value)}
                  placeholder="https://your-domain.com/webhook"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="apiEndpoint">API Endpoint</Label>
              <Input
                id="apiEndpoint"
                value={settings.telegram.apiEndpoint}
                onChange={(e) => handleInputChange('telegram', 'apiEndpoint', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* File Paths */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Folder className="w-5 h-5 text-green-500" />
              <CardTitle>File Paths</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="workflowsDir">Workflows Directory</Label>
                <Input
                  id="workflowsDir"
                  value={settings.paths.workflowsDir}
                  onChange={(e) => handleInputChange('paths', 'workflowsDir', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logsDir">Logs Directory</Label>
                <Input
                  id="logsDir"
                  value={settings.paths.logsDir}
                  onChange={(e) => handleInputChange('paths', 'logsDir', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="scriptsDir">Scripts Directory</Label>
                <Input
                  id="scriptsDir"
                  value={settings.paths.scriptsDir}
                  onChange={(e) => handleInputChange('paths', 'scriptsDir', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Palette className="w-5 h-5 text-purple-500" />
              <CardTitle>Appearance</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Toggle between light and dark theme
                </p>
              </div>
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-yellow-500" />
              <CardTitle>Notifications</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Desktop Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Show desktop notifications for workflow events
                </p>
              </div>
              <Switch
                checked={settings.notifications.desktop}
                onCheckedChange={(checked) => handleInputChange('notifications', 'desktop', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Sound Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Play sound when workflows complete
                </p>
              </div>
              <Switch
                checked={settings.notifications.sound}
                onCheckedChange={(checked) => handleInputChange('notifications', 'sound', checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Send email alerts for workflow failures
                </p>
              </div>
              <Switch
                checked={settings.notifications.email}
                onCheckedChange={(checked) => handleInputChange('notifications', 'email', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <Button variant="outline">Reset to Defaults</Button>
          <Button className="bg-green-500 hover:bg-green-600">Save Settings</Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
