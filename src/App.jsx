// src/App.jsx
import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import { useDispatch, useSelector } from 'react-redux';
import 'reactflow/dist/style.css';

import Sidebar from './components/Sidebar';
import CustomNode from './components/CustomNode';
import RightPanel from './components/RightPanel';
import { selectNode, importFlow, setNodes as setReduxNodes } from './store/flowSlice';

const nodeTypes = {
  customNode: CustomNode,
};

function App() {
  const dispatch = useDispatch();
  const showPanel = useSelector((state) => state.flow.showPanel);
  const selectedNode = useSelector((state) => state.flow.selectedNode);
  
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Sync nodes with Redux when they change
  useEffect(() => {
    dispatch(setReduxNodes(nodes));
  }, [nodes, dispatch]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const position = {
        x: event.clientX - 200,
        y: event.clientY - 40,
      };

      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { name: 'New Node', description: '', category: '' },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  // Handler for node updates
  const handleNodeUpdate = (nodeId, newData) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: { ...node.data, ...newData },
          };
        }
        return node;
      })
    );
  };

  const handleExport = () => {
    const flowData = { nodes, edges };
    const dataStr = JSON.stringify(flowData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const link = document.createElement('a');
    link.href = dataUri;
    link.download = 'flow.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const flow = JSON.parse(e.target.result);
        setNodes(flow.nodes);
        setEdges(flow.edges);
        dispatch(importFlow(flow));
      } catch (error) {
        console.error('Error importing flow:', error);
      }
    };
    
    reader.readAsText(file);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <div className="h-12 border-b border-gray-200 flex items-center px-4 gap-2">
          <button
            onClick={handleExport}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Export
          </button>
          <label className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
            Import
            <input
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleImport}
            />
          </label>
        </div>
        
        <div className="flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDragOver={onDragOver}
            onDrop={onDrop}
            nodeTypes={nodeTypes}
            onNodeClick={(_, node) => dispatch(selectNode(node.id))}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </div>
      
      {showPanel && selectedNode && (
        <RightPanel 
          nodeId={selectedNode} 
          onUpdateNode={handleNodeUpdate}
        />
      )}
    </div>
  );
}

export default App;