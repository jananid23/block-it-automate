
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Zap, Loader } from 'lucide-react';

interface BlockSelectorProps {
  onSelect: (blockType: string) => void;
  onClose: () => void;
}

const blockTypes = [
  {
    id: 'telegram_input',
    name: 'Telegram Input',
    description: 'Receive messages from Telegram',
    icon: MessageSquare,
    color: 'text-blue-500 bg-blue-50 border-blue-200',
  },
  {
    id: 'trigger',
    name: 'Trigger',
    description: 'Conditional trigger for workflows',
    icon: Zap,
    color: 'text-green-500 bg-green-50 border-green-200',
  },
  {
    id: 'busy_action',
    name: 'Busy Action',
    description: 'Long-running processing action',
    icon: Loader,
    color: 'text-yellow-500 bg-yellow-50 border-yellow-200',
  },
];

export const BlockSelector: React.FC<BlockSelectorProps> = ({ onSelect, onClose }) => {
  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-96 max-h-96 overflow-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Add Block</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ×
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {blockTypes.map((block) => (
            <div
              key={block.id}
              className={`p-4 rounded-lg border-2 cursor-pointer hover:shadow-md transition-all ${block.color}`}
              onClick={() => onSelect(block.id)}
            >
              <div className="flex items-start space-x-3">
                <block.icon className="w-6 h-6 mt-1" />
                <div>
                  <h3 className="font-semibold">{block.name}</h3>
                  <p className="text-sm opacity-75">{block.description}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
