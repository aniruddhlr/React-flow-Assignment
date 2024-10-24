import React from 'react';

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-4">Nodes</h2>
      <div
        className="bg-blue-50 border border-blue-200 rounded p-3 mb-2 cursor-move"
        onDragStart={(event) => onDragStart(event, 'customNode')}
        draggable
      >
        Rectangle Node
      </div>
    </div>
  );
};


export default Sidebar;