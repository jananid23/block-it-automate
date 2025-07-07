
import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Panel,
  Connection,
  Edge,
  Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Play, Download, Code, Settings } from 'lucide-react';
import { BlockSelector } from '@/components/flow/BlockSelector';
import { FlowNode } from '@/components/flow/FlowNode';
import { ConfigPanel } from '@/components/flow/ConfigPanel';

const nodeTypes = {
  customNode: FlowNode,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const FlowBuilder: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [showBlockSelector, setShowBlockSelector] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [showJsonPanel, setShowJsonPanel] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addBlock = useCallback((blockType: string) => {
    const id = `${blockType}_${Date.now()}`;
    const newNode: Node = {
      id,
      type: 'customNode',
      position: { x: Math.random() * 500, y: Math.random() * 300 },
      data: { 
        blockType,
        label: blockType.replace('_', ' ').toUpperCase(),
        config: {}
      },
    };
    setNodes((nds) => [...nds, newNode]);
    setShowBlockSelector(false);
  }, [setNodes]);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const generateJSON = () => {
    return {
      nodes: nodes.map(node => ({
        id: node.id,
        type: node.data.blockType,
        config: node.data.config,
        position: node.position
      })),
      edges: edges.map(edge => ({
        source: edge.source,
        target: edge.target
      }))
    };
  };

  return (
    <div className="h-screen flex">
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          className="bg-background"
        >
          <Controls className="!bottom-4 !left-4" />
          <Background color="#94a3b8" gap={20} />
          
          <Panel position="top-left" className="space-x-2">
            <Button
              onClick={() => setShowBlockSelector(true)}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Block
            </Button>
            <Button variant="outline" onClick={() => setShowJsonPanel(!showJsonPanel)}>
              <Code className="w-4 h-4 mr-2" />
              JSON Panel
            </Button>
            <Button variant="outline">
              <Play className="w-4 h-4 mr-2" />
              Run Flow
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </Panel>
        </ReactFlow>

        {showBlockSelector && (
          <BlockSelector
            onSelect={addBlock}
            onClose={() => setShowBlockSelector(false)}
          />
        )}
      </div>

      {selectedNode && (
        <ConfigPanel
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
          onUpdate={(updatedNode) => {
            setNodes(nds => nds.map(n => n.id === updatedNode.id ? updatedNode : n));
          }}
        />
      )}

      {showJsonPanel && (
        <div className="w-96 bg-card border-l border-border p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Flow JSON</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowJsonPanel(false)}>
              ×
            </Button>
          </div>
          <Card>
            <CardContent className="p-4">
              <pre className="text-xs overflow-auto max-h-96 bg-muted p-3 rounded">
                {JSON.stringify(generateJSON(), null, 2)}
              </pre>
            </CardContent>
          </Card>
          <div className="space-y-2">
            <Button className="w-full" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export JSON
            </Button>
            <Button className="w-full bg-green-500 hover:bg-green-600">
              <Play className="w-4 h-4 mr-2" />
              Run Automation
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Console Output</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-black text-green-400 p-3 rounded text-xs font-mono max-h-32 overflow-auto">
                <div>$ orchestrator.py --run flow.json</div>
                <div>Initializing workflow...</div>
                <div>Loading blocks...</div>
                <div>Ready to execute.</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FlowBuilder;
