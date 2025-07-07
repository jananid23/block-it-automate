
import React, { useState } from 'react';
import { Node } from '@xyflow/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Trash2 } from 'lucide-react';

interface ConfigPanelProps {
  node: Node;
  onClose: () => void;
  onUpdate: (node: Node) => void;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({ node, onClose, onUpdate }) => {
  const [config, setConfig] = useState(node.data.config || {});

  const handleConfigChange = (key: string, value: string) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    onUpdate({
      ...node,
      data: { ...node.data, config: newConfig }
    });
  };

  const getConfigFields = () => {
    switch (node.data.blockType) {
      case 'telegram_input':
        return [
          { key: 'bot_token', label: 'Bot Token', type: 'text', required: true },
          { key: 'chat_id', label: 'Chat ID', type: 'text' },
          { key: 'message_filter', label: 'Message Filter', type: 'text' },
        ];
      case 'trigger':
        return [
          { key: 'condition', label: 'Trigger Condition', type: 'textarea', required: true },
          { key: 'delay', label: 'Delay (seconds)', type: 'number' },
        ];
      case 'busy_action':
        return [
          { key: 'script_path', label: 'Script Path', type: 'text', required: true },
          { key: 'timeout', label: 'Timeout (seconds)', type: 'number' },
          { key: 'output_file', label: 'Output File', type: 'text' },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="w-80 bg-card border-l border-border p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Configure Block</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          ×
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">{node.data.label}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {getConfigFields().map((field) => (
            <div key={field.key} className="space-y-2">
              <Label htmlFor={field.key} className="text-sm font-medium">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              {field.type === 'textarea' ? (
                <Textarea
                  id={field.key}
                  value={config[field.key] || ''}
                  onChange={(e) => handleConfigChange(field.key, e.target.value)}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  className="text-sm"
                />
              ) : (
                <Input
                  id={field.key}
                  type={field.type}
                  value={config[field.key] || ''}
                  onChange={(e) => handleConfigChange(field.key, e.target.value)}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  className="text-sm"
                />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="space-y-2">
        <Button variant="destructive" size="sm" className="w-full">
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Block
        </Button>
      </div>
    </div>
  );
};
