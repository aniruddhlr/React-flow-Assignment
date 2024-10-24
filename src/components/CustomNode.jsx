// src/components/CustomNode.jsx
import React from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { PlayIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { closePanel } from '../store/flowSlice';

const CustomNode = ({ id, data, isConnectable }) => {
  const dispatch = useDispatch();
  const { setNodes, getNodes } = useReactFlow();

  const handleDelete = () => {
    // Close the panel if the deleted node was being edited
    dispatch(closePanel());
    
    // Remove the node
    setNodes(getNodes().filter(node => node.id !== id));
  };

  return (
    <div className="relative bg-white border border-gray-200 rounded-lg p-4 min-w-[150px] group">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div className="font-medium">{data.name || 'New Node'}</div>
      <div className="text-sm text-gray-500">{data.description || 'No description'}</div>
      
      {/* Hover Actions */}
      <div className="absolute top-0 right-0 hidden group-hover:flex gap-1 p-2">
        <button 
          className="p-1 hover:bg-gray-100 rounded"
          onClick={() => console.log('Play clicked')}
        >
          <PlayIcon className="w-4 h-4" />
        </button>
        <button 
          className="p-1 hover:bg-gray-100 rounded text-red-500"
          onClick={(e) => {
            e.stopPropagation(); // Prevent node selection when deleting
            handleDelete();
          }}
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
      
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </div>
  );
};

export default CustomNode;