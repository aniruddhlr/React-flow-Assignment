// src/components/RightPanel.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closePanel } from '../store/flowSlice';

const RightPanel = ({ nodeId, onUpdateNode }) => {
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.flow.nodes);
  const node = nodes.find((n) => n.id === nodeId);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      description: e.target.description.value,
      category: e.target.category.value,
    };
    
    onUpdateNode(nodeId, formData);
    dispatch(closePanel());
  };

  if (!node) return null;

  return (
    <div className="w-1/5 min-w-[300px] bg-white border-l border-gray-200 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Edit Node</h2>
        <button
          onClick={() => dispatch(closePanel())}
          className="text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={node.data?.name || ''}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            defaultValue={node.data?.description || ''}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
            rows="3"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            defaultValue={node.data?.category || ''}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
            required
          >
            <option value="">Select a category</option>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
            <option value="category3">Category 3</option>
          </select>
        </div>
        
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => dispatch(closePanel())}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default RightPanel;