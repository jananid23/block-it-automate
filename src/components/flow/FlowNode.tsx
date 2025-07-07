
import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { MessageSquare, Zap, Loader, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const getNodeConfig = (blockType: string) => {
  switch (blockType) {
    case 'telegram_input':
      return {
        icon: MessageSquare,
        color: 'border-blue-500 bg-blue-50 text-blue-700',
        bgColor: 'bg-blue-500'
      };
    case 'trigger':
      return {
        icon: Zap,
        color: 'border-green-500 bg-green-50 text-green-700',
        bgColor: 'bg-green-500'
      };
    case 'busy_action':
      return {
        icon: Loader,
        color: 'border-yellow-500 bg-yellow-50 text-yellow-700',
        bgColor: 'bg-yellow-500'
      };
    default:
      return {
        icon: Settings,
        color: 'border-gray-500 bg-gray-50 text-gray-700',
        bgColor: 'bg-gray-500'
      };
  }
};

export const FlowNode: React.FC<NodeProps> = ({ data, selected }) => {
  const config = getNodeConfig(data.blockType);
  const Icon = config.icon;

  return (
    <div className={`relative rounded-lg border-2 p-4 min-w-48 ${config.color} ${selected ? 'ring-2 ring-primary' : ''}`}>
      <Handle type="target" position={Position.Top} className="!bg-gray-400" />
      
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${config.bgColor}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{data.label}</h3>
          <p className="text-xs opacity-75">
            {Object.keys(data.config).length} config items
          </p>
        </div>
      </div>

      {data.blockType !== 'busy_action' && (
        <Handle type="source" position={Position.Bottom} className="!bg-gray-400" />
      )}
    </div>
  );
};
