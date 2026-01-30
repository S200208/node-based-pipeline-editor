import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import './styles/submitstyles.css';
export const SubmitButton = () => {
  const { nodes, edges } = useStore(
    (state) => ({
      nodes: state.nodes,
      edges: state.edges,
    }),
    shallow
  );
  const handleSubmit = async () => {
    if (nodes.length === 0) {
      alert('Pipeline is empty. Please add at least one node.');
      return;
    }
    try {
      const payload = {
        nodes: nodes,
        edges: edges,
      };
      const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Failed to parse pipeline'}`);
        return;
      }
      const data = await response.json();
      const nodeCount = data.num_nodes;
      const edgeCount = data.num_edges;

      const isDAG = data.is_dag || false;
      const message = `
Pipeline Summary:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Nodes: ${nodeCount}
📡 Edges: ${edgeCount}
🔀 Is DAG: ${isDAG ? '✓ Yes' : '✗ No'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `.trim();
      alert(message);
      console.log('Pipeline submission response:', data);
    } catch (error) {
      console.error('Error submitting pipeline:', error);
      alert(`Error: ${error.message || 'Failed to submit pipeline'}`);
    }
  };
  return (
    <div className="submit-container">
      <button 
        type="button" 
        className="submit-button"
        onClick={handleSubmit}
        disabled={nodes.length === 0}
      >
        Submit Pipeline
      </button>
    </div>
  );
}
