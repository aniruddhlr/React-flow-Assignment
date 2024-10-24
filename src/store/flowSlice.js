// src/store/flowSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nodes: [],
  edges: [],
  selectedNode: null,
  showPanel: false,
};

const flowSlice = createSlice({
  name: 'flow',
  initialState,
  reducers: {
    setNodes: (state, action) => {
      state.nodes = action.payload;
    },
    setEdges: (state, action) => {
      state.edges = action.payload;
    },
    selectNode: (state, action) => {
      state.selectedNode = action.payload;
      state.showPanel = true;
    },
    closePanel: (state) => {
      state.selectedNode = null;
      state.showPanel = false;
    },
    importFlow: (state, action) => {
      const { nodes, edges } = action.payload;
      state.nodes = nodes;
      state.edges = edges;
    },
  },
});

export const {
  setNodes,
  setEdges,
  selectNode,
  closePanel,
  importFlow,
} = flowSlice.actions;

export default flowSlice.reducer;