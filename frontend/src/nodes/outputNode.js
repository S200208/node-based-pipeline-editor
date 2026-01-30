import { useState } from 'react';
import { Handle, Position } from 'reactflow';
export const OutputNode = ({ id, data }) => {
  const [name, setName] = useState(data?.outputName || 'output');
  const [type, setType] = useState(data?.outputType || 'Text');
  return (
    <div className="abstract-node">
      <Handle type="target" position={Position.Left} id={`${id}-value`} />
      <div className="abstract-node__title">Output</div>
      <div className="abstract-node__content nodrag">
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px' }}>
          <span>Name:</span>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            style={{ marginLeft: '6px', padding: '4px', width: '100%', boxSizing: 'border-box' }}
          />
        </label>
        <label style={{ display: 'block', fontSize: '12px' }}>
          <span>Type:</span>
          <select 
            value={type} 
            onChange={(e) => setType(e.target.value)}
            style={{ marginLeft: '6px', padding: '4px', width: '100%', boxSizing: 'border-box' }}
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </div>
  );
}
